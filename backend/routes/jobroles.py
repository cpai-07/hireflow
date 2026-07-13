from flask import Blueprint, request, jsonify
from utils.helpers import read, write, new_id, now


jobroles_bp = Blueprint("jobroles",__name__,url_prefix="/api/jobroles")

@jobroles_bp.route("", methods=["GET"])
def get_jobroles():

    # Read job roles
    data = read("jobroles")

    # Get search value
    search = request.args.get("search")

    # Filter by title
    if search is not None:

        search = search.lower()

        filtered_roles = []

        # Filtering based on title
        for job in data:
            title = job["title"].lower()

            if search in title:
                filtered_roles.append(job)

        data = filtered_roles

    return jsonify(data)


@jobroles_bp.route("/<jid>", methods=["GET"])
def get_jobrole(jid):

    # Read job roles
    data = read("jobroles")

    # Find job role by id
    jobrole = None

    for job in data:
        if job["id"] == jid:
            jobrole = job
            break

    # If not found
    if jobrole is None:
        return jsonify({"error": "Job role not found"}), 404

    return jsonify(jobrole)


@jobroles_bp.route("", methods=["POST"])
def create_jobrole():

    # Get data from request
    body = request.get_json()

    # Check required field
    if "title" not in body or body["title"] == "":
        return jsonify({"error": "title is required"}), 400

    # Create job role
    jobrole = {
        "id": new_id("role-"),
        "title": body["title"],
        "department": body.get("department", ""),
        "salaryBand": body.get("salaryBand", ""),
        "level": body.get("level", "Mid"),
        "openPositions": body.get("openPositions", 1),
        "created_at": now()
    }

    # Read existing job roles
    data = read("jobroles")

    # Add new job role
    data.append(jobrole)

    # Save data
    write("jobroles", data)

    return jsonify(jobrole), 201


@jobroles_bp.route("/<jid>", methods=["PUT"])
def update_jobrole(jid):

    # Read job roles
    data = read("jobroles")

    # Find job role
    jobrole = None

    for job in data:
        if job["id"] == jid:
            jobrole = job
            break

    # If job role not found
    if jobrole is None:
        return jsonify({"error": "Job role not found"}), 404

    # Get updated data
    body = request.get_json()

    # Update fields if provided
    fields = ["title", "department", "salaryBand", "level", "openPositions"]

    for field in fields:
        if field in body:
            jobrole[field] = body[field]

    # Update timestamp
    jobrole["updated_at"] = now()

    # Save data
    write("jobroles", data)

    return jsonify(jobrole)


@jobroles_bp.route("/<jid>", methods=["DELETE"])
def delete_jobrole(jid):

    # Read job roles
    data = read("jobroles")

    # Find job role
    jobrole = None

    for job in data:
        if job["id"] == jid:
            jobrole = job
            break

    # If job role not found
    if jobrole is None:
        return jsonify({"error": "Job role not found"}), 404

    # Remove job role
    data.remove(jobrole)

    # Save updated data
    write("jobroles", data)

    return jsonify({"message": "Job role deleted"})
