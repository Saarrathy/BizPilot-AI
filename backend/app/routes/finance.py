from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app import crud, schemas
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/finance",
    tags=["Finance"]
)



# ==========================
# GET ALL TRANSACTIONS
# ==========================

@router.get(
    "/transactions",
    response_model=list[schemas.Transaction]
)
def get_transactions(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_transactions(db)



# ==========================
# CREATE TRANSACTION
# ==========================

@router.post(
    "/transactions",
    response_model=schemas.Transaction
)
def create_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.create_transaction(
        db,
        transaction
    )



# ==========================
# DELETE TRANSACTION
# ==========================

@router.delete(
    "/transactions/{transaction_id}"
)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    transaction = crud.delete_transaction(
        db,
        transaction_id
    )


    if transaction is None:

        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )


    return {
        "message": "Transaction deleted successfully"
    }