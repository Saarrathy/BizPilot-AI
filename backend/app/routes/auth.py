from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app import schemas, crud
from app.auth_utils import (
    hash_password,
    verify_password,
    create_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================
# REGISTER USER
# ==========================

@router.post("/register")
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    # Check username exists
    existing_username = crud.get_user_by_username(
        db,
        user.username
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )


    # Check email exists
    existing_email = crud.get_user_by_email(
        db,
        user.email
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    # Hash password
    hashed_password = hash_password(
        user.password
    )


    # Create user
    new_user = crud.create_user(
        db,
        user,
        hashed_password
    )


    return {
        "message": "User registered successfully",
        "user": {
            "username": new_user.username,
            "email": new_user.email
        }
    }



# ==========================
# LOGIN USER (JWT)
# Swagger OAuth2 Compatible
# ==========================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # Swagger sends username field
    # We use it as email

    email = form_data.username
    password = form_data.password


    # Find user
    db_user = crud.get_user_by_email(
        db,
        email
    )


    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    # Verify password
    if not verify_password(
        password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    # Create JWT token
    token = create_token(
        {
            "sub": db_user.email
        }
    )


    return {
        "access_token": token,
        "token_type": "bearer"
    }