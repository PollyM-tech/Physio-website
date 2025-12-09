import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import toast from "react-hot-toast";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("doctor_auth") === "true") {
      navigate("/doctor/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      };

      const res = await fetch(`${API_BASE_URL}/api/doctor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      // Clear previous session & store new info
      localStorage.setItem("doctor_token", data.access_token);
      localStorage.setItem("doctor_info", JSON.stringify(data.doctor));
      localStorage.setItem("doctor_auth", "true");

      toast.success("Login successful");
      navigate("/doctor/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#2EA3DD] text-center mb-6">
          Doctor Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 p-2 sm:p-3 rounded-lg text-sm sm:text-base mb-4 text-center">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="doctor@example.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-semibold transition-all ${
              loading ? "bg-[#8cc9e6] cursor-not-allowed" : "bg-[#2EA3DD] hover:bg-[#0f5e93]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-gray-400 mt-4 text-center">
          For authorized staff only
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
