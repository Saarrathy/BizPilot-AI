from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.database import get_db
from app import models
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)



# ==========================
# GET REPORT SUMMARY
# ==========================

@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    total_income = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.type == "Income"
        )
        .all()
    )


    total_expense = (
        db.query(models.Transaction)
        .filter(
            models.Transaction.type == "Expense"
        )
        .all()
    )


    income = sum(
        t.amount for t in total_income
    )


    expense = sum(
        t.amount for t in total_expense
    )


    return {

        "total_income": income,

        "total_expense": expense,

        "customers": db.query(
            models.Customer
        ).count(),

        "sales": db.query(
            models.Sale
        ).count(),

        "products": db.query(
            models.Inventory
        ).count(),

        "employees": db.query(
            models.Employee
        ).count(),

    }