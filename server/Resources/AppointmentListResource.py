# backend/Resources/AppointmentListResource.py
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from flask import current_app
from flask_mail import Message
from datetime import datetime

from models import Appointment, db
from extensions import mail


class AppointmentListResource(Resource):
    # Parser for patient-facing POST
    post_parser = reqparse.RequestParser()
    post_parser.add_argument(
        "name",
        type=str,
        required=True,
        help="Name is required",
        location="json",
    )
    post_parser.add_argument(
        "email",
        type=str,
        required=False,
        location="json",
    )
    post_parser.add_argument(
        "phone",
        type=str,
        required=True,
        help="Phone is required",
        location="json",
    )
    post_parser.add_argument(
        "location",
        type=str,
        required=True,
        help="Location is required",
        location="json",
    )
    post_parser.add_argument(
        "datetime",
        type=str,
        required=True,
        help="Datetime is required (ISO string, e.g. 2025-12-03T08:00)",
        location="json",
    )
    post_parser.add_argument(
        "message",
        type=str,
        required=False,
        location="json",
    )

    # Patient-facing: create new appointment (no auth)
    def post(self):
        data = self.post_parser.parse_args()

        # Parse ISO datetime string from frontend into a real datetime
        try:
            dt_value = datetime.fromisoformat(data["datetime"])
        except ValueError:
            return {
                "message": "Invalid datetime format. Use ISO 8601 like 2025-12-03T08:00"
            }, 400

        appt = Appointment(
            name=data["name"],
            email=data.get("email"),
            phone=data["phone"],
            location=data["location"],
            scheduled_at=dt_value,  # store as datetime in DB
            message=data.get("message"),
            status="Pending",
        )

        db.session.add(appt)
        db.session.commit()

        # ── EMAIL DOCTOR ABOUT NEW APPOINTMENT ─────────────
        try:
            doctor_email = current_app.config.get("DOCTOR_EMAIL")
            if doctor_email:
                msg = Message(
                    subject="New Physiotherapy Appointment Request",
                    recipients=[doctor_email],
                )
                msg.body = (
                    "New appointment request:\n\n"
                    f"Name: {appt.name}\n"
                    f"Phone: {appt.phone}\n"
                    f"Email: {appt.email or 'N/A'}\n"
                    f"Location: {appt.location}\n"
                    f"When: {appt.scheduled_at.isoformat() if appt.scheduled_at else 'N/A'}\n"
                    f"Status: {appt.status}\n\n"
                    f"Patient message:\n{appt.message or 'No additional message.'}\n"
                )
                mail.send(msg)
        except Exception as e:
            # Don’t break the API if email fails – just log to console for now
            print("Error sending email notification:", e)

        return appt.to_dict(), 201

    # Doctor-facing: list appointments (auth)
    @jwt_required()
    def get(self):
        appointments = (
            Appointment.query
            .order_by(Appointment.created_at.desc())
            .all()
        )
        return [a.to_dict() for a in appointments], 200
