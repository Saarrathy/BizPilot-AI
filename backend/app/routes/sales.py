from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app import crud, schemas
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)



# ==========================
# GET ALL SALES
# ==========================

@router.get(
    "/",
    response_model=list[schemas.Sale]
)
def get_sales(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_sales(db)



# ==========================
# CREATE SALE
# ==========================

@router.post(
    "/",
    response_model=schemas.Sale
)
def create_sale(
    sale: schemas.SaleCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.create_sale(
        db,
        sale
    )



# ==========================
# UPDATE SALE
# ==========================

@router.put(
    "/{sale_id}",
    response_model=schemas.Sale
)
def update_sale(
    sale_id: int,
    sale: schemas.SaleCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    db_sale = crud.update_sale(
        db,
        sale_id,
        sale
    )


    if db_sale is None:

        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )


    return db_sale



# ==========================
# DELETE SALE
# ==========================

@router.delete(
    "/{sale_id}"
)
def delete_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    db_sale = crud.delete_sale(
        db,
        sale_id
    )


    if db_sale is None:

        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )


    return {
        "message": "Sale deleted successfully"
    }