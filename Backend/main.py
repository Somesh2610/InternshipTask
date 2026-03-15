from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("YOUR_MONGODB_CONNECTION_STRING")

db = client["team_database"]
collection = db["team"]


class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    bio: str
    photo: str
    linkedin: str


@app.get("/")
def home():
    return {"message": "Backend running"}


@app.get("/team")
def get_team():
    members = list(collection.find({}, {"_id": 0}))
    return members


@app.post("/team")
def add_member(member: TeamMember):
    collection.insert_one(member.dict())
    return {"message": "Member added"}


@app.put("/team/{member_id}")
def update_member(member_id: int, updated_member: TeamMember):
    collection.update_one(
        {"id": member_id},
        {"$set": updated_member.dict()}
    )
    return {"message": "Member updated"}


@app.delete("/team/{member_id}")
def delete_member(member_id: int):
    collection.delete_one({"id": member_id})
    return {"message": "Member deleted"}