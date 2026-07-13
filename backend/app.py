from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.candidates import candidates_bp
from routes.jobroles import jobroles_bp
from routes.departments import departments_bp
from routes.placements import placement_bp

app = Flask(__name__)

# CORS = Cross-Origin Resource Sharing
# Without this, the browser refuses to let our React app (port 5173)
# call our Flask API (port 5000) — it's a browser security rule.
CORS(app)

# candidate route
app.register_blueprint(candidates_bp)

# Job route
app.register_blueprint(jobroles_bp)

# department route
app.register_blueprint(departments_bp)

# placement route
app.register_blueprint(placement_bp)


# run cmd
if __name__ == "__main__":
    # port 5000
    app.run(debug=True, port=5000)
