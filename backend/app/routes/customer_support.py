from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import schemas, crud


router = APIRouter(
    prefix="/support",
    tags=["Customer Support"]
)


# ==========================
# Create Ticket
# ==========================

@router.post("/", response_model=schemas.SupportTicketResponse)
def create_ticket(
    ticket: schemas.SupportTicketCreate,
    db: Session = Depends(get_db)
):

    return crud.create_support_ticket(
        db,
        ticket
    )



# ==========================
# Get All Tickets
# ==========================

@router.get("/", response_model=list[schemas.SupportTicketResponse])
def get_tickets(
    db: Session = Depends(get_db)
):

    return crud.get_support_tickets(
        db
    )



# ==========================
# Get Single Ticket
# ==========================

@router.get("/{ticket_id}", response_model=schemas.SupportTicketResponse)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):

    ticket = crud.get_support_ticket(
        db,
        ticket_id
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket



# ==========================
# Update Ticket Status
# ==========================

@router.put("/{ticket_id}")
def update_ticket_status(
    ticket_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    ticket = crud.update_support_ticket_status(
        db,
        ticket_id,
        status
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return {
        "message": "Status updated successfully",
        "ticket": ticket
    }



# ==========================
# Delete Ticket
# ==========================

@router.delete("/{ticket_id}")
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):

    ticket = crud.delete_support_ticket(
        db,
        ticket_id
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return {
        "message": "Ticket deleted successfully"
    }