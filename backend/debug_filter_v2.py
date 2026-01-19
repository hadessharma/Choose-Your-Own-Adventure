import requests
import json

base_url = "http://127.0.0.1:8000/stories"

def debug(p, name):
    print(f"\n--- {name} ---")
    try:
        res = requests.get(base_url, params=p)
        print(f"Status: {res.status_code}")
        print(f"URL: {res.url}")
        if res.status_code == 200:
            print(f"Count: {len(res.json())}")
            # print([s['title'] for s in res.json()])
        else:
            print(f"Body: {res.text}")
    except Exception as e:
        print(f"Ex: {e}")

debug({}, "No Params")
debug({"genre": ""}, "Empty String")
debug({"genre": None}, "None")
