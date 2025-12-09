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
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const created = await res.json();
        addAppointment?.(created);
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
          message: data.message || "Something went wrong. Try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#eef2f6] via-white to-[#fef9f0] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-0 left-0 w-44 h-44 sm:w-60 sm:h-60 bg-[#2EA3DD]/20 rounded-full blur-3xl animate-floatSlow -z-10"></div>
        <div className="absolute bottom-8 right-8 w-56 h-56 sm:w-72 sm:h-72 bg-[#FBBF24]/20 rounded-full blur-3xl animate-floatSlow2 -z-10"></div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2EA3DD] mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg">
            Reach out for appointments, questions, or personalized physiotherapy advice. You can call, text, or fill out the form below.
          </p>
        </div>

        {/* Info + Form */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Info Cards */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {[
              {
                icon: <MapPin className="text-[#2EA3DD] mt-1" size={24} />,
                title: "Clinic Locations",
                desc: "- Kenyatta National Hospital – Physiotherapy Dept\n- Tender Touch Clinic – KMA Centre, Upperhill\n- House Calls – Nairobi & nearby areas",
              },
              {
                icon: <Phone className="text-[#06B6D4] mt-1" size={24} />,
                title: "Call / SMS",
                desc: "+254 714 660729",
              },
              {
                icon: <Clock className="text-[#FBBF24] mt-1" size={24} />,
                title: "Working Hours",
                desc: "Mon–Fri: 8:00 am – 6:00 pm\nSat: 9:00 am – 1:00 pm\nHouse calls by appointment",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-2xl shadow hover:shadow-2xl transition-all"
              >
                {card.icon}
                <div>
                  <h4 className="font-semibold text-[#062B3D] mb-1 sm:mb-2">
                    {card.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-line">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl">
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-[#2EA3DD]">
              Send Your Details
            </h3>

            {status && (
              <div
                role="alert"
                className={`mb-4 text-sm sm:text-base rounded-xl px-3 sm:px-4 py-2 sm:py-3 ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                required
                pattern="^(?:\\+254|254|0)(7|1)[0-9]{8}$|^\\+?[0-9]{7,15}$"
                title="Enter a valid phone number."
              />
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
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
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Briefly describe your concern"
                className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2EA3DD] hover:bg-[#0f5e93]"
                }`}
              >
                {loading ? "Sending..." : "Send Booking Details"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#041E2A] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Dr. David Okinda. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-[#2EA3DD] transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactPage;
