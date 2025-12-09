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
];

const Services = () => {
  return (
    <>
      {/* MAIN SERVICES SECTION (unchanged) */}
      <section className="bg-gradient-to-b from-[#E0F2FF] via-[#F5F5F5] to-[#FFEFE5] py-20 md:py-28">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          {/* Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[0.1em] text-[#4A90E2]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PHYSIOTHERAPY SERVICES
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Helping you move better, feel stronger, and live pain-free.
            </motion.p>
          </motion.div>

          {/* Featured Spine Image */}
          <motion.div
            className="relative mb-16 md:mb-24 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={spineImage}
              alt="Spine and posture care"
              className="w-full h-[450px] md:h-[500px] object-cover"
            />
            <div className="absolute top-6 left-6 md:top-12 md:left-12 bg-white bg-opacity-90 p-6 md:p-8 rounded-2xl shadow-lg max-w-sm">
              <p className="text-xs tracking-[0.25em] text-[#4A90E2] mb-2 font-semibold">
                SPINE & BACK CARE
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#062B3D]">
                Expert care for spine, posture, and chronic back pain.
              </h2>
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[260px] md:h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4 md:p-6 bg-white">
                  <h4 className="text-[#062B3D] font-semibold text-base md:text-lg text-center">
                    {service.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER – now identical to AboutPage and full-width */}
      <footer className="py-6 bg-[#041E2A] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>
            &copy; {new Date().getFullYear()} Dr. David Okindo. All rights
            reserved.
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-[#2EA3DD] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Services;
