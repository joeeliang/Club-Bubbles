from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re
from cerebras.cloud.sdk import Cerebras

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend address
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class TextData(BaseModel):
    text: str

def get_similarity_score(content):
    '''Given a club proposal, it returns how similar the club is, with 0 being the least similar and 10 the most similar'''
    client = Cerebras(
        api_key="csk-yfvtfjd6tkrprhdy9334mt3mmxfvr6f96tw8xevekjfx3hdv"
    )

    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a similarity detector for school club proposals..."
            },
            {
                "role": "user",
                "content": content
            }
        ],
        model="llama3.1-70b",
        stream=True,
        max_tokens=5024,
        temperature=0,
        top_p=1
    )

    score = ""
    for chunk in stream:
        score += chunk.choices[0].delta.content or ""

    return score.strip()

@app.post("/")
def get_authenticity_score(data: TextData):
    '''Given a club proposal, it returns how authentic the club is, with 0 being the least authentic and 10 the most authentic'''
    client = Cerebras(
        api_key="csk-yfvtfjd6tkrprhdy9334mt3mmxfvr6f96tw8xevekjfx3hdv"
    )

    content = data.text

    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an authenticity detector for school club proposals..."
            },
            {
                "role": "user",
                "content": content
            }
        ],
        model="llama3.1-8b",
        stream=True,
        max_tokens=5024,
        temperature=0,
        top_p=1
    )

    score = ""
    for chunk in stream:
        score += chunk.choices[0].delta.content or ""
    integers = re.findall(r'\d+', score)
    return {"authenticity_score": integers[0]}

