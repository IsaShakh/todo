from sqlalchemy.orm import Session
from app.models import Task
from app.schemas import TaskCreate

def get_all_tasks(db: Session, status: str | None = None):
    query = db.query(Task)
    if status:
        query = query.filter(Task.status == status)
    return query.all()


def get_task_detail(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def create_task(db: Session, task: TaskCreate):
    db_task = Task(name=task.name, description=task.description, status='todo')
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task


def update_task(db: Session, task_id: int, task: TaskCreate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        return None

    db_task.name = task.name
    db_task.description = task.description
    db_task.status = task.status  

    db.commit()
    db.refresh(db_task)
    return db_task
