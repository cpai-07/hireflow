from flask import Blueprint, request, jsonify
from utils.helpers import read, write, new_id, now

placement_bp = Blueprint("placements", __name__, url_prefix="/api/placements")

@placement_bp.route("", methods=["GET"])
def get_placements():

    # Read placements
    data = read("placements")

    # Return placements
    return jsonify(data)


@placement_bp.route("", methods=["POST"])
def create_placement():

    # Get data from request
    body = request.get_json()

    # Check required fields
    required_fields = ["candidateName", "roleTitle", "startDate"]

    for field in required_fields:
        if field not in body or body[field] == "":
            return jsonify({"error": field + " is required"}), 400

    # Create placement
    placement = {
        "id": new_id("place-"),
        "candidateName": body["candidateName"],
        "candidateId": body.get("candidateId", ""),
        "roleTitle": body["roleTitle"],
        "department": body.get("department", ""),
        "startDate": body["startDate"],
        "salary": body.get("salary", ""),
        "status": body.get("status", "active"),
        "created_at": now()
    }

    # Read existing placements
    data = read("placements")

    # Add placement
    data.append(placement)

    # Save data
    write("placements", data)

    return jsonify(placement), 201


@placement_bp.route("/<pid>", methods=["PUT"])
def update_placement(pid):

    # Read placements
    data = read("placements")

    # Find placement
    placement = None

    for p in data:
        if p["id"] == pid:
            placement = p
            break

    # If placement not found
    if placement is None:
        return jsonify({"error": "Placement not found"}), 404

    # Get updated data
    body = request.get_json()

    # Update fields if provided
    fields = ["candidateName", "roleTitle", "department", "startDate", "salary", "status"]

    for field in fields:
        if field in body:
            placement[field] = body[field]

    # Save data
    write("placements", data)

    return jsonify(placement)


@placement_bp.route("/<pid>", methods=["DELETE"])
def delete_placement(pid):

    # Read placements
    data = read("placements")

    # Find placement
    placement = None

    for p in data:
        if p["id"] == pid:
            placement = p
            break

    # If placement not found
    if placement is None:
        return jsonify({"error": "Placement not found"}), 404

    # Remove placement
    data.remove(placement)

    # Save updated data
    write("placements", data)

    return jsonify({"message": "Placement deleted"})
