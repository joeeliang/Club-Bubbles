from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from bson import ObjectId
from typing import List

app = FastAPI()

# MongoDB connection
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.reviewsDB
reviews_collection = db.reviews

# Review model
class Review(BaseModel):
    name: str
    username: str
    body: str
    img: str

class ReviewDB(Review):
    id: str

# Utility to convert MongoDB document to Pydantic model
def review_helper(review) -> ReviewDB:
    return ReviewDB(
        id=str(review["_id"]),
        name=review["name"],
        username=review["username"],
        body=review["body"],
        img=review["img"]
    )

# Seed the database with initial reviews
@app.get("/seed")
async def seed_reviews():
    reviews = [
        {"name": "Jack", "username": "@jack", "body": "I've never seen anything like this before. It's amazing. I love it.", "img": "https://avatar.vercel.sh/jack"},
        {"name": "Jill", "username": "@jill", "body": "I don't know what to say. I'm speechless. This is amazing.", "img": "https://avatar.vercel.sh/jill"},
        {"name": "John", "username": "@john", "body": "I'm at a loss for words. This is amazing. I love it.", "img": "https://avatar.vercel.sh/john"},
        {"name": "Jane", "username": "@jane", "body": "I'm at a loss for words. This is amazing. I love it.", "img": "https://avatar.vercel.sh/jane"},
        {"name": "Jenny", "username": "@jenny", "body": "I'm at a loss for words. This is amazing. I love it.", "img": "https://avatar.vercel.sh/jenny"},
        {"name": "James", "username": "@james", "body": "I'm at a loss for words. This is amazing. I love it.", "img": "https://avatar.vercel.sh/james"},
    ]

    await reviews_collection.insert_many(reviews)
    return {"message": "Reviews seeded successfully"}

# Get all reviews
@app.get("/reviews", response_model=List[ReviewDB])
async def get_reviews():
    reviews = await reviews_collection.find().to_list(100)
    if not reviews:
        raise HTTPException(status_code=404, detail="No reviews found")
    return [review_helper(review) for review in reviews]

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)