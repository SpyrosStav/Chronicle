import re

def checkRegisterError(error_msg):
    constraint_map = {
    "unique_username": "Username",
    "unique_email": "Email",
    }

    constraint_match = re.search(r"constraint '(\w+)'", error_msg)
    field = "unknown"
    if constraint_match:
        constraint = constraint_match.group(1)
        field = constraint_map.get(constraint, "unknown")

    value_match = re.search(r"The duplicate key value is \((.*?)\)", error_msg)
    duplicate_value = value_match.group(1) if value_match else "unknown"

    return field