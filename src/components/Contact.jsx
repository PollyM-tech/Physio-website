import React, { useState } from "react";
import { Phone, Clock, MapPin, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Tender Touch Clinic (KMA Centre, Upperhill)",
    datetime: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, location, datetime, message } = formData;
    let formattedDateTime = datetime
      ? new Date(datetime).toLocaleString("en-KE", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "not specified";

    const text = `
Hello Dr. David,

A new booking request has been submitted:

Patient name: ${name}
Phone: ${phone}
Preferred location: ${location}
Preferred date & time: ${formattedDateTime}

Reason for visit:
${message || "not specified"}
    `;
    const whatsappUrl = `https://wa.me/254714704586?text=${encodeURIComponent(
      text
    )}`;
    window.open(whatsappUrl, "_blank");
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
          Reach out for appointments, questions, or personalized physiotherapy advice. You can contact Dr. David via phone, WhatsApp, or fill out the form below.
        </p>
      </div>

      {/* Info + Form */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <MapPin className="text-[#2EA3DD] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">Clinic Locations</h4>
              <p className="text-gray-600 text-sm">
                - Kenyatta National Hospital – Physiotherapy Dept<br/>
                - Tender Touch Clinic – KMA Centre, Upperhill<br/>
                - House Calls – Nairobi & nearby areas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <Phone className="text-[#06B6D4] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">Call / SMS</h4>
              <p className="text-gray-600 text-sm">+254 714 704 586</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <Clock className="text-[#FBBF24] mt-1" size={28} />
            <div>
              <h4 className="font-semibold text-[#062B3D] mb-1">Working Hours</h4>
              <p className="text-gray-600 text-sm">
                Mon–Fri: 8:00 am – 6:00 pm<br/>
                Sat: 9:00 am – 1:00 pm<br/>
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
              className="w-full md:w-auto px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-colors"
            >
              Send Booking Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
