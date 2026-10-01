from pydantic import BaseModel
from datetime import date, datetime

# ==========================================
# TRANSACTION SCHEMAS
# ==========================================

class TransactionBase(BaseModel):
    title: str
    category: str
    type: str
    amount: float
    date: date


class TransactionCreate(TransactionBase):
    pass


class Transaction(TransactionBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# CUSTOMER SCHEMAS
# ==========================================

class CustomerBase(BaseModel):
    name: str
    email: str
    phone: str
    address: str


class CustomerCreate(CustomerBase):
    pass


class Customer(CustomerBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# SALES SCHEMAS
# ==========================================

class SaleBase(BaseModel):
    customer_name: str
    product_name: str
    quantity: int
    unit_price: float
    total: float
    date: date


class SaleCreate(SaleBase):
    pass


class Sale(SaleBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# INVENTORY SCHEMAS
# ==========================================

class InventoryBase(BaseModel):
    product_name: str
    category: str
    quantity: int
    price: float


class InventoryCreate(InventoryBase):
    pass


class Inventory(InventoryBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# EMPLOYEE SCHEMAS
# ==========================================

class EmployeeBase(BaseModel):
    name: str
    department: str
    position: str
    salary: float
    email: str


class EmployeeCreate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# DOCUMENT SCHEMAS
# ==========================================

class DocumentBase(BaseModel):
    file_name: str
    file_path: str
    file_type: str


class DocumentCreate(DocumentBase):
    pass


class Document(DocumentBase):
    id: int
    upload_date: datetime

    class Config:
        from_attributes = True


# ==========================================
# REPORT SCHEMA
# ==========================================

class Report(BaseModel):
    total_income: float
    total_expense: float
    customers: int
    sales: int
    products: int
    employees: int

    class Config:
        from_attributes = True


# ==========================================
# AI ASSISTANT SCHEMAS
# ==========================================

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str

    class Config:
        from_attributes = True


# ==========================================
# USER SCHEMAS
# ==========================================

class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# ==========================
# Customer Support Schemas
# ==========================

class SupportTicketCreate(BaseModel):
    customer_name: str
    email: str
    subject: str
    description: str


class SupportTicketResponse(BaseModel):
    id: int
    customer_name: str
    email: str
    subject: str
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
from pydantic import BaseModel, EmailStr


class ProfileUpdate(BaseModel):
    username: str
    email: EmailStr