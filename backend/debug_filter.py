import requests

base_url = "http://127.0.0.1:8000/stories"

def test(params, name):
    print(f"--- {name} ---")
    try:
        res = requests.get(base_url, params=params)
        data = res.json()
        print(f"URL: {res.url}")
        print(f"Count: {len(data)}")
    except Exception as e:
        print(f"Error: {e}")

# Test 1: No params (Should be All)
test({}, "No Params")

# Test 2: genre=None (requests usually drops this)
test({"genre": None}, "genre=None")

# Test 3: genre="" (Empty string)
test({"genre": ""}, "genre=''")

# Test 4: genre="Sci-Fi Horror" (Specific)
test({"genre": "Sci-Fi Horror"}, "genre='Sci-Fi Horror'")
