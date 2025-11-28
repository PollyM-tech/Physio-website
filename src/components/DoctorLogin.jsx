import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Dummy login check for now
    setTimeout(() => {
      if (
        credentials.email === "doctor@example.com" &&
        credentials.password === "password"
      ) {
        // Redirect to doctor dashboard
        navigate("/doctor/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeIn">
        
        <h2 className="text-3xl font-bold text-[#2EA3DD] text-center mb-6">
          Doctor Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              placeholder="doctor@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-full text-white font-semibold transition-all ${
              loading
                ? "bg-[#8cc9e6] cursor-not-allowed"
                : "bg-[#2EA3DD] hover:bg-[#0f5e93]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          For authorized staff only
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
