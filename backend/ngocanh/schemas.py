from pydantic import BaseModel
from typing import Dict, List, Optional, Union


class ForecastResponse(BaseModel):
    date: str
    PredictedTotalPower: float


class SolarCalculationResponse(BaseModel):
    daily_irradiation: List[float]
    monthly_irradiation: List[float]
    daily_production: List[float]
    monthly_production: List[float]


class CO2Response(BaseModel):
    co2_from_kwh: float
    equivalent_trees: float
    equivalent_cars: float
    equivalent_phones: float
    messages: Dict[str, str]


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: Optional[str] = None
    create_new_session: Union[bool, None] = False


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
