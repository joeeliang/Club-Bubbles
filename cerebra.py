import os
from cerebras.cloud.sdk import Cerebras

def get_authenticity_score(content):
    '''Given a club proposal, it returns how authentic the club is, with 0 being the least authentic and 10 the most authentic'''
    client = Cerebras(
       api_key="csk-yfvtfjd6tkrprhdy9334mt3mmxfvr6f96tw8xevekjfx3hdv"
    )

    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an authenticity detector for school club proposals. Base the score on the purpose of the club, its motives, and how much it really benefits the community. The score given ranges from 0 to 10, with 0 being the least authentic and 10 being the most authentic. Return only the score as the output, and nothing else."
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
    
    return score.strip()


def get_similarity_score(content):
    '''Given a club proposal, it returns how similar the club is, with 0 being the least similar and 10 the most similar'''
    client = Cerebras(
       api_key="csk-yfvtfjd6tkrprhdy9334mt3mmxfvr6f96tw8xevekjfx3hdv"
    )

    stream = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a similarity detector for school club proposals. Based the score on the purpose of the club, its motives, it is similar to existing clubs. You will first given the new club proposal. Then you will be provided the existing clubs list and their descriptions. The score you give ranges from 0 to 10, with 0 being the least similar and 10 being the most similar. Return only the score as the output, and nothing else."
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