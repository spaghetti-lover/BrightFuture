from pydantic import BaseModel
from typing import Dict, List
from typing import List, Dict, Union
from typing import Optional, Dict

class CO2Response(BaseModel):
    co2_from_kwh: float
    equivalent_trees: float
    equivalent_cars: float
    equivalent_phones: float

    messages: Dict[str, str]

class DailyValue(BaseModel):
    date: str  # Date as a string, e.g., "2024-01-01"
    gii: float  # Global Irradiance Index for the day
    energy: float  # Energy generated for the day

class MonthlyValue(BaseModel):
    month: str  # Month as a string, e.g., "2024-01"
    gii: float  # Total Global Irradiance Index for the month
    energy: float  # Total energy generated for the month

class StatisticResponse(BaseModel):
    max_daily_gii: float
    min_daily_gii: float
    yearly_total_gii: float
    average_daily_gii: float

    max_daily_energy: float
    min_daily_energy: float
    yearly_total_energy: float
    average_daily_energy: float

    daily_values: List[DailyValue]  # List of daily values with date, GII, and energy
    monthly_values: List[MonthlyValue]  # List of monthly values with month, GII, and energy

    system_capacity: Union[float, int]
    performance_ratio: float
    module_efficiency: float

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: Optional[str] = None
    create_new_session: bool | None = False



class UserContext(BaseModel):
    capacity: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timezone: Optional[str] = None
    model: Optional[str] = None
    surface_tilt: Optional[float] = None
    surface_azimuth: Optional[float] = None
    performance_ratio: Optional[float] = None
    current_question: Optional[str] = None
    chat_history: list = []
    is_complete: bool = False
