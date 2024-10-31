from fastapi import FastAPI, HTTPException
from routes import co2_routes

app = FastAPI()

app.include_router(
    co2_routes.router,
    prefix="/co2",
    tags=["co2"]
)