from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allows all frontends
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


@app.get("/team")
def get_team():
    return team_db


@app.post("/team")
def add_member(member: TeamMember):
    team_db.append(member)
    return {"message": "Member added", "member": member}


@app.put("/team/{member_id}")
def update_member(member_id: int, updated_member: TeamMember):
    for i, member in enumerate(team_db):
        if member.id == member_id:
            team_db[i] = updated_member
            return {"message": "Member updated"}
    return {"error": "Member not found"}


@app.delete("/team/{member_id}")
def delete_member(member_id: int):
    for member in team_db:
        if member.id == member_id:
            team_db.remove(member)
            return {"message": "Member deleted"}
    return {"error": "Member not found"}