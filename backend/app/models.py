from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from app.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="Tanuj")
    level = Column(Integer, default=8)
    xp = Column(Integer, default=820)
    current_streak = Column(Integer, default=12)
    best_streak = Column(Integer, default=18)

class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    progress = Column(Integer, default=0)
    target = Column(Integer)
    xp_reward = Column(Integer)
    difficulty = Column(String)
    status = Column(String, default="Active") # Active, Completed
    type = Column(String) # sleep, study, routine
