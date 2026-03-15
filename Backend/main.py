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
client = MongoClient("mongodb+srv://somesh:s1o2m3e4s5h6h@cluster0.yste8tw.mongodb.net/?appName=Cluster0")

db = client["team_database"]
collection = db["team"]

class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    bio: str
    photo: str
    linkedin: str


@app.get("/team")
def get_team():
    members = []
    
    for member in collection.find():
        member["_id"] = str(member["_id"])   # convert MongoDB ObjectId
        members.append(member)

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