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
                "content": "Given a club proposal, it returns how similar the club is, based on the content of the club and the motivations behind it, with 0 being the least similar and 10 the most similar."
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
                "content": "Given a club proposal, it returns how authentic the club is, based on the content of the club and the motivations behind it, with 0 being the least authentic and 10 the most authentic. Your output should be only one number. Unless you dont think the proposal is finished, in which case you will state 'Poor Proposal'. Also, do not consider any adjectives that describe the club, only look at the content and the motives of the club. Again, if that is none-existent, return 'Poor Proposal'"
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

    match = re.search(r'\d+', score)
    match = int(match.group(0)) if match else "Unfinished."

    return {"authenticity_score": match}


@app.post("/categorize")
def get_authenticity_score(data: TextData):
    '''Given a club proposal, return which category it belongs in: Humanities, STEM, Entertainment, Arts, Athletics. Your output should be one word, and that is the category.'''
    client = Cerebras(
        api_key="csk-yfvtfjd6tkrprhdy9334mt3mmxfvr6f96tw8xevekjfx3hdv"
    )

    content = data.text

    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Given a club proposal, return which category it belongs in: Humanities, STEM, Entertainment, Arts, Athletics. Your output should be one word, and that is the category."
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
    return {"category": score}