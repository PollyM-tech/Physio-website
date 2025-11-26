import React from "react";
import spineImage from "../assets/spinevideo.png";
import backPains from "../assets/backpains.jpg";
import neckPain from "../assets/neckpain.jpg";
import kneePain from "../assets/kneepain.jpg";
import sciaticPain from "../assets/sciaticanerverpain.jpg";
import massage from "../assets/blackbackmassage.jpg";
import sportsInjury from "../assets/3ac1eac3b3572bf2702902b9db3c07b7.jpg";
import physioGeneral from "../assets/physio.png";
import profilePic from "../assets/profilepic.jpg";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Lower Back Pain Relief",
    image: backPains,
  },
  {
    id: 2,
    title: "Neck & Shoulder Pain",
    image: neckPain,
  },
  {
    id: 3,
    title: "Knee Pain & Joint Rehab",
    image: kneePain,
  },
  {
    id: 4,
    title: "Sciatica & Nerve Pain",
    image: sciaticPain,
  },
  {
    id: 5,
    title: "Manual Therapy & Massage",
    image: massage,
  },
  {
    id: 6,
    title: "Sports Injury Rehabilitation",
    image: sportsInjury,
  },
  {
    id: 7,
    title: "Comprehensive Physiotherapy Assessment",
    image: physioGeneral,
  },
  {
    id: 8,
    title: "One-on-One Consultations",
    image: profilePic,
  },
];

const Services = () => {
  return (
    <section className="bg-gradient-to-b from-[#062B3D] to-white py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[0.15em] text-[#2EA3DD] ">
            PHYSIOTHERAPY SERVICES
          </h1>
          <p className="mt-2 text-sm md:text-base text-white">
            Helping you move better, feel stronger, and live pain-free.
          </p>
        </div>

        {/* Featured spine card at the top */}
        <div className="mt-10 grid md:grid-cols-1 gap-6 items-center bg-white/90 rounded-3xl shadow-xl overflow-hidden">
          <div>
            <img
              src={spineImage}
              alt="Spine and posture care"
              className="w-full h-[420px] md:h-[460px] object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-[0.25em] text-[#155d94] mb-2">
              SPINE & BACK CARE
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#062B3D] mb-3">
              Expert care for spine, posture, and chronic back pain.
            </h2>
          </div>
        </div>

        {/* Grid of service cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="
                bg-white rounded-2xl overflow-hidden shadow-md
                transform transition duration-500
                hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]
              "
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[180px] md:h-[220px] object-cover"
              />
              <div className="p-3 md:p-4">
                <h4 className="text-xs md:text-sm font-semibold text-[#062B3D]">
                  {service.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Services;
