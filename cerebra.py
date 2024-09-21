import os
from cerebras.cloud.sdk import Cerebras

def get_authenticity_score(content):

    client = Cerebras(
       api_key=os.environ.get("CEREBRAS_API_KEY")
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
        max_tokens=1024,
        temperature=0,
        top_p=1
    )

    score = ""
    for chunk in stream:
        score += chunk.choices[0].delta.content or ""
    
    return score.strip()
