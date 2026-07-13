from flask import Blueprint, request, jsonify
from utils.helpers import read, write, new_id, now

departments_bp = Blueprint("departments", __name__, url_prefix="/api/departments")

@departments_bp.route("", methods=["GET"])
def get_departments():

    # Read departments
    data = read("departments")

    # Return departments
    return jsonify(data)


@departments_bp.route("", methods=["POST"])
def create_department():

    # Get data from request
    body = request.get_json()

    # Check required field
    if "name" not in body or body["name"] == "":
        return jsonify({"error": "name is required"}), 404

    # Create department
    department = {
        "id": new_id("dept-"),
        "name": body["name"],
        "manager": body.get("manager", ""),
        "location": body.get("location", ""),
        "headcount": body.get("headcount", 0),
        "created_at": now()
    }

    # Read existing departments
    data = read("departments")

    # Add new department
    data.append(department)

    # Save data
    write("departments", data)

    return jsonify(department), 201

@departments_bp.route("/<did>", methods=["PUT"])
def update_department(did):

    # Read departments
    data = read("departments")

    # Find department
    department = None

    for dept in data:
        if dept["id"] == did:
            department = dept
            break

    # If department not found
    if department is None:
        return jsonify({"error": "Department not found"}), 404

    # Get updated data
    body = request.get_json()

    # Update fields if provided
    fields = ["name", "manager", "location", "headcount"]

    for field in fields:
        if field in body:
            department[field] = body[field]

    # Save data
    write("departments", data)

    return jsonify(department)


@departments_bp.route("/<did>", methods=["DELETE"])
def delete_department(did):

    # Read departments
    data = read("departments")

    # Find department
    department = None

    for dept in data:
        if dept["id"] == did:
            department = dept
            break

    # If department not found
    if department is None:
        return jsonify({"error": "Department not found"}), 404

    # Remove department
    data.remove(department)

    # Save updated data
    write("departments", data)

    return jsonify({"message": "Department deleted"})
