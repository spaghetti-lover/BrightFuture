from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import co2_routes, forecast_routes, Chatbot_routes, pv_routes

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn gốc, bạn có thể thay đổi điều này
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP
    allow_headers=["*"],  # Cho phép tất cả các headers
)

app.include_router(co2_routes.router, prefix="/co2", tags=["Carbon dioxide emissions"])

app.include_router(forecast_routes.router, prefix="/forecast", tags=["Forecast"])

app.include_router(pv_routes.router, prefix="/solar", tags=["Solar Calculations"])

app.include_router(Chatbot_routes.router, prefix="/chatbot", tags=["Chatbot"])
