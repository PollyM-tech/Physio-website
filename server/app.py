# backend/app.py
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from dotenv import load_dotenv

from extensions import db, bcrypt, jwt, mail
from models import Doctor, Appointment, Patient  # Patient is optional now
from Resources.LoginResource import DoctorLoginResource
from Resources.AppointmentResource import AppointmentResource
from Resources.AppointmentListResource import AppointmentListResource
from Resources.patientResource import PatientResource  # ← use this one

load_dotenv()

app = Flask(__name__)
api = Api(app)

# ── DB & JWT CONFIG ─────────────────────────────
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

# ── MAIL CONFIG ────────────────────────────────
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", 587))
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "true").lower() == "true"
app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL", "false").lower() == "true"
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER", os.getenv("MAIL_USERNAME"))
app.config["DOCTOR_EMAIL"] = os.getenv("DOCTOR_EMAIL", os.getenv("MAIL_USERNAME"))

# ── INIT EXTENSIONS ─────────────────────────────
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
mail.init_app(app)
migrate = Migrate(app, db)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/")
def index():
    return jsonify({"message": "Welcome to Dr. David physio session"}), 200

# ── API ROUTES ─────────────────────────────
api.add_resource(DoctorLoginResource, "/api/doctor/login")
api.add_resource(AppointmentListResource, "/api/appointments")
api.add_resource(AppointmentResource, "/api/appointments/<int:appt_id>")
api.add_resource(PatientResource, "/api/patients/<int:patient_id>")

if __name__ == "__main__":
    app.run(debug=True)
