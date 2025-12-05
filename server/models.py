# backend/models.py
from datetime import datetime as dt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

# Naming convention (optional but good practice)
naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=naming_convention)
db = SQLAlchemy(metadata=metadata)


class Doctor(db.Model, SerializerMixin):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    def set_password(self, bcrypt, password: str):
        """Hash and store the password."""
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, bcrypt, password: str) -> bool:
        """Return True if the given password matches the stored hash."""
        return bcrypt.check_password_hash(self.password_hash, password)


class Appointment(db.Model, SerializerMixin):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)

    # Patient details
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String)  # optional
    phone = db.Column(db.String, nullable=False)

    # Appointment details
    location = db.Column(db.String, nullable=False)
    # stored as DateTime in DB
    scheduled_at = db.Column(db.DateTime, default=dt.utcnow)
    message = db.Column(db.Text)
    doctor_notes = db.Column(db.Text)

    # Status: "Pending", "Confirmed", "Rescheduled", etc.
    status = db.Column(db.String(50), default="Pending")

    # Timestamps
    created_at = db.Column(db.DateTime, default=dt.utcnow)
    updated_at = db.Column(db.DateTime, default=dt.utcnow, onupdate=dt.utcnow)

    def to_dict(self):
        # expose "datetime" as an ISO string for the frontend
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "location": self.location,
            "datetime": self.scheduled_at.isoformat() if self.scheduled_at else None,
            "message": self.message,
            "doctor_notes": self.doctor_notes,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
