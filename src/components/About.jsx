import React, {useState} from 'react'
import profilePic from "../assets/profilepic.jpg";

const About = () => {
  const [showMore, setShowMore] = useState(false)
  return (
    <section className="bg-white text-black border-t border-x-white-200">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-start gap-12 py-12 px-6 md:px-10">
        <div className=" bg-[#fefeff] rounded-[32px] p-4 shadow-md">
          <img
            src={profilePic}
            alt="Dr. David Okinda"
            className="rounded-[24px] object-cover shadow-lg max-w-[420px] md:max-w-[450px] h-auto"
          />
          <div className="py-4">
            <h4 className="text-2xl font-bold text-[#155d94]">1500+</h4>
            <p className="text-sm text-white-600">Patients Supported</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#155d94]">10+</h4>
            <p className="text-sm text-white-600">Years in Practice</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-[#155d94]">3</h4>
            <p className="text-sm text-white-600">Core Specialties</p>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-xs tracking-[0.25em] text-[#062B3D] mb-2">
            ABOUT DR. DAVID OKINDA
          </p>

          <h3 className="text-2xl font-semibold text-[#2EA3DD] mb-3">
            Dedicated to restoring your movement, confidence, and quality of
            life
          </h3>

          <p className="text-[#062B3D] text-base md:text-lg leading-relaxed mb-4">
            Dr. David Okinda, is a licensed physiotherapist (DPT) with over 10
            years of experience helping patients recover from pain, injury and
            reduced mobility. He combines hands-on treatment with education and
            tailored exercise programs so you understand your body and feel in
            control of your recovery. He works at Kenyatta National Hospital
            (Physiotherapy Department) and Tender Touch Clinic at KMA Centre,
            Upperhill, Nairobi.He provides professional house calls so patients
            can receive care fromthe comfort of their homes.
          </p>
          <p className="text-[#062B3D] text-base md:text-lg leading-relaxed mb-4">
            My goal is to provide personalized care that not only treats
            symptoms but addresses the root cause of pain and
            dysfunction—ensuring long-term recovery, improved mobility, and
            well-being.
          </p>
          <p className="italic text-gray-500 text-sm md:text-base mb-6">
            “A physiotherapist only needs his hands, brain, and heart to treat a
            person.”
          </p>

          {showMore && (
            <div className="text-sm md:text-base leading-relaxed mb-6 space-y-3 text-[#062B3D]">
              <p>
                Every session begins with a careful interview and physical
                assessment so we can understand your history, daily routine, and
                what truly matters to you. Together we identify potential
                contributing factors and rule out any red flags.
              </p>
              <p>
                Treatment blends manual therapy, tailored exercise, and pain
                education. You receive a practical home program—with clear
                demonstrations—that fits your schedule so you stay active and
                involved between visits. The idea is for you to be as autonomous
                and co-responsible as possible in your recovery.
              </p>
              <p>
                My areas of focus include sports physiotherapy, spine care, and
                rehabilitation after injury or surgery, delivered either in the
                clinic or through flexible house calls.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="px-8 py-3 rounded-full bg-[#2EA3DD] text-white font-semibold hover:bg-[#0a4466] transition-colors"
          >
            {showMore ? "Show Less" : "Learn More"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default About
