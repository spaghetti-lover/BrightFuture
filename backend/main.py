from fastapi import FastAPI
from routes import co2_routes, PV_routes, forecast_routes 

app = FastAPI()

app.include_router(
    co2_routes.router,
    prefix="/co2",
    tags=["Carbon dioxide emissions"]
)
app.include_router(
    PV_routes.router,
    prefix="/PV",
    tags=["Photovoltaics"]
)

app.include_router(
    forecast_routes.router, 
    prefix="/forecast",
    tags=["Forecast"]
)