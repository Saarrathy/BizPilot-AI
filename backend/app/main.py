from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import routers
from app.routes.auth import router as auth_router
from app.routes.finance import router as finance_router
from app.routes.customer import router as customer_router
from app.routes.sales import router as sales_router
from app.routes.inventory import router as inventory_router
from app.routes.hr import router as hr_router
from app.routes.reports import router as reports_router
from app.routes.documents import router as documents_router
from app.routes.assistant import router as assistant_router
from app.routes.customer_support import router as support_router
from app.routes.profile import router as profile_router  # NEW

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BizPilot AI",
    description="AI Powered Business Management System",
    version="1.0.0",
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Root API
# ==========================

@app.get("/")
def home():
    return {
        "message": "BizPilot AI Backend Running Successfully"
    }

# ==========================
# Authentication
# ==========================

app.include_router(auth_router)

# ==========================
# Business Modules
# ==========================

app.include_router(finance_router)
app.include_router(customer_router)
app.include_router(sales_router)
app.include_router(inventory_router)
app.include_router(hr_router)
app.include_router(reports_router)
app.include_router(documents_router)

# ==========================
# AI Assistant
# ==========================

app.include_router(assistant_router)

# ==========================
# Customer Support
# ==========================

app.include_router(support_router)

# ==========================
# Profile
# ==========================

app.include_router(profile_router)