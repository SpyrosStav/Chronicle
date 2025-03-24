from flask import Flask, render_template, jsonify, request, session, redirect
from dotenv import load_dotenv
import pyodbc,os

app = Flask(__name__)

load_dotenv("config.env")

# --------------------------------------------------- Database Connection Setup --------------------------------------------------- #
SERVER = os.getenv("SERVER")
DATABASE = os.getenv("DATABASE")
DRIVER = 'ODBC Driver 17 for SQL Server'
CONN_STR = f'DRIVER={DRIVER};SERVER={SERVER};DATABASE={DATABASE};Trusted_Connection=yes'
def get_db_connection():
    return pyodbc.connect(CONN_STR)


# --------------------------------------------------- Pages Serving --------------------------------------------------- #
# Serve the home page
@app.route("/")
def home():
    return render_template("index.html")

#Serve the page where the actual session will be played
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

# --------------------------------------------------- API Calls --------------------------------------------------- #
# Get Characters
@app.route("/api/characters", methods = ['GET']) 
def get_characters():
    characters = [
        {'id': 1, 'name': 'Gandalf'},
        {'id': 2, 'name': 'Frodo'},
    ]
    return jsonify(characters)

# Create New Character
@app.route("/api/characters", methods = ['POST']) 
def add_new_character():
    return

# Get Profile Info
@app.route("/api/profile", methods = ['GET'])
def fetch_profile():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""SELECT * FROM dbo.Players 
                   WHERE player_id = 1""")
    row = cursor.fetchone()
    
    player_info = {
        "player name" : row[1],
        "player email" : row[2]
    }

    cursor.close()
    conn.close()

    return jsonify(player_info), 200

@app.route("/api/test") # Simple test query
def test_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT name,email FROM dbo.Players")  
        rows = cursor.fetchall()

        players = []
        for row in rows:
            players.append({
                "player name" : row[0],
                "player email" : row[1],
            })

        cursor.close()
        conn.close()
        return jsonify(players), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --------------------------------------------------- MAIN --------------------------------------------------- #
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)