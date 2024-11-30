from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas import Task, TaskCreate
from app.crud import create_task, get_all_tasks, get_task_detail, delete_task, update_task
from app.db import get_db

task_router = APIRouter(prefix="/tasks", tags=["tasks"])

@task_router.post("/", response_model=Task, status_code=201)
def task_create(task: TaskCreate, db: Session = Depends(get_db), ):
    return create_task(db, task)

@task_router.get("/", response_model=list[Task])
def get_tasks(
    status: str | None = Query(None),
    db: Session = Depends(get_db),
):
    return get_all_tasks(db, status)

@task_router.get("/{task_id}/", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = get_task_detail(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Такой задачи нет")
    return task

@task_router.put("/{task_id}/", response_model=Task)
def task_update(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    
    if not task.name:
        raise HTTPException(status_code=400, detail="Field 'name' is required")
    
    updated_task = update_task(db, task_id, task)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@task_router.delete("/{task_id}/")
def task_delete(task_id: int, db: Session = Depends(get_db)):
    deleted_task = delete_task(db, task_id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Такой задачи нет")
    return {"message": "Задача была успешно удалена"}