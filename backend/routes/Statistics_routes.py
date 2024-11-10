from fastapi import APIRouter, HTTPException
from typing import Union
from services.Statistic_service import get_statistics  # Ensure the correct import path
from schemas import StatisticResponse  # Ensure the correct import path

router = APIRouter()

@router.get("/", response_model=StatisticResponse)
def get_statistics_route(
    capacity: Union[float, int], 
    latitude: Union[float, int], 
    longitude: Union[float, int], 
    timezone: str, 
    model: str, 
    surface_tilt: Union[float, int], 
    surface_azimuth: Union[float, int], 
    performance_ratio: Union[float, int]
) -> StatisticResponse:
    try:
        return get_statistics(
            capacity, latitude, longitude, timezone, model, surface_tilt, surface_azimuth, performance_ratio
        )
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="All values must be valid numbers"
        )