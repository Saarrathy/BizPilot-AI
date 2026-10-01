from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth_utils import get_current_user
from app import crud, schemas


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


# ==========================
# GET PROFILE
# ==========================

@router.get("/")
def get_profile(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):

    user = crud.get_user_by_email(
        db,
        email
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    return {
        "username": user.username,
        "email": user.email
    }



# ==========================
# UPDATE PROFILE
# ==========================

@router.put("/")
def update_profile(
    profile: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):

    user = crud.get_user_by_email(
        db,
        email
    )


    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    user.username = profile.username
    user.email = profile.email


    db.commit()
    db.refresh(user)


    return {
        "message": "Profile updated successfully",
        "username": user.username,
        "email": user.email
    }                 