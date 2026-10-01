from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app import crud, schemas
from app.dependencies import get_current_user



router = APIRouter(
    prefix="/hr",
    tags=["HR"]
)



# ==========================
# GET ALL EMPLOYEES
# ==========================

@router.get(
    "/",
    response_model=list[schemas.Employee]
)
def get_employees(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.get_employees(db)



# ==========================
# CREATE EMPLOYEE
# ==========================

@router.post(
    "/",
    response_model=schemas.Employee
)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    return crud.create_employee(
        db,
        employee
    )



# ==========================
# UPDATE EMPLOYEE
# ==========================

@router.put(
    "/{employee_id}",
    response_model=schemas.Employee
)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    db_employee = crud.update_employee(
        db,
        employee_id,
        employee
    )


    if db_employee is None:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )


    return db_employee



# ==========================
# DELETE EMPLOYEE
# ==========================

@router.delete(
    "/{employee_id}"
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    employee = crud.delete_employee(
        db,
        employee_id
    )


    if employee is None:

        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )


    return {
        "message": "Employee deleted successfully"
    }