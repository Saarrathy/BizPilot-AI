from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError



SECRET_KEY = "bizpilot_secret_key"
ALGORITHM = "HS256"



oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)



def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    print("TOKEN RECEIVED:", token)


    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        print("DECODED PAYLOAD:", payload)


        email = payload.get("sub")


        if email is None:

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token missing email"
            )


        return email



    except JWTError as e:

        print("JWT ERROR:", e)


        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )