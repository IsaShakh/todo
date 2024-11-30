from app.db import Base
from sqlalchemy import Column, Enum, Integer, String, Boolean
import enum


class Status(str, enum.Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True, nullable=True)
    status = Column(Enum(Status), default=Status.todo)

