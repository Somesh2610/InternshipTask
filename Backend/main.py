from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    bio: str
    photo: str
    linkedin: str


team_db: List[TeamMember] = [
    TeamMember(
        id=1,
        name="Alice Johnson",
        role="Frontend Engineer",
        bio="Passionate about UI and design.",
        photo="https://randomuser.me/api/portraits/women/44.jpg",
        linkedin="https://linkedin.com"
    ),
    TeamMember(
        id=2,
        name="David Lee",
        role="Backend Engineer",
        bio="Loves building scalable APIs.",
        photo="https://randomuser.me/api/portraits/men/32.jpg",
        linkedin="https://linkedin.com"
    )
]