import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "Pass@2025")

url = "http://127.0.0.1:8000/upload_story"

story_data = {
  "title": "The Crystal Caverns",
  "genre": "Fantasy",
  "description": "A rumor of a dragon sleeping on a pile of diamond drives you into the deep caves. Will you find riches or fire?",
  "nodes": [
    {
      "id": "f1",
      "text": "You stand at the mouth of the Crystal Caverns. A warm breeze smells of sulfur. To your left is a narrow, wet tunnel. To your right is a wide path lit by glowing moss.",
      "is_ending": False,
      "options": [
        { "label": "Take the wet tunnel", "target_node_id": "f2" },
        { "label": "Follow the glowing moss", "target_node_id": "f3" }
      ]
    },
    {
      "id": "f2",
      "text": "The tunnel is tight. You squeeze through damp rocks until you slip and slide down a chute, landing in a pile of gold coins. A goblin is sleeping on top of them.",
      "is_ending": False,
      "options": [
        { "label": "Steal a coin silently", "target_node_id": "f4" },
        { "label": "Wake the goblin", "target_node_id": "f5" }
      ]
    },
    {
      "id": "f3",
      "text": "The wide path leads to a massive underground lake. A boatman waits by a skeletal ferry. He extends a bony hand.",
      "is_ending": False,
      "options": [
        { "label": "Pay him (if you have gold)", "target_node_id": "f6" },
        { "label": "Attack him", "target_node_id": "f7" }
      ]
    },
    {
      "id": "f4",
      "text": "You snatch a large ruby. The goblin snorts but stays asleep. You spot an exit tunnel behind the pile.",
      "is_ending": False,
      "options": [
        { "label": "Escape with the gem", "target_node_id": "f8" }
      ]
    },
    {
      "id": "f5",
      "text": "You kick the goblin awake. He screeches, summoning a dozen others from the shadows. They overwhelm you.",
      "is_ending": True,
      "options": []
    },
    {
      "id": "f6",
      "text": "The boatman nods and ferries you across. You reach the Dragon's lair, but the Dragon is awake. It offers you a riddle.",
      "is_ending": False,
      "options": [
        { "label": "Answer: 'Shadow'", "target_node_id": "f9" },
        { "label": "Answer: 'Fire'", "target_node_id": "f10" }
      ]
    },
    {
      "id": "f7",
      "text": "Your sword passes through his mist-like body. He touches your forehead, and you freeze into a statue of crystal, adding to his collection.",
      "is_ending": True,
      "options": []
    },
    {
      "id": "f8",
      "text": "You scramble out of the cave, rich beyond your wildest dreams. You retire to a castle by the sea.",
      "is_ending": True,
      "options": []
    },
    {
      "id": "f9",
      "text": "The Dragon laughs. 'Correct.' It allows you to take one chest of gold and leave unharmed.",
      "is_ending": True,
      "options": []
    },
    {
      "id": "f10",
      "text": "The Dragon frowns. 'Incorrect.' It breathes a torrent of flame. You are toast.",
      "is_ending": True,
      "options": []
    }
  ]
}

headers = {
    "X-Admin-Secret": ADMIN_SECRET,
    "Content-Type": "application/json"
}

try:
    print("Uploading story...")
    # Using json.dumps to ensure it's standard JSON format for the request
    response = requests.post(url, data=json.dumps(story_data), headers=headers)
    
    if response.status_code == 200:
        print("Success! Story uploaded.")
        print(response.json())
    else:
        print(f"Failed with status {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
