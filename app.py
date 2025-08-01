from flask import Flask, render_template, jsonify, request, session, redirect, url_for, flash
from dotenv import load_dotenv
from datetime import timedelta
from functools import wraps
from werkzeug.utils import secure_filename
from backend.auth.pwd_hash import hash_password, verify_password
from backend.auth.register import checkRegisterError
import pyodbc,os,json,uuid,bcrypt,re

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

load_dotenv("config.env")
# --------------------------------------------------- STATIC DECLARATION --------------------------------------------------- #
app.config['ENV'] = os.getenv('ENV', 'production')
UPLOAD_FOLDER = 'static/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --------------------------------------------------- DB Connection --------------------------------------------------- #
SERVER = os.getenv("SERVER")
DATABASE = os.getenv("DATABASE")
DRIVER = 'ODBC Driver 17 for SQL Server'
CONN_STR = f'DRIVER={DRIVER};SERVER={SERVER};DATABASE={DATABASE};Trusted_Connection=yes'
def get_db_connection():
    return pyodbc.connect(CONN_STR)

# --------------------------------------------------- Decorators --------------------------------------------------- #
@app.context_processor
def inject_user():
    return {
        "username":session.get("username"),
        "user_id":session.get("user_id"),
        "email":session.get("email")
    }

# --------------------------------------------------- Login Handler --------------------------------------------------- #
app.secret_key = os.getenv("SECRET_KEY")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "username" not in session:
            flash("You must be logged in to access this page.", "warning")
            return redirect(url_for("home"))
        return f(*args, **kwargs)
    return decorated_function

# Register
@app.route("/register", methods = ['POST'])
def register():
    conn = get_db_connection()
    cursor = conn.cursor()
    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]
    hashed_password = hash_password(password)
    

    try:
        cursor.execute("""INSERT INTO Players (username,email,player_password)
                       VALUES (?,?,?)""", (username,email,hashed_password))
        new_id = cursor.fetchone()[0]
        conn.commit()

    except pyodbc.IntegrityError as e:
        cursor.close()
        conn.close()
        takenField = checkRegisterError(str(e))
        return jsonify({'status' : 'failure', 'message' : f'{takenField} already exists'})
    
    cursor.close()
    conn.close()
    session["username"] = username
    session["email"] = email
    session["user_id"] = new_id
    session.permanent = True 
    return jsonify({'status' : 'success', 'message' : 'Register Successful!'})

