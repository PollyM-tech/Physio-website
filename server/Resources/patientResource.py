from flask import jsonify
from flask_restful import Resource
from models import Patient, db

class PatientResource(Resource):
    def get(self, patient_id):
        patient = Patient.query.get(patient_id)
        if not patient:
            return {"message": "Patient not found"}, 404
        return {
            "id": patient.id,
            "name": patient.name,
            "phone": patient.phone,
            "email": patient.email,
            "location": patient.location,
            "dob": patient.dob,
            "medical_notes": patient.medical_notes,
        }, 200
