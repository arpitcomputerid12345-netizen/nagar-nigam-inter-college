import os
import json
import time
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so the React development frontend running on port 3000 (or other ports) can talk to Flask
CORS(app, resources={r"/api/*": {"origins": "*"}})

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json")

# Default seed data representing Nagar Nigam Inter College
default_data = {
    "stats": {
        "visitorCount": 1423,
        "totalAdmissions": 2,
        "activeNotices": 5,
        "totalStudents": 1250
    },
    "notices": [
        {
            "id": "n1",
            "title": "Admissions Open for Academic Session 2026-27",
            "content": "Online registration for Classes VI to XII has started. Eligible candidates can submit their forms online. Entrance exams will be held in July.",
            "date": "2026-06-25",
            "category": "Admission",
            "isUrgent": True,
            "author": "Principal Desk"
        },
        {
            "id": "n2",
            "title": "Scholarship Scheme Notice for UP Board Students",
            "content": "Applications are invited for the Post-Matric Scholarship Scheme. Students with >75% attendance and meeting income criteria can submit documents before July 15.",
            "date": "2026-06-24",
            "category": "Academic",
            "isUrgent": True,
            "author": "Office Registry"
        },
        {
            "id": "n3",
            "title": "Annual Sports Meet 2026 Schedule",
            "content": "The Annual Sports Meet is scheduled to be held from November 10th to November 14th. Registrations for athletic events open on October 1st.",
            "date": "2026-06-20",
            "category": "Event",
            "isUrgent": False,
            "author": "Sports Dept"
        },
        {
            "id": "n4",
            "title": "Quarterly Examination Syllabus Published",
            "content": "Syllabus for the first quarterly examinations (Classes VI-XII) has been updated in the downloads section. Please download your respective class files.",
            "date": "2026-06-18",
            "category": "Academic",
            "isUrgent": False,
            "author": "Academic Coordinator"
        },
        {
            "id": "n5",
            "title": "UP Board High School and Intermediate Toppers Felicitated",
            "content": "Congratulations to our students who scored outstanding percentages in the recent Board Examinations. Best wishes for their future endeavors.",
            "date": "2026-06-15",
            "category": "General",
            "isUrgent": False,
            "author": "Principal Desk"
        }
    ],
    "events": [
        {
            "id": "e1",
            "title": "Annual Science Exhibition",
            "description": "Inter-school science model competition showcasing innovative student projects.",
            "date": "2026-07-20",
            "time": "10:00 AM",
            "location": "School Science Lab & Hall"
        },
        {
            "id": "e2",
            "title": "Independence Day Celebration",
            "description": "Flag hoisting ceremony, patriotic speech, cultural performances, and sweets distribution.",
            "date": "2026-08-15",
            "time": "08:00 AM",
            "location": "Central Playground"
        },
        {
            "id": "e3",
            "title": "Teacher's Day Special Assembly",
            "description": "Cultural program organized by senior secondary students to honor teachers.",
            "date": "2026-09-05",
            "time": "09:30 AM",
            "location": "Auditorium"
        }
    ],
    "admissions": [
        {
            "id": "APP1001",
            "fullName": "Amit Kumar Sharma",
            "fatherName": "Ram Prakash Sharma",
            "classApplied": "Class XI (Science)",
            "gender": "Male",
            "dob": "2011-04-12",
            "phone": "9837012345",
            "email": "amit.sharma@gmail.com",
            "previousSchool": "Taj Model Public School",
            "marksPercentage": 86.5,
            "address": "Mughal Road, Taj Ganj, Agra",
            "status": "Approved",
            "submissionDate": "2026-06-21",
            "remarks": "Documents verified. Fee payment pending."
        },
        {
            "id": "APP1002",
            "fullName": "Pooja Kumari Yadav",
            "fatherName": "Devendra Yadav",
            "classApplied": "Class IX",
            "gender": "Female",
            "dob": "2012-08-19",
            "phone": "9897112233",
            "email": "pooja.yadav@gmail.com",
            "previousSchool": "Nagar Palika School, Agra",
            "marksPercentage": 74.2,
            "address": "Gobari Marg, Taj Ganj, Agra",
            "status": "Pending",
            "submissionDate": "2026-06-25",
            "remarks": "Awaiting original marksheet."
        }
    ],
    "downloads": [
        {
            "id": "d1",
            "title": "Class XI Science Quarterly Syllabus 2026-27",
            "category": "Syllabus",
            "fileUrl": "#",
            "dateAdded": "2026-06-18",
            "size": "1.2 MB"
        },
        {
            "id": "d2",
            "title": "Online Admission Form Guideline Prospectus",
            "category": "Admission",
            "fileUrl": "#",
            "dateAdded": "2026-06-20",
            "size": "2.4 MB"
        },
        {
            "id": "d3",
            "title": "School Academic Calendar & Holiday List 2026",
            "category": "Other",
            "fileUrl": "#",
            "dateAdded": "2026-01-05",
            "size": "850 KB"
        },
        {
            "id": "d4",
            "title": "Class X UP Board Sample Question Papers (Mathematics)",
            "category": "Other",
            "fileUrl": "#",
            "dateAdded": "2026-05-12",
            "size": "3.1 MB"
        }
    ],
    "messages": [
        {
            "id": "m1",
            "name": "Sanjay Gupta",
            "email": "sanjay.gupta@yahoo.com",
            "subject": "Admission Inquiry",
            "message": "Hello, I want to know if there are seats available in Class XI Commerce stream for my ward. What is the process?",
            "date_added": "2026-06-26"
        }
    ]
}

