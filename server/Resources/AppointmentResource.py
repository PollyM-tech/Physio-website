from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from datetime import datetime

from models import Appointment, db


class AppointmentResource(Resource):
    # Parser for doctor-facing PATCH updates
    patch_parser = reqparse.RequestParser()
    patch_parser.add_argument(
        "status",
        type=str,
        required=False,
        choices=("Pending", "Confirmed", "Rescheduled"),
        help="Status must be Pending, Confirmed, or Rescheduled",
        location="json",
    )
    patch_parser.add_argument(
        "datetime",
        type=str,
        required=False,
        location="json",
    )
    patch_parser.add_argument(
        "notes",
        type=str,
        required=False,
        location="json",
    )

    @jwt_required()
    def get(self, appt_id):
        """Return a single appointment (used as 'patient file')."""
        appt = Appointment.query.get(appt_id)
        if not appt:
            return {"message": "Appointment not found"}, 404
        return appt.to_dict(), 200

    @jwt_required()
    def patch(self, appt_id):
        appt = Appointment.query.get(appt_id)
        if not appt:
            return {"message": "Appointment not found"}, 404

        data = self.patch_parser.parse_args()
        updated = False

        if data.get("status") is not None:
          appt.status = data["status"]
          updated = True

        if data.get("datetime"):
          try:
              appt.scheduled_at = datetime.fromisoformat(data["datetime"])
          except ValueError:
              return {
                  "message": "Invalid datetime format. Use ISO 8601 like 2025-12-03T08:00"
              }, 400
          updated = True

        if data.get("notes") is not None:
          appt.doctor_notes = data["notes"]
          updated = True

        if not updated:
          return {"message": "No fields updated"}, 400

        db.session.commit()

        return appt.to_dict(), 200
