import React from "react";
import heroImg from "../assets/physio.png";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className=" bg-[#062B3D] text-white">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-3 md:gap-6 min-h-[600px] px-10">
        {/* left column */}
        <div className="flex-1 flex pt-6 md:pt-24">
          <div className="max-w-[650px]">
            <p className="text-base font-light tracking-widest text-[#2EA3DD] mb-1">
              Hello my name is Dr. David Okinda. I deal with
            </p>

            <ReactTyped
              className="text-base font-light tracking-widest text-[#2EA3DD]"
              strings={[
                "Physiotherapy expert assessment and advice",
                "Professional physiotherapy care and guidance",
              ]}
              typeSpeed={120}
              backSpeed={0}
              loop
              showCursor={false}
            />

            <h1 className="mt-4 text-4xl font-bold leading-tight">
              To help with <br /> pain management, disability <br />
              and injury to your joints, <br /> muscles and spine
            </h1>

            <div className="mt-10 text-sm flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link to="/contact">
                <button className="px-6 py-2 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0f5e93] transition-colors">
                  Request an Appointment
                </button>
              </Link>
              <Link to="/about">
                <button className="px-6 py-2 rounded-full border border-white text-white font-semibold bg-transparent hover:bg-white hover:text-[#062B3D] transition-colors">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* right column */}
        <div className="flex-1 flex justify-center md:justify-start items-center md:items-start py-4 md:py-0">
          <img
            src={heroImg}
            alt="Dr David Okinda"
            className="
            w-auto
            h-auto
            object-contain
            md:-ml-20
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
