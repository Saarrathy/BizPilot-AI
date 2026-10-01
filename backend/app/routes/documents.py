from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# Get all documents
@router.get("/", response_model=list[schemas.Document])
def get_documents(db: Session = Depends(get_db)):
    return crud.get_documents(db)


# Get one document
@router.get("/{document_id}", response_model=schemas.Document)
def get_document(document_id: int, db: Session = Depends(get_db)):
    return crud.get_document(db, document_id)


# Create document
@router.post("/", response_model=schemas.Document)
def create_document(
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
):
    return crud.create_document(db, document)


# Update document
@router.put("/{document_id}", response_model=schemas.Document)
def update_document(
    document_id: int,
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
):
    return crud.update_document(db, document_id, document)


# Delete document
@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    crud.delete_document(db, document_id)

    return {
        "message": "Document deleted successfully"
    }