import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/physio.png";

const Homepage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f8fafc] via-white to-[#eef3f8] py-20 sm:py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className="flex-1 animate-fadeInUp text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Welcome to <span className="text-[#2EA3DD]">Dr. David Okinda Physiotherapy</span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Dr. David Okinda is a skilled physiotherapist specializing in pain relief, injury recovery, and improved mobility. Personalized, evidence-based care to help you regain your best self.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/about">
                <button className="px-6 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-all">
                  Learn About Me
                </button>
              </Link>
              <Link to="/services">
                <button className="px-6 py-3 rounded-full border border-[#2EA3DD]/50 text-[#041E2A] font-semibold hover:bg-[#2EA3DD] hover:text-white transition-all">
                  View Services
                </button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center md:justify-end animate-fadeIn">
            <img
              src={heroImg}
              alt="Dr David Okinda"
              className="w-full max-w-[400px] sm:max-w-[500px] h-auto rounded-2xl drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            My <span className="text-[#2EA3DD]">Services</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl mx-auto">
            Quick overview of physiotherapy services we provide.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {["Pain Management", "Rehabilitation Therapy", "Sports Injury Care"].map((service, idx) => (
            <Link to="/services" key={idx}>
              <div className="p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#f9fafb] cursor-pointer text-center sm:text-left">
                <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">{service}</h3>
                <p className="text-gray-700">
                  {service === "Pain Management" && "Relieve discomfort and restore comfort quickly."}
                  {service === "Rehabilitation Therapy" && "Regain strength and mobility after injury or surgery."}
                  {service === "Sports Injury Care" && "Specialized care for athletes and active individuals."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-24 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 animate-fadeIn">
            <img
              src={heroImg}
              alt="Dr David Okinda"
              className="w-full max-w-[400px] sm:max-w-[500px] h-auto rounded-2xl drop-shadow-2xl mx-auto md:mx-0"
            />
          </div>
          <div className="flex-1 animate-fadeInUp text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="text-[#2EA3DD]">Me</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Over 10 years of experience in physiotherapy, helping patients recover from injuries, manage pain, and improve mobility. Personalized, evidence-based care.
            </p>
            <Link to="/about">
              <button className="px-6 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-all">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 sm:py-24 px-6 bg-white text-center">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#041E2A] mb-4">
            Get in <span className="text-[#2EA3DD]">Touch</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            Schedule an appointment or reach out for more information.
          </p>
          <Link to="/contact">
            <button className="px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-all">
              Contact Me
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            Patient <span className="text-[#2EA3DD]">Reviews</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl mx-auto">
            Hear what our patients have to say about our care.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            { name: "Odhiambo", review: "Amazing care and guidance. Recovered quickly from my injury!" },
            { name: "Kamau", review: "Professional and caring. I highly recommend Dr. Okinda." },
            { name: "Wanjiru", review: "The best physiotherapist I've visited. Excellent results." },
          ].map((t, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all text-center">
              <p className="text-gray-700 mb-4">"{t.review}"</p>
              <h4 className="font-bold text-[#041E2A]">{t.name}</h4>
              <p className="text-gray-500 text-sm">Patient</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#041E2A] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Dr. David Okinda. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <a href="#" className="hover:text-[#2EA3DD] transition-colors text-sm sm:text-base">
              LinkedIn
            </a>
            <a
              href="/login"
              className="text-xs sm:text-sm text-gray-400 hover:text-gray-200 underline"
              title="Doctor Login"
            >
              DOCTOR DAVID
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
