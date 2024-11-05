from pydantic import BaseModel
from typing import Dict

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