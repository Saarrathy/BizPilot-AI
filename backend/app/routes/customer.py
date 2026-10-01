from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from app.database import get_db
from app import crud, schemas
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)



# ==========================
# GET ALL DOCUMENTS
# ==========================

@router.get(
    "/",
    response_model=list[schemas.Document]
)
def get_documents(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_documents(db)



# ==========================
# GET SINGLE DOCUMENT
# ==========================

@router.get(
    "/{document_id}",
    response_model=schemas.Document
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_document(
        db,
        document_id
    )



# ==========================
# CREATE DOCUMENT
# ==========================

@router.post(
    "/",
    response_model=schemas.Document
)
def create_document(
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.create_document(
        db,
        document
    )



# ==========================
# UPDATE DOCUMENT
# ==========================

@router.put(
    "/{document_id}",
    response_model=schemas.Document
)
def update_document(
    document_id: int,
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.update_document(
        db,
        document_id,
        document
    )



# ==========================
# DELETE DOCUMENT
# ==========================

@router.delete(
    "/{document_id}"
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    crud.delete_document(
        db,
        document_id
    )


    return {
        "message": "Document deleted successfully"
    }