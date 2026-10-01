from sqlalchemy.orm import Session
from app import models, schemas


# ==========================================
# TRANSACTION CRUD
# ==========================================

def get_transactions(db: Session):
    return db.query(models.Transaction).all()


def create_transaction(db: Session, transaction: schemas.TransactionCreate):

    db_transaction = models.Transaction(
        **transaction.model_dump()
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


def delete_transaction(db: Session, transaction_id: int):

    transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )

    if transaction is None:
        return None

    db.delete(transaction)
    db.commit()

    return transaction



# ==========================================
# CUSTOMER CRUD
# ==========================================

def get_customers(db: Session):
    return db.query(models.Customer).all()


def create_customer(db: Session, customer: schemas.CustomerCreate):

    db_customer = models.Customer(
        **customer.model_dump()
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer



def delete_customer(db: Session, customer_id: int):

    customer = (
        db.query(models.Customer)
        .filter(models.Customer.id == customer_id)
        .first()
    )

    if customer is None:
        return None

    db.delete(customer)
    db.commit()

    return customer



def update_customer(
    db: Session,
    customer_id: int,
    customer: schemas.CustomerCreate
):

    db_customer = (
        db.query(models.Customer)
        .filter(models.Customer.id == customer_id)
        .first()
    )


    if db_customer is None:
        return None


    db_customer.name = customer.name
    db_customer.email = customer.email
    db_customer.phone = customer.phone
    db_customer.address = customer.address


    db.commit()
    db.refresh(db_customer)

    return db_customer




# ==========================================
# SALES CRUD
# ==========================================


def get_sales(db: Session):

    return db.query(models.Sale).all()



def create_sale(db: Session, sale: schemas.SaleCreate):

    db_sale = models.Sale(
        **sale.model_dump()
    )

    db_sale.total = (
        sale.quantity * sale.unit_price
    )


    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)

    return db_sale




def update_sale(
    db: Session,
    sale_id: int,
    sale: schemas.SaleCreate
):

    db_sale = (
        db.query(models.Sale)
        .filter(models.Sale.id == sale_id)
        .first()
    )


    if db_sale is None:
        return None


    db_sale.customer_name = sale.customer_name
    db_sale.product_name = sale.product_name
    db_sale.quantity = sale.quantity
    db_sale.unit_price = sale.unit_price
    db_sale.total = (
        sale.quantity * sale.unit_price
    )
    db_sale.date = sale.date


    db.commit()
    db.refresh(db_sale)

    return db_sale




def delete_sale(db: Session, sale_id: int):

    db_sale = (
        db.query(models.Sale)
        .filter(models.Sale.id == sale_id)
        .first()
    )


    if db_sale is None:
        return None


    db.delete(db_sale)
    db.commit()

    return db_sale




# ==========================================
# USER AUTH CRUD
# ==========================================


def get_user_by_email(
    db: Session,
    email: str
):

    return (
        db.query(models.User)
        .filter(models.User.email == email)
        .first()
    )



def get_user_by_username(
    db: Session,
    username: str
):

    return (
        db.query(models.User)
        .filter(models.User.username == username)
        .first()
    )



def create_user(
    db: Session,
    user: schemas.UserCreate,
    hashed_password: str
):

    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )


    db.add(db_user)

    db.commit()

    db.refresh(db_user)


    return db_user

# ==========================
# Customer Support CRUD
# ==========================

from app.models import SupportTicket


# Create Ticket
def create_support_ticket(
    db,
    ticket
):
    new_ticket = SupportTicket(
        customer_name=ticket.customer_name,
        email=ticket.email,
        subject=ticket.subject,
        description=ticket.description
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return new_ticket



# Get All Tickets
def get_support_tickets(db):

    return db.query(
        SupportTicket
    ).all()



# Get Single Ticket
def get_support_ticket(
    db,
    ticket_id
):

    return db.query(
        SupportTicket
    ).filter(
        SupportTicket.id == ticket_id
    ).first()



# Update Ticket Status
def update_support_ticket_status(
    db,
    ticket_id,
    status
):

    ticket = db.query(
        SupportTicket
    ).filter(
        SupportTicket.id == ticket_id
    ).first()


    if ticket:
        ticket.status = status

        db.commit()
        db.refresh(ticket)

    return ticket



# Delete Ticket
def delete_support_ticket(
    db,
    ticket_id
):

    ticket = db.query(
        SupportTicket
    ).filter(
        SupportTicket.id == ticket_id
    ).first()


    if ticket:
        db.delete(ticket)
        db.commit()

    return ticket