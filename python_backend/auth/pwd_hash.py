import bcrypt

# Hash password
def hash_password(password):
    salt = bcrypt.gensalt()  # Generates a new salt
    hashed = bcrypt.hashpw(password.encode(), salt)  # Hashes password with salt
    return hashed

# Verify password
def verify_password(stored_hash, input_password):
    if isinstance(stored_hash, str):
        stored_hash = stored_hash.encode('utf-8')
    return bcrypt.checkpw(input_password.encode(), stored_hash)
    
