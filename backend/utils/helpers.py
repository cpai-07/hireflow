import json
import os
import uuid
from datetime import datetime


# storage path
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

# JSON file paths
FILES = {
    "candidates": "data/candidates.json",
    "jobroles": "data/jobroles.json",
    "departments": "data/departments.json",
    "placements": "data/placements.json"
}


def read(key):

    # Read data from JSON file
    with open(FILES[key], "r") as file:
        data = json.load(file)

    return data


def write(key, data):

    # Save data to JSON file
    with open(FILES[key], "w") as file:
        json.dump(data, file, indent=2)


def new_id(prefix=""):

    # Generate unique ID
    return prefix + str(uuid.uuid4())[:8]


def now():

    # Current date and time
    return datetime.now().strftime("%Y-%m-%d %H:%M")