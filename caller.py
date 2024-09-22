import requests
content = '''Basketball club'''

response = requests.post("http://127.0.0.1:8000/categorize", json={"text": content})

# Print the response from the FastAPI backend
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code} - {response.text}")