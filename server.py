from flask import Flask, render_template, jsonify

app = Flask(__name__)
server_process = None

# Serve the home page
@app.route("/")
def home():

    characters = [
        {'id': 1, 'name': 'Gandalf'},
        {'id': 2, 'name': 'Frodo'},
    ]

    return render_template("index.html", characters = characters)

# Serve the profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

# Serve the about page
@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/api/characters")
def get_characters():
    characters = [
        {'id': 1, 'name': 'Gandalf'},
        {'id': 2, 'name': 'Frodo'},
    ]
    return jsonify(characters)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)











# @app.route("/start")
# def start_server():
#     global server_process
#     server_process = subprocess.Popen(["python", "-m", "http.server", "8000"])
#     return "Server started"

# @app.route("/stop")
# def stop_server():
#     global server_process
#     if server_process:
#         server_process.kill()
#         server_process = None
#     return "Server stopped"