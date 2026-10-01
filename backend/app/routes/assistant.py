from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"],
)


@router.post("/", response_model=schemas.ChatResponse)
def chat(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    message = request.message.lower()

    # Total Revenue
    if "revenue" in message or "income" in message:
        total = (
            db.query(func.sum(models.Transaction.amount))
            .filter(models.Transaction.type == "Income")
            .scalar()
            or 0
        )
        return {"reply": f"Your total revenue is ₹{total:.2f}"}

    # Total Expense
    elif "expense" in message:
        total = (
            db.query(func.sum(models.Transaction.amount))
            .filter(models.Transaction.type == "Expense")
            .scalar()
            or 0
        )
        return {"reply": f"Your total expense is ₹{total:.2f}"}

    # Customers
    elif "customer" in message:
        count = db.query(models.Customer).count()
        return {"reply": f"You have {count} customers."}

    # Sales
    elif "sale" in message:
        count = db.query(models.Sale).count()
        return {"reply": f"You have {count} sales records."}

    # Products
    elif "product" in message or "inventory" in message:
        count = db.query(models.Inventory).count()
        return {"reply": f"You have {count} products in inventory."}

    # Employees
    elif "employee" in message or "staff" in message:
        count = db.query(models.Employee).count()
        return {"reply": f"You have {count} employees."}

    # Documents
    elif "document" in message or "file" in message:
        count = db.query(models.Document).count()
        return {"reply": f"You have {count} uploaded documents."}

    return {
        "reply": (
            "I can answer questions about revenue, expenses, "
            "customers, sales, inventory, employees and documents."
        )
    }
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.dependencies import get_current_user


router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"]
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    current_user: str = Depends(get_current_user)
):

    message = request.message.lower()


    if "income" in message:
        return {
            "reply": "You asked about income. Finance Agent will answer this."
        }

    elif "expense" in message:
        return {
            "reply": "You asked about expenses."
        }

    elif "customer" in message:
        return {
            "reply": "Customer Agent is processing your request."
        }

    elif "inventory" in message:
        return {
            "reply": "Inventory Agent is processing your request."
        }

    elif "sales" in message:
        return {
            "reply": "Sales Agent is processing your request."
        }

    return {
        "reply": "I'm your BizPilot AI Assistant. How can I help you today?"
    }