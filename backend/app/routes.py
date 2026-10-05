from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.services import AIService
from pydantic import BaseModel

router = APIRouter()
ai_service = AIService()

class AIChatRequest(BaseModel):
    message: str

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    user = db.query(models.User).first()
    if not user:
        # Seed mock user
        user = models.User()
        db.add(user)
        db.commit()
    
    return {
        "user": {"name": user.name, "level": user.level, "xp": user.xp},
        "streak": {"current": user.current_streak, "best": user.best_streak},
        "tonight": {
            "study_remaining_mins": 55,
            "target_bedtime": "11:30 PM"
        }
    }

@router.get("/challenges")
def get_challenges(db: Session = Depends(get_db)):
    ch = db.query(models.Challenge).all()
    if not ch:
        # Seed mock challenges
        db.add_all([
            models.Challenge(title="Sleep Before 11:45 PM", description="Wind down.", progress=4, target=7, xp_reward=50, difficulty="Easy", status="Active"),
            models.Challenge(title="Focused Study", description="No phone.", progress=3, target=5, xp_reward=75, difficulty="Medium", status="Active")
        ])
        db.commit()
        ch = db.query(models.Challenge).all()
    return ch

@router.post("/ai/plan")
def ai_plan(req: AIChatRequest):
    return ai_service.generate_plan(context_data={}, user_message=req.message)

@router.get("/insights")
def get_insights():
    return ai_service.analyze_routine(user_id=1)
