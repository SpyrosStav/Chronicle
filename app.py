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
    return dict(username=session.get("username"))

# --------------------------------------------------- Login Handler --------------------------------------------------- #
app.secret_key = os.getenv("SECRET_KEY")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            flash("You must be logged in to access this page.")
            return redirect(url_for("login"))
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
    session.permanent = True 
    return jsonify({'status' : 'success', 'message' : 'Register Successful!'})

# Login
@app.route("/login", methods = ['POST'])
def login():
    username = request.form["username"]
    password = request.form["password"]

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""SELECT player_password, email FROM Players where username = ?""", username)
    row = cursor.fetchone()

    if(row):
        if(verify_password(row[0], password)):
            session["username"] = username
            session["email"] = row[1]
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
    return redirect(url_for("home"))  # Redirect to homepage

# --------------------------------------------------- Template Rendering --------------------------------------------------- #
# Serve the home page
@app.route("/")
def home():
    return render_template("index.html")

#Serve the page where the actual session will be played
@app.route("/play")
def play():
    return render_template("play.html")

# Serve the character page
@app.route("/character")
# @login_required
def single_character():
    return render_template("characterPage.html", char_id = 1)

# Serve the character list page
@app.route("/character")
def characters_list():
    return render_template("charactersListPage.html")

# Serve the campaigns page
@app.route("/campaigns")
def campaigns_list():
    return render_template("campaigns.html")

# Serve the profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

# --------------------------------------------------- API Calls --------------------------------------------------- #

# --------------- FETCH CHARACTER ---------------
@app.route("/api/character/<int:char_id>", methods = ['GET'])
def get_single_character(char_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch Character Data
    cursor.execute("""SELECT * FROM dbo.Characters WHERE character_id = ?""", (char_id,))
    row = cursor.fetchone()

    data = dict(zip([column[0] for column in cursor.description], row))

    # Fetch Skill Proficiencies
    cursor.execute("""SELECT a.character_id, b.skill_name, a.isProficient 
                        FROM Character_Skills as a
                        JOIN Skills as b
                        ON a.skill_id = b.skill_id
                        WHERE character_id = ?""", (char_id,))
    rows = cursor.fetchall()

    data['skills'] = {row[1] : row[2] for row in rows}

    cursor.close()
    conn.close()

    return jsonify(data)

# --------------- CREATE CHARACTER ---------------
@app.route('/api/create-character/', methods = ['POST'])
def create_character(player_id):
    return


# --------------- UPDATE CHARACTER ---------------
@app.route('/api/update-character/<int:char_id>', methods=['POST'])
def update_character(char_id):
    character_data_raw = request.form.get('characterData')
    character_data = json.loads(character_data_raw)
    image_file = request.files.get('image')

    if image_file:
        # image_path = os.path.join('static/images/', image_file.filename)
        ext = os.path.splitext(image_file.filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        image_file.save(image_path)
    else:
        image_path = character_data.get("profile_image_path")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""UPDATE dbo.Characters SET character_name = ?, level = ?, class = ?, subclass = ?, race = ?,
                   background = ?, strength = ?, dexterity = ?, constitution = ?, intelligence = ?, wisdom = ?,
                   charisma = ?, max_hp = ?, c_hp = ?, temp_hp = ?, ac = ?, speed = ?, inspiration = ?, profile_image_path = ?
                   WHERE character_id = ?""", 
                   (    character_data['character_name'], character_data['level'], character_data['class'], character_data['subclass'],
                        character_data['race'], character_data['background'],
                        character_data['strength'], character_data['dexterity'], character_data['constitution'],
                        character_data['intelligence'], character_data['wisdom'], character_data['charisma'],
                        character_data['max_hp'],character_data['c_hp'],character_data['temp_hp'],
                        character_data['ac'],character_data['speed'],character_data['inspiration'],
                        image_path,
                        char_id
                    ))

    for skill_name, is_proficient in character_data["skills"].items():
        cursor.execute("""UPDATE cs 
                        SET cs.isProficient = ?
                        FROM Character_Skills as cs
                        JOIN Skills as s ON cs.skill_id = s.skill_id
                        WHERE character_id = ? and s.skill_name = ? """,(is_proficient,char_id,skill_name))
        
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify(image_path), 200

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

# --------------------------------------------------- MAIN --------------------------------------------------- #
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
