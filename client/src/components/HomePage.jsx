import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/profileimage2dp.png";
import AboutPic from "../assets/profileimg (3).jpeg";
import { ReactTyped } from "react-typed";

const Homepage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f8fafc] via-white to-[#eef3f8] py-16 sm:py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10">
          {/* Text Content */}
          <div className="flex-1 animate-fadeInUp text-center md:text-left">
            {/* Push left column down on desktop to match reference */}
            <div className="hidden md:block h-16 lg:h-24" />

            {/* Eyebrow */}
            <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-gray-500 mb-4">
              <ReactTyped
                strings={["Physiotherapy solutions for better movement"]}
                typeSpeed={120}
                backSpeed={40}
                loop
                showCursor={false}
              />
            </p>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.07] text-slate-800 mb-6">
              Discover <span className="text-[#2EA3DD]">Effective</span> <br />
              Physical therapy Solutions for <br />
              Optimal Health and Mobility
            </h1>

            {/* Supporting line */}
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
              Evidence-based physiotherapy care focused on restoring movement,
              relieving pain, and improving long-term physical performance.
            </p>

            {/* CTA buttons (WORKING via Links) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2EA3DD] text-white rounded-full font-semibold hover:bg-[#1b8fc7] transition"
              >
                Request an Appointment
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Read More
              </Link>
            </div>

            {/* Name as a subtle signature */}
            <p className="mt-6 text-sm text-gray-500">
              Dr.{" "}
              <span className="text-[#2EA3DD] font-semibold">David Okinda</span>{" "}
              — Sports & Physical Therapy Specialist
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center md:justify-start md:-mt-16 lg:-mt-24">
            <img
              src={heroImg}
              alt="Dr David Okinda"
              className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] h-auto rounded-2xl drop-shadow-2xl animate-float md:-translate-x-4"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            My <span className="text-[#2EA3DD]">Services</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl mx-auto">
            Expert physiotherapy services designed to restore mobility, relieve
            pain, and help you perform at your best.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            {
              title: "Pain Management",
              desc: "Relieve discomfort and restore comfort quickly.",
            },
            {
              title: "Rehabilitation Therapy",
              desc: "Regain strength and mobility after injury or surgery.",
            },
            {
              title: "Sports Injury Care",
              desc: "Specialized care for athletes and active individuals.",
            },
          ].map((service, idx) => (
            <Link to="/services" key={idx}>
              <div className="p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#f9fafb] cursor-pointer text-center sm:text-left">
                <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 animate-fadeIn">
            <img
              src={AboutPic}
              alt="Dr David Okinda"
              className="w-full max-w-[400px] sm:max-w-[500px] h-auto rounded-2xl drop-shadow-2xl mx-auto md:mx-0"
            />
          </div>

          <div className="flex-1 animate-fadeInUp text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="text-[#2EA3DD]">Dr. David Okinda</span>
            </h2>

            <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
              Dedicated to restoring movement, performance, and quality of life.
            </p>

            <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
              Dr. David Okinda is a licensed physiotherapist (DPT) and sports
              physiotherapy specialist with over 10 years of experience helping
              patients and athletes recover from pain, injuries, and mobility
              challenges. He combines hands-on treatment, education, and
              personalized exercise programs so you understand your body and
              feel in control of your recovery.
            </p>

            <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
              His mission is to provide tailored care that goes beyond symptom
              relief, addressing the root causes of pain and dysfunction.
              Whether you’re recovering from a sports injury, surgery, or
              chronic pain, Dr. Okinda helps you regain strength, prevent
              injuries, and return to peak performance.
            </p>

            <p className="italic text-gray-500 text-sm sm:text-base mb-6">
              “A physiotherapist only needs his hands, brain, and heart to treat
              a person.”
            </p>

            <Link to="/about">
              <button className="px-6 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-all">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 sm:py-20 px-6 bg-white text-center">
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

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
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
            {
              name: "Odhiambo",
              review:
                "Amazing care and guidance. Recovered quickly from my injury!",
            },
            {
              name: "Kamau",
              review: "Professional and caring. I highly recommend Dr. Okinda.",
            },
            {
              name: "Wanjiru",
              review:
                "The best physiotherapist I've visited. Excellent results.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all text-center"
            >
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
            &copy; {new Date().getFullYear()} Dr. David Okinda. All rights
            reserved.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <a
              href="#"
              className="hover:text-[#2EA3DD] transition-colors text-sm sm:text-base"
            >
              LinkedIn
            </a>

            <a
              href="/login"
              className="text-xs sm:text-sm text-gray-300 hover:text-gray-100 underline"
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
