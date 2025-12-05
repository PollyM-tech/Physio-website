# backend/Resources/LoginResource.py
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token

from models import Doctor
from extensions import bcrypt


class DoctorLoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "email",
        type=str,
        required=True,
        help="Email is required",
        location="json",
    )
    parser.add_argument(
        "password",
        type=str,
        required=True,
        help="Password is required",
        location="json",
    )

    def post(self):
        data = self.parser.parse_args()
        # normalize email
        email = (data["email"] or "").strip().lower()
        password = data["password"]

        # lookup doctor by normalized email
        doctor = Doctor.query.filter_by(email=email).first()
        if not doctor or not doctor.check_password(bcrypt, password):
            return {"message": "Invalid credentials"}, 401

        access_token = create_access_token(identity=str(doctor.id))

        return {
            "access_token": access_token,
            "doctor": {
                "id": doctor.id,
                "name": doctor.name,
                "email": doctor.email,
            },
        }, 200
