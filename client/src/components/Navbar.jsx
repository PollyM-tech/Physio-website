import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  return (
    <nav className="bg-[#062B3D] text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#155d94] cursor-pointer">
            Dr. David
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link className="hover:text-[#2EA3DD]" to="/">Home</Link>
          <Link className="hover:text-[#2EA3DD]" to="/about">About</Link>
          <Link className="hover:text-[#2EA3DD]" to="/services">Services</Link>
          <Link className="hover:text-[#2EA3DD]" to="/contact">Contact</Link>
          <Link to="/contact">
            <button className="bg-[#2EA3DD] hover:bg-[#28a0d9] text-white px-5 py-2 rounded-full font-medium transition">
              Book Appointment
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden cursor-pointer" onClick={handleNav}>
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-3/4 max-w-xs h-full bg-[#062B3D] shadow-lg transform ${
        nav ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-[#137bc0]">Dr. David</h1>
            <AiOutlineClose size={25} className="cursor-pointer" onClick={handleNav} />
          </div>
          <ul className="flex flex-col mt-4 space-y-4 px-6 text-lg">
            <li onClick={handleNav}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={handleNav}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={handleNav}>
              <Link to="/services">Services</Link>
            </li>
            <li onClick={handleNav}>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/contact">
                <button className="w-full bg-[#2EA3DD] hover:bg-[#28a0d9] text-white px-5 py-2 rounded-full font-medium transition">
                  Book Appointment
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {nav && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={handleNav}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
