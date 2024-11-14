import google.generativeai as genai
from datetime import datetime
from typing import Dict, Optional, Tuple
import os
from dotenv import load_dotenv
import json
import redis
from schemas import UserContext
from .Statistic_service import get_statistics
import pytz
load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_KEY")

genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def check_api_connection(model) -> bool:
    """Check if the connection to the Gemini API is successful"""
    try:
        # Attempt to generate a simple response to test the connection
        response = model.generate_content("Hello")
        print(f"API connection successful: {response.text}")
        return response is not None
    except Exception as e:
        print(f"API connection failed: {e}")
        return False

check_api_connection(model)



class ChatbotService:
    def __init__(self):
      
        
        # Configure Redis for session storage
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
        
        self.intro_question_vi = "Chào bạn! Bạn có cần tôi tư vấn về năng lượng điện mặt trời không?"
        self.intro_question_en = "Hello! Do you need consultation on solar energy?"

        # Define question flow
        self.questions_vi = {
            "capacity": "Công suất dự kiến của hệ thống điện mặt trời là bao nhiêu kWp?",
            "latitude": "Vị trí lắp đặt nằm ở vĩ độ bao nhiêu? (Ví dụ: Hà Nội là 21.0285, TP.HCM là 10.8231)",
            "longitude": "Vị trí lắp đặt nằm ở kinh độ bao nhiêu? (Ví dụ: Hà Nội là 105.8542, TP.HCM là 106.6297)",
            "timezone": "Múi giờ của vị trí lắp đặt là gì? (Ví dụ: 'Asia/Ho_Chi_Minh')",
            "model": "Bạn dự định sử dụng loại tấm pin nào? (Ví dụ: JinkoSolar Tiger Pro, LONGi Hi-MO 5)",
            "surface_tilt": "Góc nghiêng của tấm pin so với mặt phẳng ngang là bao nhiêu độ? (Thường từ 10-15 độ)",
            "surface_azimuth": "Góc phương vị của tấm pin là bao nhiêu độ? (Nam: 180, Đông Nam: 135, Đông: 90)",
            "performance_ratio": "Hệ số hiệu suất dự kiến của hệ thống? (Thường từ 0.7 đến 0.8)"
        }
        
        self.questions_en = {
            "capacity": "What is the planned capacity of your solar system in kWp?",
            "latitude": "What is the installation latitude? (Example: Hanoi is 21.0285, HCMC is 10.8231)",
            "longitude": "What is the installation longitude? (Example: Hanoi is 105.8542, HCMC is 106.6297)",
            "timezone": "What is the timezone of the installation location? (Example: 'Asia/Ho_Chi_Minh')",
            "model": "Which solar panel model do you plan to use? (Example: JinkoSolar Tiger Pro, LONGi Hi-MO 5)",
            "surface_tilt": "What is the tilt angle of the panels? (Usually 10-15 degrees)",
            "surface_azimuth": "What is the azimuth angle of the panels? (South: 180, Southeast: 135, East: 90)",
            "performance_ratio": "What is the expected performance ratio? (Usually 0.7 to 0.8)"
        }

    async def process_message(self, message: str, session_id: str, language: str = "vi") -> Dict:
            print(f"Processing message: {message} for session: {session_id}")
            context = self._get_context(session_id)

            # Step 1: Check if the user has been greeted
            if not context.get("greeted"):
                return await self._handle_greeting(context, session_id, language)

            # Step 2: Check for user confirmation
            if not context.get("confirmed"):
                return await self._handle_confirmation(message, context, session_id, language)

            # Step 3: Handle conversation flow
            return await self._handle_conversation_flow(message, context, session_id, language)

    async def _handle_greeting(self, context, session_id, language) -> Dict:
        context["greeted"] = True
        greeting = self.intro_question_vi if language == "vi" else self.intro_question_en
        context['chat_history'].append({"role": "assistant", "content": greeting})
        await self._save_context(session_id, context)
        return {
            "message": greeting,
            "is_complete": False,
            "chat_history": context['chat_history']
        }

    async def _handle_confirmation(self, message, context, session_id, language) -> Dict:
        if message.lower() in ["yes", "có", "ok", "đồng ý"]:  # Add other variations if needed
            context["confirmed"] = True
            guidance_message = (
                "Cảm ơn bạn đã đồng ý. Để bắt đầu tư vấn, vui lòng cung cấp các thông tin về hệ thống điện mặt trời của bạn."
                "\nChúng tôi sẽ hỏi bạn về công suất, vị trí lắp đặt, góc nghiêng, và các thông số khác."
            ) if language == "vi" else (
                "Thank you for confirming! To begin the consultation, please provide details about your solar power system."
                "\nWe will ask for information about the system capacity, installation location, tilt angle, and other parameters."
            )
            context['chat_history'].append({"role": "assistant", "content": guidance_message})
            await self._save_context(session_id, context)
            return {
                "message": guidance_message,
                "is_complete": False,
                "chat_history": context['chat_history']
            }
        else:
            response = "Xin lỗi, tôi chưa thể giúp bạn với yêu cầu này." if language == "vi" else "Sorry, I can't assist with that request."
            return {
                "message": response,
                "is_complete": True,
                "chat_history": context['chat_history']
            }

    async def _handle_conversation_flow(self, message, context, session_id, language) -> Dict:
        context['chat_history'].append({"role": "user", "content": message})
        if context.get('is_complete'):
            return await self._generate_completion_response(context, message, session_id, language)

        parameter = context.get('current_question') or self._get_next_empty_parameter(context)
        if not parameter:
            return await self._handle_completion(context, session_id, language)

        if context.get('current_question'):
            return await self._process_current_question(context, parameter, message, session_id, language)
        print(f"Next parameter in next question: {parameter}")
        return await self._ask_next_question(context, parameter, session_id, language)

    async def _generate_completion_response(self, context, message, session_id, language) -> Dict:
        answer = await self._generate_prompt_response(context, message, language)
        context['chat_history'].append({"role": "assistant", "content": answer})
        await self._save_context(session_id, context)
        return {
            "message": answer,
            "is_complete": False,
            "chat_history": context['chat_history']
        }

    async def _handle_completion(self, context, session_id, language) -> Dict:
        context['is_complete'] = True
        completion_message = "Cảm ơn bạn! Tất cả thông tin đã được thu thập. Bạn có thể hỏi tôi bất kỳ điều gì về hệ thống của mình."
        context['chat_history'].append({"role": "assistant", "content": completion_message})
        await self._save_context(session_id, context)
        return {
            "message": completion_message,
            "is_complete": False,
            "chat_history": context['chat_history']
        }

    async def _process_current_question(self, context, parameter, message, session_id, language) -> Dict:
        valid, value = self._validate_parameter(parameter, message)
        if valid:
            context[parameter] = value
            context['chat_history'].append({"role": "assistant", "content": f"Received {parameter}. Thank you!"})
            await self._save_context(session_id, context)

            parameter = self._get_next_empty_parameter(context)
            if not parameter:
                return await self._handle_completion(context, session_id, language)

            context['current_questiocn'] = parameter
        else:
            response = self._get_validation_error_message(parameter, language)
            context['chat_history'].append({"role": "assistant", "content": response})
            await self._save_context(session_id, context)
            return {
                "message": response,
                "is_complete": False,
                "chat_history": context['chat_history']
            }

        # Ask the next question if parameter is valid
        return await self._ask_next_question(context, parameter, session_id, language)


    async def _ask_next_question(self, context, parameter, session_id, language) -> Dict:
        context['current_question'] = parameter
        question = self.questions_vi[parameter] if language == "vi" else self.questions_en[parameter]
        context['chat_history'].append({"role": "assistant", "content": question})
        await self._save_context(session_id, context)
        return {
            "message": question,
            "is_complete": False,
            "chat_history": context['chat_history']
        }



    async def _generate_prompt_response(self, context, message, language):
        # Collect solar system information from context
        collected_data = "\n".join([f"{k}: {v}" for k, v in context.items() if k in self.questions_vi.keys()])
        
        # Obtain statistics and create a prompt for analysis
        stats = await self.get_statistics(context)
        stats_summary = self._create_analysis_prompt(stats, language)
        
        # Combine both the system information and statistics into a single prompt
        prompt = (
            f"Dưới đây là các thông tin về hệ thống điện mặt trời của người dùng:\n{collected_data}\n"
            f"Các thống kê liên quan:\n{stats_summary}\n"
            f"Dựa vào các thông tin này, hãy trả lời câu hỏi: {message}"
        ) if language == "vi" else (
            f"Here is the information about the user's solar power system:\n{collected_data}\n"
            f"Related statistics:\n{stats_summary}\n"
            f"Based on this information, please answer the question: {message}"
        )
        
        # Generate response using the prompt
        response = model.generate_content(prompt)
        # Extract the text content from the response object
        response_text = response.text  # assuming the content is stored in `text`
        return response_text




    def _get_context(self, session_id: str) -> Dict:
        """Get or initialize user context from Redis"""
        context_data = self.redis_client.get(f"solar:context:{session_id}")
        if context_data:
            return json.loads(context_data)
        return UserContext().dict()

    async def _save_context(self, session_id: str, context: Dict):
        """Save user context to Redis"""
        self.redis_client.setex(
            f"solar:context:{session_id}",
            3600,  # 1 hour expiration
            json.dumps(context)
        )

    def _get_next_empty_parameter(self, context: Dict) -> Optional[str]:
        """Get the next parameter that needs to be collected"""
        parameters = ["capacity", "latitude", "longitude","timezone", "model", 
                     "surface_tilt", "surface_azimuth", "performance_ratio"]
        for param in parameters:
            if context.get(param) is None:
                print(f"Next parameter: {param}")
                return param
        return None

    def _validate_parameter(self, parameter: str, value: str) -> Tuple[bool, Optional[float]]:
        """Validate user input for a parameter"""
        try:
            if parameter == "model":
                return True, value.strip()
            if parameter == "timezone":
                if value in pytz.all_timezones:
                    print (f"VALUE: {value}")
                    return True, value
            float_value = float(value)
            
            # Parameter-specific validation
            if parameter == "capacity" and float_value <= 0:
                return False, None
            elif parameter == "performance_ratio" and (float_value <= 0 or float_value > 1):
                return False, None
            elif parameter in ["surface_tilt", "surface_azimuth"] and (float_value < 0 or float_value > 360):
                return False, None
                
            return True, float_value
        except ValueError:
            return False, None


    def _get_validation_error_message(self, parameter: str, language: str) -> str:
        """Get error message for invalid input"""
        if language == "vi":
            messages = {
                "capacity": "Vui lòng nhập công suất hợp lệ (số dương)",
                "latitude": "Vui lòng nhập vĩ độ hợp lệ (ví dụ: 10.8231)",
                "longitude": "Vui lòng nhập kinh độ hợp lệ (ví dụ: 106.6297)",
                "time_zone": "Vui lòng nhập múi giờ hợp lệ (ví dụ: 'Asia/Ho_Chi_Minh')",
                "surface_tilt": "Vui lòng nhập góc nghiêng hợp lệ (0-360 độ)",
                "surface_azimuth": "Vui lòng nhập góc phương vị hợp lệ (0-360 độ)",
                "performance_ratio": "Vui lòng nhập hệ số hiệu suất hợp lệ (0-1)"
            }
        else:
            messages = {
                "capacity": "Please enter a valid capacity (positive number)",
                "latitude": "Please enter a valid latitude (e.g., 10.8231)",
                "longitude": "Please enter a valid longitude (e.g., 106.6297)",
                "time_zone": "Please enter a valid time zone (e.g., 'Asia/Ho_Chi_Minh')",
                "surface_tilt": "Please enter a valid tilt angle (0-360 degrees)",
                "surface_azimuth": "Please enter a valid azimuth angle (0-360 degrees)",
                "performance_ratio": "Please enter a valid performance ratio (0-1)"
            }
        
        return messages.get(parameter, "Invalid input, please try again.")


    async def get_statistics(self, context: Dict) -> Dict:
        capacity = context['capacity']
        latitude = context['latitude'] 
        longitude = context['longitude']
        timezone = context['timezone']
        model = context['model']
        surface_tilt = context['surface_tilt']
        surface_azimuth = context['surface_azimuth']
        performance_ratio = context['performance_ratio']

        print(f"Calculating statistics for: {capacity} kW, {latitude}, {longitude}, {timezone}, {model}, {surface_tilt}, {surface_azimuth}, {performance_ratio}")
        return await get_statistics(
            capacity, latitude, longitude, timezone, model, surface_tilt, surface_azimuth, performance_ratio
        )

    def _create_analysis_prompt(self, stats: dict, language: str) -> str:
        """
        Create analysis prompt using the collected statistics.
        
        Parameters:
        stats (dict): A dictionary containing the system statistics.
        language (str): The target language for the analysis prompt ('vi' for Vietnamese, 'en' for English).
        
        Returns:
        str: The generated analysis prompt.
        """
        if language == "vi":
            # Tạo lời phân tích bằng tiếng Việt
            prompt = f"""
               Dựa trên các thông số được cung cấp, hệ thống điện mặt trời của bạn có:

            Thông số hiệu suất:
            - Công suất tối đa hàng ngày: {stats['max_daily_gii']} kW
            - Công suất tối thiểu hàng ngày: {stats['min_daily_gii']} kW
            - Tổng công suất tạo ra trong năm: {stats['yearly_total_gii']} kW
            - Công suất trung bình hàng ngày: {stats['average_daily_gii']} kW

            Thông số năng lượng:
            - Năng lượng tối đa hàng ngày: {stats['max_daily_energy']} kWh
            - Năng lượng tối thiểu hàng ngày: {stats['min_daily_energy']} kWh
            - Tổng năng lượng tạo ra trong năm: {stats['yearly_total_energy']} kWh
            - Năng lượng trung bình hàng ngày: {stats['average_daily_energy']} kWh
                Dưới đây là các thông số sản lượng điện chi tiết theo ngày:

            {self._format_daily_data(stats['daily_values'])}
            
            Và dưới đây là các thông số sản lượng điện theo tháng:
            {self._format_monthly_data(stats['monthly_values'])}
            """
        else:
            # Tạo lời phân tích bằng tiếng Anh
            prompt = f"""
            Based on the provided parameters, your solar system has:

            Performance Specifications:
            - Maximum daily power: {stats['max_daily_gii']} kW
            - Minimum daily power: {stats['min_daily_gii']} kW
            - Total yearly power generation: {stats['yearly_total_gii']} kW
            - Average daily power: {stats['average_daily_gii']} kW

            Energy Specifications:
            - Maximum daily energy: {stats['max_daily_energy']} kWh
            - Minimum daily energy: {stats['min_daily_energy']} kWh
            - Total yearly energy generation: {stats['yearly_total_energy']} kWh
            - Average daily energy: {stats['average_daily_energy']} kWh

            Here are the detailed daily energy production statistics:
            {self._format_daily_data(stats['daily_values'])}
            
            And here are the monthly energy production statistics:
            {self._format_monthly_data(stats['monthly_values'])}
            """
        
        return prompt

    def _format_daily_data(self, daily_values: list) -> str:
        """Format daily energy production data as a table."""
        table = "| Date | GII (kWh/m²) | Energy (kWh) |\n"
        table += "|------|-------------|-------------|\n"
        for row in daily_values:
            table += f"| {row['date']} | {row['gii']:.2f} | {row['energy']:.2f} |\n"
        return table

    def _format_monthly_data(self, monthly_values: list) -> str:
        """Format monthly energy production data as a table."""
        table = "| Month | GII (kWh/m²) | Energy (kWh) |\n"
        table += "|-------|-------------|-------------|\n"
        for row in monthly_values:
            table += f"| {row['month']} | {row['gii']:.2f} | {row['energy']:.2f} |\n"
        return table