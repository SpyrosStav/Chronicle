from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
server_process = None

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://@SSTAVROPOULOS/DnDWebApp?driver=ODBC+Driver+17+for+SQL+Server&Trusted_Connection=yes'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Serve the home page
@app.route("/")
def home():

    characters = [
        {'id': 1, 'name': 'Gandalf'},
        {'id': 2, 'name': 'Frodo'},
    ]

    return render_template("index.html", characters = characters)

@app.route("/session")
def start_session():
    return render_template("session.html")

# Serve the character page
@app.route("/characters")
def characters_list():
    return render_template("characters.html")

# Serve the campaigns page
@app.route("/campaigns")
def campaigns_list():
    return render_template("campaigns.html")

# Serve the profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

# Serve the about page
@app.route("/about")
def about():
    return render_template("about.html")

# --------------------------------------------------- API Calls --------------------------------------------------- #
@app.route("/api/characters")
def get_characters():
    characters = [
        {'id': 1, 'name': 'Gandalf'},
        {'id': 2, 'name': 'Frodo'},
    ]
    return jsonify(characters)

@app.route("/api/testdb")
def test():
    # new_user = User(name="John Doe", email="johndoe@example.com")
    # db.session.add(new_user)
    # db.session.commit()
    # User.query.all()
    return


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