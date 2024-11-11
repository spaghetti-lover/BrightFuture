from fastapi import APIRouter, HTTPException
from typing import Union
from services import PV_service
from schemas import PVResponse

router = APIRouter()

@router.get("/estimate_electricity", response_model=PVResponse)
def estimate_electricity(panel_area: Union[float, int], panel_yield: Union[float, int], solar_radiation: Union[float, int], performance_ratio: Union[float, int]) -> PVResponse:
    try:
        return PV_service.estimate_electricity_generated(panel_area, panel_yield, solar_radiation, performance_ratio)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="All values must be valid numbers"
        )