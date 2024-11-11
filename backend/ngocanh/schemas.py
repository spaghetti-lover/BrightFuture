from pydantic import BaseModel
from typing import Dict, List
from typing import List, Dict, Union


class CO2Response(BaseModel):
    co2_from_kwh: float
    equivalent_trees: float
    equivalent_cars: float
    equivalent_phones: float

    messages: Dict[str, str]

class PVResponse(BaseModel):
    kwh_generated: float
    messages: Dict[str, str]
    units: Dict[str, str] = {
        "kwh_generated": "kWh",
        "panel_area(m²)": "Total solar panel Area",
        "panel_yield(%)": "Solar panel yield or efficiency",
        "solar_radiation(kWh/m²)": "Annual average solar radiation on tilted panels (shadings not included)", 
        "performance_ratio(%)": "Performance ratio, coefficient for losses (range between 0.5 and 0.9, default value = 0.75)",
        "Example:":" solar panel 400W, 2m², 5 hours of solar radiation,0.75 performance ratio",
        "panel_yield": "= 400W/(2m²x1000W/m²) = 0.2 = 20%",
        "Solar_radiation": "= 5 x 1kWh/m² = 5kWh/m²",
        "Electricity": "= 2m² x 20% x 5kWh/m² x 0.75 = 1.5kWh/day"
        }
from pydantic import BaseModel
from typing import List, Union

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