# Login
@app.route("/login", methods = ['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""SELECT player_password, email, player_id FROM Players where username = ?""", username)
    row = cursor.fetchone()

    if(row):
        if(verify_password(row[0], password)):
            session["username"] = username
            session["email"] = row[1]
            session["user_id"] = row[2]
            session.permanent = True
            return jsonify({'status' : 'success', 'message' : 'Login Successful'})
        else:
            cursor.close()
            conn.close()
            return jsonify({'status' : 'failure', 'message' : 'Wrong Password'})
    else:
        cursor.close()
        conn.close()
        return jsonify({'status' : 'failure', 'message' : 'Username does not exist'})

@app.route("/logout")
def logout():
    session.pop("username", None)  # Remove user session
    session.pop("email", None)  # Remove user session
    session.pop("user_id", None)  # Remove user session
    return redirect(url_for("home"))  # Redirect to homepage

# --------------------------------------------------- Template Rendering --------------------------------------------------- #
# HOME PAGE
@app.route("/")
def home():
    return render_template("index.html")

# WHERE THE CAMPAIGN WILL BE PLAYED
@app.route("/play")
def play():
    return render_template("play.html")

# CHARACTER LIST PAGE
@app.route("/characterlist")
@login_required
def characterList():
    username = session.get("username", '')
    return render_template("characterListPage.html", username = username)

# CHARACTER SHEET PAGE
@app.route("/charactersheet/<int:id>")
def characterSheet(id):
    return render_template("characterSheetPage.html", char_id = id)

# CAMPAIGNS PAGE
@app.route("/campaigns")
def campaignList():
    return render_template("campaigns.html")

# PROFILE PAGE
@app.route("/profile")
def profile():
    return render_template("profile.html")

# --------------------------------------------------- API Calls --------------------------------------------------- #
# --------------- FETCH LIST OF CHARACTERS ---------------
@app.route('/api/list-of-characters/')
def get_list_of_characters():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(""" SELECT a.* 
                   FROM CHARACTERS AS a JOIN Players as b ON a.player_id = b.player_id 
                   WHERE b.username = ? ORDER BY a.character_id ASC""", 
                   (session["username"],)) 
    rows = cursor.fetchall()

    data = []
    for row in rows :
        record = dict(zip([column[0] for column in cursor.description], row))
        data.append(record)

    return jsonify(data)

# --------------- CREATE CHARACTER ---------------
@app.route('/api/create-character/', methods = ['POST'])
def create_character(player_id):
    return

# --------------- FETCH CHARACTER ---------------
@app.route("/api/character/<int:char_id>", methods = ['GET'])
def get_single_character(char_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch Character Data
    cursor.execute("""SELECT a.*, b.username FROM Characters AS a JOIN Players as b ON a.player_id = b.player_id WHERE a.character_id = ?""", (char_id,))
    row = cursor.fetchone()

    if not row:
        return jsonify({"error": "Character not found"}), 404

    data = dict(zip([column[0] for column in cursor.description], row))

    # Fetch Skill Proficiencies
    cursor.execute("""SELECT a.character_id, b.skill_name, a.isProficient 
                    FROM Character_Skills as a JOIN Skills as b
                    ON a.skill_id = b.skill_id 
                    WHERE character_id = ?""", (char_id,))
    rows = cursor.fetchall()

    data['skills'] = {row[1] : row[2] for row in rows}

    # Fetch Weapons
    cursor.execute("""SELECT * FROM Weapons WHERE character_id = ?""", (char_id,))
    rows = cursor.fetchall()
    data['weapons'] = [{"weapon_id" : row[0], "name" : row[2], "atk_bonus" : row[3],
                        "damage_die" : row[4], 
                        "extra_damage": row[5], "damage_type": row[6]} for row in rows]

    cursor.close()
    conn.close()

    if 'username' not in session:
        return jsonify(data)
    
    return jsonify(data)

# --------------- UPDATE CHARACTER ---------------
@app.route('/api/update-character/<int:char_id>', methods=['POST'])
def update_character(char_id):

    # Check if logged in
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Get Form Data
    character_data_raw = request.form.get('characterData')
    character_data = json.loads(character_data_raw)
    image_file = request.files.get('image')

    # Check if player is authorized   
    if character_data["player_id"] != session["user_id"]:
        return jsonify({"error": "Forbidden"}), 403

    # Check if image has changed
    if image_file:
        ext = os.path.splitext(image_file.filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        image_path = os.path.join('static/images/characterImages/',unique_filename)
        image_file.save(image_path)
        image_path_for_db = f"/static/images/characterImages/{unique_filename}"
    else:
        image_path_for_db = character_data.get("profile_image_path")

    # Get connection
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Update Main Attributes
        update_character_core(cursor, character_data, char_id, image_path_for_db)
        # Update Skills
        update_skills(cursor, character_data["skills"], char_id)
        # Update Weapons
        update_weapons(cursor, character_data["weapons"])
        conn.commit()
        return jsonify({"message": "Character updated successfully",
                        "status": "success"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"message": "Error updating character.",
                        "status": "danger"}), 404
    finally:
        cursor.close()
        conn.close()

# --------------- ADD WEAPON ---------------
@app.route('/api/add-weapon/<int:char_id>', methods=['POST'])
def add_weapon(char_id):
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    player_id = session["user_id"]
    weapons = request.get_json()



    values = []
    for w in weapons:
        values.append((char_id,            
                       w.get("name", ""),
                        w.get("atk_bonus", 0),
                        w.get("damage_die", ""),
                        w.get("extra_damage", 0),
                        w.get("damage_type", "")
                    ))
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT 1 FROM Characters WHERE character_id = ? AND player_id = ?", (char_id, player_id))
    if not cursor.fetchone():
        return jsonify({"error": "Not allowed"}), 403

    query = """INSERT INTO Weapons (character_id,weapon_name,atk_bonus,damage_die,extra_damage,damage_type)
        VALUES (?,?,?,?,?,?)"""

    try:
        # Insert all new weapons in one batch
        cursor.executemany(query, values)
        conn.commit()
        return jsonify({"message": "Weapons inserted successfully"}), 200

    except Exception as e:
        print(e)
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# --------------- DELETE WEAPON ---------------
@app.route('/api/delete-weapon/', methods=['POST'])
def delete_weapon():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    player_id = session["user_id"]
    weapon_ids = request.get_json()
    placeholders = ','.join('?' for _ in weapon_ids)

    query = f"""DELETE FROM Weapons WHERE weapon_id IN ({placeholders}) 
                   AND character_id IN (
                   SELECT character_id FROM Characters Where player_id = ?)"""

    params = weapon_ids + [player_id]

    conn = get_db_connection()
    cursor = conn.cursor()   
    cursor.execute(query, params)
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message":"success"}),200


# --------------- PROFILE INFO ---------------
@app.route("/api/profile/", methods = ['GET'])
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

# --------------------------------------------------- HELPER FUNCTIONS ---------------------------------------------------
def update_character_core(cursor, data, char_id, image_path_for_db):
    cursor.execute("""UPDATE dbo.Characters SET character_name = ?, level = ?, class = ?, subclass = ?, race = ?,
        background = ?, strength = ?, dexterity = ?, constitution = ?, intelligence = ?, wisdom = ?,
        charisma = ?, max_hp = ?, c_hp = ?, temp_hp = ?, ac = ?, speed = ?, inspiration = ?, 
        hit_die = ?, death_saves_success = ?, death_saves_fail = ?, profile_image_path = ?
        WHERE character_id = ?""", 
        (data['character_name'], data['level'], data['class'], data['subclass'],
         data['race'], data['background'], data['strength'], data['dexterity'], data['constitution'],
         data['intelligence'], data['wisdom'], data['charisma'], data['max_hp'], data['c_hp'], data['temp_hp'],
         data['ac'], data['speed'], data['inspiration'], data['hit_die'], data['death_saves_success'],
         data['death_saves_fail'], image_path_for_db, char_id))

def update_skills(cursor, skills, char_id):
    for skill_name, is_proficient in skills.items():
        cursor.execute("""UPDATE cs
                          SET cs.isProficient = ?
                          FROM Character_Skills as cs
                          JOIN Skills as s ON cs.skill_id = s.skill_id
                          WHERE character_id = ? AND s.skill_name = ?""",
                       (is_proficient, char_id, skill_name))

def update_weapons(cursor, weapons):
    for weapon in weapons:
        cursor.execute("""UPDATE Weapons
                          SET weapon_name = ?, atk_bonus = ?, damage_die = ?, extra_damage = ?, damage_type = ?
                          WHERE weapon_id = ?""",
                       (weapon["name"], weapon["atk_bonus"], weapon["damage_die"],
                        weapon["extra_damage"], weapon["damage_type"], weapon["weapon_id"]))

# --------------------------------------------------- MAIN --------------------------------------------------- #
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