def load_db():
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, "w") as f:
            json.dump(default_data, f, indent=4)
        return default_data
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        print("Error reading python-backend db:", e)
        return default_data

def save_db(data):
    try:
        with open(DATA_FILE, "w") as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print("Error saving python-backend db:", e)

@app.route("/api/stats", methods=["GET"])
def get_stats():
    db = load_db()
    return jsonify(db["stats"])

@app.route("/api/stats/visit", methods=["POST"])
def increment_visit():
    db = load_db()
    db["stats"]["visitorCount"] = db["stats"].get("visitorCount", 1423) + 1
    save_db(db)
    return jsonify({"success": True, "visitorCount": db["stats"]["visitorCount"]})

@app.route("/api/notices", methods=["GET"])
def get_notices():
    db = load_db()
    return jsonify(db["notices"])

@app.route("/api/notices", methods=["POST"])
def add_notice():
    db = load_db()
    data = request.json or {}
    new_notice = {
        "id": f"n{int(time.time() * 1000)}",
        "title": data.get("title", "Untitled Notice"),
        "content": data.get("content", ""),
        "date": time.strftime("%Y-%m-%d"),
        "category": data.get("category", "General"),
        "isUrgent": bool(data.get("isUrgent", False)),
        "author": data.get("author", "School Admin")
    }
    db["notices"].insert(0, new_notice)
    db["stats"]["activeNotices"] = len(db["notices"])
    save_db(db)
    return jsonify(new_notice), 201

@app.route("/api/notices/<id>", methods=["DELETE"])
def delete_notice(id):
    db = load_db()
    db["notices"] = [n for n in db["notices"] if n["id"] != id]
    db["stats"]["activeNotices"] = len(db["notices"])
    save_db(db)
    return jsonify({"success": True})

@app.route("/api/events", methods=["GET"])
def get_events():
    db = load_db()
    return jsonify(db["events"])

@app.route("/api/events", methods=["POST"])
def add_event():
    db = load_db()
    data = request.json or {}
    new_event = {
        "id": f"e{int(time.time() * 1000)}",
        "title": data.get("title", "Untitled Event"),
        "description": data.get("description", ""),
        "date": data.get("date", time.strftime("%Y-%m-%d")),
        "time": data.get("time", ""),
        "location": data.get("location", "")
    }
    db["events"].append(new_event)
    save_db(db)
    return jsonify(new_event), 201

@app.route("/api/admissions", methods=["GET"])
def get_admissions():
    db = load_db()
    return jsonify(db["admissions"])

@app.route("/api/admissions", methods=["POST"])
def add_admission():
    db = load_db()
    data = request.json or {}
    import random
    app_id = f"APP{random.randint(1000, 9999)}"
    new_app = {
        "id": app_id,
        "fullName": data.get("fullName", ""),
        "fatherName": data.get("fatherName", ""),
        "classApplied": data.get("classApplied", "Class XI"),
        "gender": data.get("gender", "Male"),
        "dob": data.get("dob", ""),
        "phone": data.get("phone", ""),
        "email": data.get("email", ""),
        "previousSchool": data.get("previousSchool", "N/A"),
        "marksPercentage": float(data.get("marksPercentage", 0)),
        "address": data.get("address", ""),
        "status": "Pending",
        "submissionDate": time.strftime("%Y-%m-%d"),
        "remarks": "Form submitted successfully. Documents under review."
    }
    db["admissions"].insert(0, new_app)
    db["stats"]["totalAdmissions"] = len(db["admissions"])
    save_db(db)
    return jsonify(new_app), 201

