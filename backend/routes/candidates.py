from flask import Blueprint, request, jsonify
from utils.helpers import read, write, new_id, now

# Blueprint wraps the routes in app.py
candidates_bp = Blueprint("candidates",__name__,url_prefix="/api/candidates")

# candidate route
@candidates_bp.route("", methods=["GET"])
def get_candidates():

    # Read all candidates from the JSON file
    data = read("candidates")

    # Get the values from the URL
    status = request.args.get("status")
    search = request.args.get("search")

    # Filter by status
    if status is not None:

        filtered_candidates = []

        for candidate in data:
            if candidate["status"] == status:
                filtered_candidates.append(candidate)

        data = filtered_candidates

    # Filter by name or role
    if search is not None:

        search = search.lower()

        filtered_candidates = []

        for candidate in data:

            name = candidate["name"].lower()
            role = candidate["role"].lower()

            if search in name or search in role:
                filtered_candidates.append(candidate)

        data = filtered_candidates

    return jsonify(data)


@candidates_bp.route("/<cid>", methods=["GET"])
def get_candidate(cid):
    data = read("candidates")
    item = None

    for candidate in data:
        if candidate["id"] == cid:
            item = candidate
            break

    if item == None:
        return jsonify({"error": "Candidate not found"}), 404

    return jsonify(item)


@candidates_bp.route("", methods=["POST"])
def create_candidate():

    # Get data sent by user
    body = request.get_json()

    # Check required fields
    required_fields = ["name", "email", "role", "department"]

    for field in required_fields:
        if field not in body or body[field] == "":
            return jsonify({"error": field + " is required"}), 404

    # Read existing candidates
    data = read("candidates")

    # Check duplicate email
    for candidate in data:
        if candidate["email"] == body["email"]:
            return jsonify({"error": "Candidate already exists"}), 404

    # Create candidate
    candidate = {
        "id": new_id("cand-"),
        "name": body["name"],
        "email": body["email"],
        "phone": body.get("phone", ""),
        "role": body["role"],
        "department": body["department"],
        "status": body.get("status", "applied"),
        "notes": body.get("notes", ""),
        "created_at": now()
    }

    # Add candidate
    data.append(candidate)

    # Save data
    write("candidates", data)

    return jsonify(candidate), 201

@candidates_bp.route("/<cid>", methods=["PUT"])
def update_candidate(cid):

    # Read candidates
    data = read("candidates")

    # Find candidate
    candidate = None

    for c in data:
        if c["id"] == cid:
            candidate = c
            break

    # If candidate not found
    if candidate is None:
        return jsonify({"error": "Candidate not found"}), 404

    # Get updated data
    body = request.get_json()

    # Update fields if provided
    fields = ["name", "email", "phone", "role", "department", "status", "notes"]

    for field in fields:
        if field in body:
            candidate[field] = body[field]

    # Update timestamp
    candidate["updated_at"] = now()

    # Save data
    write("candidates", data)

    return jsonify(candidate)


@candidates_bp.route("/<cid>", methods=["DELETE"])
def delete_candidate(cid):

    # Read candidates
    data = read("candidates")

    # Find candidate
    candidate_found = None

    for candidate in data:
        if candidate["id"] == cid:
            candidate_found = candidate
            break

    # If candidate not found
    if candidate_found is None:
        return jsonify({"error": "Candidate not found"}), 404

    # Remove candidate
    data.remove(candidate_found)

    # Save updated data
    write("candidates", data)

    return jsonify({"message": "Candidate deleted"})