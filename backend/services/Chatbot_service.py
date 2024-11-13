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
        print(f"Current context: {context}")

        context['chat_history'].append({"role": "user", "content": message})
        
        if context['is_complete']:
            return await self._generate_analysis(context, language)

        #context['current_question'] is content of the current question  
        #context['current_question'] = None if the current question is not answered yet
        parameter = context['current_question'] or self._get_next_empty_parameter(context)
        print(context['current_question'])
        
        if not parameter:
            context['is_complete'] = True
            return await self._generate_analysis(context, language)
        print(context["current_question"])

        if context['current_question']:
            valid, value = self._validate_parameter(parameter, message)
            print(f"Validation result: valid={valid}, value={value}")


            if valid:
                context[parameter] = value
                parameter = self._get_next_empty_parameter(context)
                if not parameter:
                    context['is_complete'] = True
                    await self._save_context(session_id, context)
                    return await self._generate_analysis(context, language)
            else:
                # Invalid input, ask again
                print(f"Invalid input for parameter: {parameter}")
                response = self._get_validation_error_message(parameter, language)
                context['chat_history'].append({"role": "assistant", "content": response})
                await self._save_context(session_id, context)
                return {
                    "message": response,
                    "is_complete": False,
                    "chat_history": context['chat_history']
                }

        # Ask the next question
        context['current_question'] = parameter
        print("current_question" + context["current_question"])
        question = self.questions_vi[parameter] if language == "vi" else self.questions_en[parameter]
        context['chat_history'].append({"role": "assistant", "content": question})
        await self._save_context(session_id, context)
        
        return {
            "message": question,
            "is_complete": False,
            "chat_history": context['chat_history']
        }

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

    async def _generate_analysis(self, context: Dict, language: str) -> Dict:
        """Generate final analysis using collected parameters"""
        stats = await self.get_statistics(context)
        prompt = self._create_analysis_prompt(stats, language)
        response = self.model.generate_content(prompt)
        
        analysis_response = {
            "timestamp": datetime.now().isoformat(),
            "message": response.text,
            "system_stats": stats,
            "is_complete": True,
            "chat_history": context['chat_history']
        }
        
        # Add the final analysis to chat history
        context['chat_history'].append({"role": "assistant", "content": response.text})
        
        return analysis_response

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

    def _create_analysis_prompt(self, stats: Dict, language: str) -> str:
        """Create analysis prompt using the collected statistics"""
        if language == "vi":
            # Create Vietnamese prompt
            prompt = f"""
            Dựa trên các thông số được cung cấp, hệ thống điện mặt trời của bạn có:
            - Công suất: {stats['capacity']} kW
            - Vị trí: Vĩ độ {stats['latitude']}, Kinh độ {stats['longitude']}
            - Múi giờ: {stats['timezone']}
            - Loại tấm pin: {stats['model']}
            - Góc nghiêng tấm pin: {stats['surface_tilt']} độ
            - Góc phương vị tấm pin: {stats['surface_azimuth']} độ
            - Hệ số hiệu suất: {stats['performance_ratio'] * 100:.2f}%

            Với các thông số này, hệ thống của bạn dự kiến sẽ sản xuất được {stats['total_energy']} kWh điện mỗi năm, góp phần giảm {stats['co2_savings']} tấn khí thải CO2.
            """
        else:
            # Create English prompt
            prompt = f"""
            Based on the provided parameters, your solar system has:
            - Capacity: {stats['capacity']} kW
            - Location: Latitude {stats['latitude']}, Longitude {stats['longitude']}
            - Timezone: {stats['timezone']} 
            - Panel model: {stats['model']}
            - Panel tilt angle: {stats['surface_tilt']} degrees
            - Panel azimuth angle: {stats['surface_azimuth']} degrees
            - Performance ratio: {stats['performance_ratio'] * 100:.2f}%

            With these specifications, your system is expected to generate {stats['total_energy']} kWh of electricity annually, contributing to a reduction of {stats['co2_savings']} tons of CO2 emissions.
            """

        return prompt