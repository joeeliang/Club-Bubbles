import json
from cerebra import get_similarity_score

# Testing file.

existing = ""

with open('otherclubs.json') as f:
    json_obj = json.load(f)

for club in json_obj['clubs']:
    existing += f"Club Name: {club['name']}, Description: {club['description']}"

print(existing)

print(get_similarity_score("New club: anime club \n" + existing))