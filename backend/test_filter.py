import requests

base_url = "http://127.0.0.1:8000/stories"

def test_filter(genre, expected_count_min=0):
    print(f"Testing filter: {genre}")
    res = requests.get(base_url, params={"genre": genre})
    if res.status_code != 200:
        print(f"FAILED: {res.status_code}")
        return
    
    data = res.json()
    print(f"Found {len(data)} stories.")
    for s in data:
        print(f" - {s.get('title')} ({s.get('genre')})")
        if s.get('genre') != genre:
            print(f"   ERROR: Wrong genre found!")

print("--- Testing Fantasy ---")
test_filter("Fantasy", 1)

print("\n--- Testing Horror ---")
test_filter("Horror", 0)
