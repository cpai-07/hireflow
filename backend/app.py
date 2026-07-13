from flask import Flask

app = Flask(__name__)


# run cmd
if __name__ == "__main__":
    # port 5000
    app.run(debug=True, port=5000)
