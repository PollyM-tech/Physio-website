import React, { useState } from "react";

const Contact = () => {
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

    let formattedDateTime = "not specified";
    if (datetime) {
      formattedDateTime = new Date(datetime).toLocaleString("en-KE", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    const text = `
Hello Dr. David,

A new booking request has been submitted from your website.

Patient name: ${name}
Phone: ${phone}
Preferred location: ${location}
Preferred date & time: ${formattedDateTime}

Reason for visit:
${message || "not specified"}

NOTE:
• Please call or text the patient to agree on the final date and time.
• For Kenyatta National Hospital (KNH), kindly remind the patient to visit the hospital in person to complete registration.
`;

    const whatsappUrl = `https://wa.me/254714704586?text=${encodeURIComponent(
      text
    )}`;

    // Open WhatsApp chat for Dr. David with all the info
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-white text-[#062B3D] border-t border-gray-100 py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.25em] text-[#062B3D] mb-2">
            CONTACT DR. DAVID
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2EA3DD]">
            Book an appointment or ask a question
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-[680px] mx-auto">
            Please call Dr. David first to agree on the best time and location.
            After you have spoken on the phone, you can use this form to send
            your details so your booking can be noted. For Kenyatta National
            Hospital (KNH), please also plan to visit the hospital personally to
            complete registration.
          </p>
        </div>

        {/* Layout: info + form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#062B3D] mb-2">
                Clinic Locations
              </h3>
              <p className="text-sm text-gray-700">
                Kenyatta National Hospital – Physiotherapy Department
                <br />
                Tender Touch Clinic – KMA Centre, Upperhill, Nairobi
                <br />
                House Calls – Nairobi and surrounding areas (by agreement)
              </p>
              <p className="mt-2 text-xs text-gray-500">
                For KNH appointments, patients are encouraged to visit the
                hospital in person to finalize registration and payment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#062B3D] mb-2">
                Contact Details
              </h3>
              <p className="text-sm text-gray-700">
                Phone (call or SMS):{" "}
                <span className="font-semibold">+254 714 704 586</span>
                <br />
                Email:{" "}
                <span className="font-semibold">
                  dr.david.okinda@example.com
                </span>
              </p>

              {/* Call button – important since many don’t have WhatsApp */}
              <a
                href="tel:+254714704586"
                className="mt-3 inline-flex items-center px-6 py-2 rounded-full bg-[#2EA3DD] text-white text-sm font-semibold hover:bg-[#0f5e93] transition-colors"
              >
                Call Dr. David
              </a>

              {/* Optional WhatsApp shortcut if the patient has WhatsApp */}
              <a
                href={`https://wa.me/254714704586?text=${encodeURIComponent(
                  "Hello Dr. David, I would like to ask about physiotherapy or booking an appointment."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 ml-0 md:ml-3 inline-flex items-center px-6 py-2 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                WhatsApp Dr. David
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#062B3D] mb-2">
                Working Hours
              </h3>
              <p className="text-sm text-gray-700">
                Monday – Friday: 8:00 am – 6:00 pm
                <br />
                Saturday: 9:00 am – 1:00 pm
                <br />
                House calls by appointment.
              </p>
            </div>
          </div>

          {/* Contact / booking form */}
          <div className="bg-[#062B3D] text-white rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Send your details
            </h3>
            <p className="text-xs text-gray-200 mb-4">
              Filling this form does not confirm your appointment. Dr. David
              will review your details and confirm with you by call or SMS.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="email">
                  Email Address (optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                  placeholder="+254..."
                  required
                />
              </div>

              {/* Location select: Tender Touch / House call / KNH */}
              <div>
                <label className="block text-sm mb-1" htmlFor="location">
                  Where would you like to be seen?
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                >
                  <option>Tender Touch Clinic (KMA Centre, Upperhill)</option>
                  <option>House Call</option>
                  <option>Kenyatta National Hospital (KNH)</option>
                </select>
              </div>

              {/* Preferred date/time */}
              <div>
                <label className="block text-sm mb-1" htmlFor="datetime">
                  Preferred date & time
                </label>
                <input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="message">
                  Briefly describe your pain or concern
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl px-3 py-2 text-sm text-[#062B3D] focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
                  placeholder="e.g. lower back pain for 3 months, worse when sitting..."
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full md:w-auto px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-colors"
              >
                Send booking details to Dr. David
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
