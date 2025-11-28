import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/physio.png";

const Homepage = () => {
  return (
    <div className="font-sans">

      {/* Hero Summary / Welcome */}
      <section className="relative bg-gradient-to-br from-[#f8fafc] via-white to-[#eef3f8] py-24 px-6 text-[#041E2A]">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          
          {/* Left column */}
          <div className="flex-1 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Welcome to <span className="text-[#2EA3DD]">Dr. David Okinda Physiotherapy</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Personalized physiotherapy care for pain management, injury recovery, and improved mobility. Evidence-based and compassionate treatment to help you regain your best self.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Right column - Doctor image */}
          <div className="flex-1 flex justify-center md:justify-end animate-fadeIn">
            <img
              src={heroImg}
              alt="Dr David Okinda"
              className="w-full max-w-[500px] h-auto rounded-2xl drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            Our <span className="text-[#2EA3DD]">Services</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Quick overview of physiotherapy services we provide.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <Link to="/services">
            <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#f9fafb] cursor-pointer">
              <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">Pain Management</h3>
              <p className="text-gray-700">Relieve discomfort and restore comfort quickly.</p>
            </div>
          </Link>
          <Link to="/services">
            <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#f9fafb] cursor-pointer">
              <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">Rehabilitation Therapy</h3>
              <p className="text-gray-700">Regain strength and mobility after injury or surgery.</p>
            </div>
          </Link>
          <Link to="/services">
            <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#f9fafb] cursor-pointer">
              <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">Sports Injury Care</h3>
              <p className="text-gray-700">Specialized care for athletes and active individuals.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 animate-fadeIn">
            <img
              src={heroImg}
              alt="Dr David Okinda"
              className="w-full max-w-[500px] h-auto rounded-2xl drop-shadow-2xl"
            />
          </div>
          <div className="flex-1 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="text-[#2EA3DD]">Me</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
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

      {/* Contact Summary */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A] mb-4">
            Get in <span className="text-[#2EA3DD]">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Schedule an appointment or reach out for more information.
          </p>
          <Link to="/contact">
            <button className="px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-all">
              Contact Me
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials Summary */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            Patient <span className="text-[#2EA3DD]">Reviews</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Hear what our patients have to say about our care.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">"Amazing care and guidance. Recovered quickly from my injury!"</p>
            <h4 className="font-bold text-[#041E2A]">Jane Doe</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">"Professional and caring. I highly recommend Dr. Okinda."</p>
            <h4 className="font-bold text-[#041E2A]">John Smith</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">"The best physiotherapist I've visited. Excellent results."</p>
            <h4 className="font-bold text-[#041E2A]">Emily Johnson</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#041E2A] text-white">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    <p>&copy; {new Date().getFullYear()} Dr. David Okinda Physiotherapy. All rights reserved.</p>
    <div className="flex gap-4 items-center">
      <a href="#" className="hover:text-[#2EA3DD] transition-colors">Facebook</a>
      <a href="#" className="hover:text-[#2EA3DD] transition-colors">Instagram</a>
      <a href="#" className="hover:text-[#2EA3DD] transition-colors">LinkedIn</a>

      {/* Discreet Doctor Login */}
      <a
        href="/login"
        className="ml-6 text-xs text-gray-400 hover:text-gray-200 underline"
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
