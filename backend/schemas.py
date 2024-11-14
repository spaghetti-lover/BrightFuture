from pydantic import BaseModel
from typing import Dict, List

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

