from fastapi import FastAPI
from routes import co2_routes, forecast_routes, Chatbot_routes, pv_routes

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
    pv_routes.router, 
    prefix="/solar", 
    tags=["Solar Calculations"]
)

app.include_router(
    Chatbot_routes.router,
    prefix="/chatbot",
    tags=["Chatbot"]
)