@app.route("/api/admissions/<id>", methods=["PATCH"])
def update_admission(id):
    db = load_db()
    data = request.json or {}
    application = None
    for app_item in db["admissions"]:
        if app_item["id"] == id:
            application = app_item
            break
    if not application:
        return jsonify({"error": "Application not found"}), 404
    
    if "status" in data:
        application["status"] = data["status"]
    if "remarks" in data:
        application["remarks"] = data["remarks"]
        
    save_db(db)
    return jsonify(application)

@app.route("/api/admissions/status", methods=["GET"])
def get_admission_status():
    db = load_db()
    app_id = request.args.get("application_id")
    if not app_id:
        return jsonify({"error": "application_id is required"}), 400
    
    application = None
    for app_item in db["admissions"]:
        if app_item["id"].lower() == app_id.lower():
            application = app_item
            break
            
    if not application:
        return jsonify({"error": "Application not found"}), 404
    return jsonify(application)

@app.route("/api/downloads", methods=["GET"])
def get_downloads():
    db = load_db()
    return jsonify(db["downloads"])

@app.route("/api/downloads", methods=["POST"])
def add_download():
    db = load_db()
    data = request.json or {}
    new_download = {
        "id": f"d{int(time.time() * 1000)}",
        "title": data.get("title", "Syllabus File"),
        "category": data.get("category", "Other"),
        "fileUrl": data.get("fileUrl", "#"),
        "dateAdded": time.strftime("%Y-%m-%d"),
        "size": data.get("size", "1.0 MB")
    }
    db["downloads"].insert(0, new_download)
    save_db(db)
    return jsonify(new_download), 201

@app.route("/api/downloads/<id>", methods=["DELETE"])
def delete_download(id):
    db = load_db()
    db["downloads"] = [d for d in db["downloads"] if d["id"] != id]
    save_db(db)
    return jsonify({"success": True})

@app.route("/api/messages", methods=["GET"])
def get_messages():
    db = load_db()
    return jsonify(db["messages"])

@app.route("/api/contact", methods=["POST"])
def submit_contact():
    db = load_db()
    data = request.json or {}
    new_message = {
        "id": f"m{int(time.time() * 1000)}",
        "name": data.get("name", "Anonymous"),
        "email": data.get("email", ""),
        "subject": data.get("subject", "No Subject"),
        "message": data.get("message", ""),
        "dateAdded": time.strftime("%Y-%m-%d")
    }
    db["messages"].insert(0, new_message)
    save_db(db)
    return jsonify({"success": True, "message": "Your query has been submitted successfully."})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")
    
    if role == "teacher":
        if username == "admin" and password == "password123":
            return jsonify({
                "success": True,
                "user": {"name": "Principal & Admin", "role": "teacher", "username": "admin"}
            })
        else:
            return jsonify({"error": "Invalid admin/teacher credentials. (Tip: admin / password123)"}), 401
            
    elif role == "student":
        db = load_db()
        application = None
        for app_item in db["admissions"]:
            if app_item["id"].lower() == username.lower():
                application = app_item
                break
                
        if application:
            return jsonify({
                "success": True,
                "user": {
                    "name": application["fullName"],
                    "role": "student",
                    "rollNumber": application["id"],
                    "classApplied": application["classApplied"],
                    "status": application["status"]
                }
            })
        elif username.upper() == "ROLL2026":
            return jsonify({
                "success": True,
                "user": {
                    "name": "Saurabh Mishra (Roll: 10245)",
                    "role": "student",
                    "rollNumber": "ROLL2026",
                    "classApplied": "Class XII (Commerce)",
                    "status": "Approved"
                }
            })
        else:
            return jsonify({"error": "Invalid Roll No or Application ID. (Tip: Use 'ROLL2026' or application ID like 'APP1001')"}), 401
            
    else:
        return jsonify({"error": "Unknown login role"}), 400

if __name__ == "__main__":
    # Create static data.json if not exists
    load_db()
    print("Python Flask Backend running on http://127.0.0.1:5000")
    app.run(port=5000, debug=True)
