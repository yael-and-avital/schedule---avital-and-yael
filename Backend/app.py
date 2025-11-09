from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# טען משתני סביבה
load_dotenv()

app = Flask(__name__)

uri = os.getenv("MONGO_MY")

try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["cluster0"]
    db.list_collection_names()
    print("✅ חיבור ל-Atlas עובד")
except Exception as e:
    db = None
    print(f"❌ שגיאה בחיבור ל-Atlas: {e}")

@app.route("/test_connection")
def test_connection():
    if db is not None:
        try:
            collections = db.list_collection_names()
            return f"✅ חיבור ל-MongoDB תקין! אוספים קיימים: {collections}"
        except Exception as e:
            return f"❌ שגיאה בקריאת אוספים: {e}"
    else:
        return "❌ חיבור ל-MongoDB לא הצליח. בדקי את ההגדרות וה-IP Access ב-Atlas."

if __name__ == "__main__":
    app.run(debug=True)
