import React, { useState } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import { useAppointments } from "../context/AppointmentsContext";
import { API_BASE_URL } from "../apiConfig";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Tender Touch Clinic (KMA Centre, Upperhill)",
    datetime: "",
    message: "",
  });

  const { addAppointment } = useAppointments();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          datetime: formData.datetime, // matches backend key
          message: formData.message,
        }),
      });

      if (res.ok) {
        const created = await res.json(); // this is appt from backend

        // update local context (if available)
        if (addAppointment) {
          addAppointment(created);
        }

        setStatus({
          type: "success",
          message:
            "Your booking request was sent successfully. You will be contacted to confirm the appointment.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "Tender Touch Clinic (KMA Centre, Upperhill)",
          datetime: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({
          type: "error",
          message:
            data.message ||
            "Something went wrong while sending your request. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Network error. Please check your connection or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#eef2f6] via-white to-[#fef9f0] py-24 px-6 md:px-12 overflow-hidden">
      {/* Floating circles */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#2EA3DD]/20 rounded-full blur-3xl animate-floatSlow -z-10"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FBBF24]/20 rounded-full blur-3xl animate-floatSlow2 -z-10"></div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2EA3DD] mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-700 text-base md:text-lg">
          Reach out for appointments, questions, or personalized physiotherapy
          advice. You can call, text, or fill out the form below.
        </p>
      </div>

      {/* Info + Form */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <MapPin className="text-[#2EA3DD] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">
                Clinic Locations
              </h4>
              <p className="text-gray-600 text-sm">
                - Kenyatta National Hospital – Physiotherapy Dept
                <br />
                - Tender Touch Clinic – KMA Centre, Upperhill
                <br />- House Calls – Nairobi & nearby areas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <Phone className="text-[#06B6D4] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">Call / SMS</h4>
              <p className="text-gray-600 text-sm">+254 714 660729</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <Clock className="text-[#FBBF24] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">
                Working Hours
              </h4>
              <p className="text-gray-600 text-sm">
                Mon–Fri: 8:00 am – 6:00 pm
                <br />
                Sat: 9:00 am – 1:00 pm
                <br />
                House calls by appointment
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#2EA3DD]">
            Send Your Details
          </h3>

          {/* Status message */}
          {status && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-4 text-sm rounded-xl px-4 py-3 ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              required
              pattern="^(?:\\+254|254|0)(7|1)[0-9]{8}$|^\\+?[0-9]{7,15}$"
              title="Enter a valid phone number. Kenyan: 0712345678 or +254712345678. International: +123456789"
            />

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            >
              <option>Tender Touch Clinic (KMA Centre, Upperhill)</option>
              <option>House Call</option>
              <option>Kenyatta National Hospital (KNH)</option>
            </select>

            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Briefly describe your concern"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-8 py-3 rounded-full font-semibold text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2EA3DD] hover:bg-[#0f5e93]"
              }`}
            >
              {loading ? "Sending..." : "Send Booking Details"}
            </button>
          </form>
        </div>
      </div>
      <footer className="py-6 bg-[#041E2A] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>
            &copy; {new Date().getFullYear()} Dr. David Okinda. All rights
            reserved.
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-[#2EA3DD] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactPage;
