from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app import crud, schemas
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)



# ==========================
# GET ALL PRODUCTS
# ==========================

@router.get(
    "/",
    response_model=list[schemas.Inventory]
)
def get_inventory(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_inventory(db)



# ==========================
# CREATE PRODUCT
# ==========================

@router.post(
    "/",
    response_model=schemas.Inventory
)
def create_product(
    product: schemas.InventoryCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.create_product(
        db,
        product
    )



# ==========================
# DELETE PRODUCT
# ==========================

@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    product = crud.delete_product(
        db,
        product_id
    )


    if product is None:

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )


    return {
        "message": "Product deleted successfully"
    }