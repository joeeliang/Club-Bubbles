import requests
content = '''very authentic club'''

print(requests.get("http://127.0.0.1:8000/", json={"text":content}).json())