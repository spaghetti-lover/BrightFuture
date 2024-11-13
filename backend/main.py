from fastapi import FastAPI
from routes import co2_routes, Statistics_routes, Chatbot_routes

app = FastAPI()

app.include_router(
    co2_routes.router,
    prefix="/co2",
    tags=["Carbon dioxide emissions"]
)


app.include_router(
    Statistics_routes.router,
    prefix="/statistics",
    tags=["Statistics"]
)

app.include_router(
    Chatbot_routes.router,
    prefix="/chatbot",
    tags=["Chatbot"]
)