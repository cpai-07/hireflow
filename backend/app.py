from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os, uuid
from datetime import datetime

app = Flask(__name__)

# CORS = Cross-Origin Resource Sharing
# Without this, the browser refuses to let our React app (port 5173)
# call our Flask API (port 5000) — it's a browser security rule.
CORS(app)

# storage path
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

FILES = {
    "candidates":  os.path.join(DATA_DIR, "candidates.json"),
    "jobroles":    os.path.join(DATA_DIR, "jobroles.json"),
    "departments": os.path.join(DATA_DIR, "departments.json"),
    "placements":  os.path.join(DATA_DIR, "placements.json"),
}


# helper functions
def read(key):
    # Open JSON file and read data
    with open(FILES[key], "r") as file:
        data = json.load(file)

    return data


def write(key, data):
    # Open JSON file and save data
    with open(FILES[key], "w") as file:
        json.dump(data, file, indent=2)


def new_id(prefix=""):
    # Create unique ID
    return prefix + str(uuid.uuid4())[:8]


def now():
    # Return current date and time
    return datetime.now().strftime("%Y-%m-%d %H:%M")

# run cmd
if __name__ == "__main__":
    # port 5000
    app.run(debug=True, port=5000)
