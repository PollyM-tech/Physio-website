import React, { useState } from "react";
import profilePic from "../assets/profilepic.jpg";
import { Users, Clock, Star, HeartPulse } from "lucide-react";

const AboutPage = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative overflow-hidden font-sans">
      {/* Floating abstract shapes */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#2EA3DD]/20 rounded-full blur-3xl animate-floatSlow -z-10"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#FBBF24]/20 rounded-full blur-3xl animate-floatSlow2 -z-10"></div>
      <div className="absolute top-1/2 right-20 w-48 h-48 bg-[#06B6D4]/20 rounded-full blur-3xl animate-floatSlow3 -z-10"></div>

      {/* Hero / Intro */}
      <section className="bg-gradient-to-br from-[#f0f4f8] via-[#e0f7fa] to-[#fff7ed] py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2EA3DD] mb-4">
          Dr. David Okinda
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Dedicated to restoring your movement, confidence, and quality of life
          through personalized physiotherapy care, evidence-based methods, and
          compassionate treatment.
        </p>
      </section>

      {/* Profile & Stats */}
      <section className="relative py-24 px-6">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-start gap-12">
          {/* Left Panel */}
          <div className="relative flex-1 bg-white/80 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-2xl flex flex-col items-center gap-6 animate-fadeIn">
            <img
              src={profilePic}
              alt="Dr. David Okinda"
              className="rounded-[24px] object-cover shadow-2xl w-full max-w-[420px] md:max-w-[450px] h-auto animate-float"
            />

            {/* Stats Cards */}
            <div className="flex flex-col md:flex-row gap-6 mt-4 w-full justify-around text-center">
              <div className="p-4 bg-[#2EA3DD]/10 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <Users className="mx-auto mb-1 text-[#2EA3DD]" />
                <h4 className="text-2xl font-bold text-[#2EA3DD]">1500+</h4>
                <p className="text-sm text-gray-700">Patients Supported</p>
              </div>
              <div className="p-4 bg-[#06B6D4]/10 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <Clock className="mx-auto mb-1 text-[#06B6D4]" />
                <h4 className="text-2xl font-bold text-[#06B6D4]">10+</h4>
                <p className="text-sm text-gray-700">Years in Practice</p>
              </div>
              <div className="p-4 bg-[#FBBF24]/10 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <Star className="mx-auto mb-1 text-[#FBBF24]" />
                <h4 className="text-2xl font-bold text-[#FBBF24]">3</h4>
                <p className="text-sm text-gray-700">Core Specialties</p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col justify-center gap-4 animate-fadeInUp">
            <p className="text-xs tracking-[0.25em] text-[#062B3D] mb-2">
              ABOUT DR. DAVID OKINDA
            </p>

            <h3 className="text-3xl md:text-4xl font-bold text-[#2EA3DD] mb-4">
              Dedicated to restoring your movement, confidence, and quality of
              life
            </h3>

            <p className="text-base md:text-lg leading-relaxed mb-4">
              Dr. David Okinda is a licensed physiotherapist (DPT) with over 10
              years of experience helping patients recover from pain, injury,
              and reduced mobility. He combines hands-on treatment with
              education and tailored exercise programs so you understand your
              body and feel in control of your recovery.
            </p>

            <p className="text-base md:text-lg leading-relaxed mb-4">
              His goal is to provide personalized care that not only treats
              symptoms but addresses the root cause of pain and
              dysfunction—ensuring long-term recovery, improved mobility, and
              well-being.
            </p>

            <p className="italic text-gray-500 text-sm md:text-base mb-6">
              “A physiotherapist only needs his hands, brain, and heart to treat
              a person.”
            </p>

            {showMore && (
              <div className="text-sm md:text-base leading-relaxed mb-6 space-y-3">
                <p>
                  Every session begins with a careful interview and physical
                  assessment so we can understand your history, daily routine,
                  and what truly matters to you.
                </p>
                <p>
                  Treatment blends manual therapy, tailored exercise, and pain
                  education. You receive a practical home program—with clear
                  demonstrations.
                </p>
                <p>
                  My areas of focus include sports physiotherapy, spine care,
                  and rehabilitation after injury or surgery, delivered either
                  in the clinic or through house calls.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-colors"
            >
              {showMore ? "Show Less" : "Learn More"}
            </button>
          </div>
        </div>
      </section>

      {/* Core Specialties */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            Core <span className="text-[#2EA3DD]">Specialties</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Expert services to restore your mobility and improve your quality of
            life.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#FBBF24]/10 cursor-pointer">
            <HeartPulse className="mx-auto mb-2 text-[#FBBF24]" size={40} />
            <h3 className="text-2xl font-bold text-[#FBBF24] mb-2">
              Pain Management
            </h3>
            <p className="text-gray-700">
              Evidence-based techniques to relieve pain and restore comfort
              quickly.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#06B6D4]/10 cursor-pointer">
            <Star className="mx-auto mb-2 text-[#06B6D4]" size={40} />
            <h3 className="text-2xl font-bold text-[#06B6D4] mb-2">
              Rehabilitation Therapy
            </h3>
            <p className="text-gray-700">
              Customized rehab programs to regain strength and mobility after
              injury.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#2EA3DD]/10 cursor-pointer">
            <Users className="mx-auto mb-2 text-[#2EA3DD]" size={40} />
            <h3 className="text-2xl font-bold text-[#2EA3DD] mb-2">
              Sports Injury Care
            </h3>
            <p className="text-gray-700">
              Specialized therapy for athletes and active individuals to recover
              fast.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#eef2f6] via-white to-[#f8fafc]">
        <div className="max-w-7xl mx-auto text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A]">
            What <span className="text-[#2EA3DD]">Patients Say</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Hear from patients who regained their mobility and health.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">
              "Dr. Okinda helped me recover from my knee injury faster than I
              imagined. Highly recommended!"
            </p>
            <h4 className="font-bold text-[#041E2A]">Odhiambo</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">
              "Professional, caring, and effective physiotherapy. I feel
              stronger and healthier."
            </p>
            <h4 className="font-bold text-[#041E2A]">Kamau</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all">
            <p className="text-gray-700 mb-4">
              "The best physiotherapist I’ve visited. Personalized care and
              amazing results."
            </p>
            <h4 className="font-bold text-[#041E2A]">Wanjiru</h4>
            <p className="text-gray-500 text-sm">Patient</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#041E2A] mb-4">
          Schedule an <span className="text-[#2EA3DD]">Appointment</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Reach out today to start your recovery journey.
        </p>
        <a
          href="/contact"
          className="inline-block px-10 py-4 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-colors"
        >
          Contact Me
        </a>
      </section>
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
    </div>
  );
};

export default AboutPage;
