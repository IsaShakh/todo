from pydantic import BaseModel
from enum import Enum


class Status(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"



class TaskBase(BaseModel):
    name : str
    description : str | None = None
    status: Status = Status.todo


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True