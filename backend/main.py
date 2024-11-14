from fastapi import FastAPI
from routes import co2_routes, forecast_routes, solar_routes

app = FastAPI()

app.include_router(
    co2_routes.router,
    prefix="/co2",
    tags=["Carbon dioxide emissions"]
)

app.include_router(
    forecast_routes.router, 
    prefix="/forecast",
    tags=["Forecast"]
)

app.include_router(
    solar_routes.router, 
    prefix="/solar", 
    tags=["Solar Calculations"]
) 