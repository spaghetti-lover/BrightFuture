from fastapi import APIRouter, HTTPException, Query
import pandas as pd
from pvlib import location, irradiance
import pytz
import os
from schemas import SolarCalculationResponse

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
module_path = os.path.join(base_dir, "module_pv", "module_data.csv")

module_df = pd.read_csv(module_path)
router = APIRouter()

@router.get("/solar_calculation", response_model=SolarCalculationResponse)
async def calculate_solar_energy(
    plant_capacity: float = Query(..., description="Capacity of the solar plant in kW"),
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location"),
    timezone: str = Query("Asia/Ho_Chi_Minh", description="Time zone of the location"),
    surface_tilt: float = Query(20.0, description="Surface tilt angle of the panels"),
    surface_azimuth: int = Query(180, description="Surface azimuth angle (e.g., 180 for south-facing)"),
    module_selection: str = Query(..., description="Model name of the solar module from CSV"),
    performance_ratio: float = Query(81.0, description="Performance ratio (%) of the plant")
):
    
    module = module_df[module_df["Model Name"] == module_selection]
    if module.empty:
        raise HTTPException(status_code=404, detail="Module not found")

    module = module.iloc[0]
    module_efficiency = module["Efficiency"] / 100
    area = module["Area"]
    watt_peak = module["Watt peak"]

    total_modules = round(plant_capacity / (watt_peak / 1000))
    total_area = area * total_modules

    site = location.Location(latitude, longitude, tz=timezone)
    times = pd.date_range(start='2024-01-01', end='2025-01-01', freq='H', tz=timezone)[:-1]

    solar_position = site.get_solarposition(times)
    irrad_data = site.get_clearsky(times)

    poa_irrad = irradiance.get_total_irradiance(
        surface_tilt=surface_tilt,
        surface_azimuth=surface_azimuth,
        solar_zenith=solar_position["apparent_zenith"],
        solar_azimuth=solar_position["azimuth"],
        dni=irrad_data["dni"],
        ghi=irrad_data["ghi"],
        dhi=irrad_data["dhi"]
    )

    daily_irradiation = (poa_irrad["poa_global"] / 1000).resample("D").sum()
    monthly_irradiation = daily_irradiation.resample("M").sum()

    hourly_production = (poa_irrad["poa_global"] / 1000) * module_efficiency * (performance_ratio / 100)
    daily_production = hourly_production.resample("D").sum() * total_area
    monthly_production = daily_production.resample("M").sum()

    return SolarCalculationResponse(
        daily_irradiation=daily_irradiation.tolist(),
        monthly_irradiation=monthly_irradiation.tolist(),
        daily_production=daily_production.tolist(),
        monthly_production=monthly_production.tolist()
    )
