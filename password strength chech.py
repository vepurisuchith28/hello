import re

def validate_gmail(email):
    return re.fullmatch(r"^[a-zA-Z0-9._%+-]+@(gmail\.com|sasi\.ac\.in)$", email) is not None

def check_password_strength(email, password):
    score = 0
    feedback = []

    if not validate_gmail(email):
        return "❌ Invalid Gmail address.", None

    username = email.split('@')[0].lower()

    if username in password.lower():
        feedback.append("❌ Password should not contain your email username.")
    else:
        score += 1

    if len(password) >= 8: score += 1
    else: feedback.append("Use at least 8 characters.")
    if re.search(r"[a-z]", password): score += 1
    else: feedback.append("Add lowercase letters.")
    if re.search(r"[A-Z]", password): score += 1
    else: feedback.append("Add uppercase letters.")
    if re.search(r"\d", password): score += 1
    else: feedback.append("Include digits.")
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password): score += 1
    else: feedback.append("Add special characters.")

    labels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong", "Excellent"]
    return f"✅ Password Strength: {labels[min(score, 5)]}", feedback

if __name__ == "__main__":
    gmail = input("Enter Gmail: ")
    password = input("Enter Password: ")
    result, suggestions = check_password_strength(gmail, password)
    print(result)
    if suggestions:
        for item in suggestions:
            print("-", item)
