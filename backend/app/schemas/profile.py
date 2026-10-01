from pydantic import BaseModel, EmailStr


class ProfileResponse(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    username: str
    email: EmailStr