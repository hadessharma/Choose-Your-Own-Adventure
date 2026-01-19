import requests

url = "http://127.0.0.1:8000/genres"

try:
    print("Fetching genres...")
    res = requests.get(url)
    if res.status_code == 200:
        genres = res.json()
        print("Success!")
        print(f"Genres found: {genres}")
        if "Fantasy" in genres:
            print("Verified: 'Fantasy' genre is present.")
    else:
        print(f"Failed: {res.status_code}")
except Exception as e:
    print(f"Error: {e}")
