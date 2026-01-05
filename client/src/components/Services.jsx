import React from "react";
import { motion } from "framer-motion";
import spineImage from "../assets/spinetreatment.jpg";
import backPain from "../assets/backpain.png";
import neckPain from "../assets/neckpain.jpg";
import kneePain from "../assets/kneepain.jpg";
import sciaticPain from "../assets/sciaticanerverpain.jpg";
import heelPain from "../assets/Heelpain.png";
import joints from "../assets/joints.png";
import footMuscle from "../assets/footmuscle.png";
import handInjury from "../assets/hand injury.png";
import discBulge from "../assets/discbulge.png";
import StrainedHamstring from "../assets/strained hamstring.jpeg";
import SportPhysio from "../assets/sport-physio.jpeg"
import KneeTendon from "../assets/knee-tendon.jpeg"

const SERVICES_DATA = [
  { id: 1, title: "Lower Back Pain Relief", image: backPain },
  { id: 2, title: "Neck & Shoulder Pain", image: neckPain },
  { id: 3, title: "Knee Pain & Joint Rehab", image: kneePain },
  { id: 4, title: "Sciatica & Nerve Pain", image: sciaticPain },
  { id: 5, title: "Heel Pain & Foot Therapy", image: heelPain },
  { id: 6, title: "Joint Mobility & Arthritis Care", image: joints },
  { id: 7, title: "Foot Muscle Strengthening", image: footMuscle },
  { id: 8, title: "Hand Injury Recovery", image: handInjury },
  { id: 9, title: "Disc Bulge Treatment", image: discBulge },
  { id: 10, title: "Knee & Tendon Pain", image: KneeTendon },
  { id: 11, title: "Strained Hamstring", image: StrainedHamstring },
  { id: 12, title: "Sports Physiotherapy", image: SportPhysio },
];

const Services = () => {
  return (
    <>
      {/* MAIN SERVICES SECTION */}
      <section className="bg-gradient-to-b from-[#E0F2FF] via-[#F5F5F5] to-[#FFEFE5] py-16 sm:py-20 md:py-28">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Heading + Tagline */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#4A90E2]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PHYSIOTHERAPY SERVICES
            </motion.h1>
            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Physiotherapy Services for Sports & Everyday Movement — Helping you recover from injuries, prevent pain, and stay active. Move better, feel stronger, and live pain-free.
            </motion.p>
          </motion.div>

          {/* Featured Spine Image */}
          <motion.div
            className="relative mb-12 sm:mb-16 md:mb-24 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={spineImage}
              alt="Spine and posture care"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12 bg-white bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg max-w-full sm:max-w-xs">
              <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#4A90E2] mb-1 sm:mb-2 font-semibold">
                SPINE & BACK CARE
              </p>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-[#062B3D]">
                Expert care for spine, posture, and chronic back pain.
              </h2>
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-3 sm:p-4 md:p-6 bg-white">
                  <h4 className="text-[#062B3D] font-semibold text-sm sm:text-base md:text-lg text-center">
                    {service.title}
                  </h4>
                </div>
              </motion.div>
            ))}
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

export default Services;
