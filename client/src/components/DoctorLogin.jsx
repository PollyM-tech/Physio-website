import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import toast from "react-hot-toast";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  const [flow, setFlow] = useState("signIn"); // "signIn" | "signUp"
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate("/doctor/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn("password", {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
        flow,
      });
      toast.success(flow === "signIn" ? "Login successful" : "Account created");
      navigate("/doctor/dashboard");
    } catch (err) {
      console.error(err);
      const msg =
        flow === "signIn"
          ? "Invalid email or password."
          : "Could not create account. Try a stronger password (min 8 chars).";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200 animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2EA3DD] text-center mb-6">
          {flow === "signIn" ? "Doctor Login" : "Create Doctor Account"}
        </h2>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 p-2 sm:p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
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
              placeholder="doctor@example.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2EA3DD]"
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
              placeholder="••••••••"
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
            {loading
              ? flow === "signIn"
                ? "Logging in..."
                : "Creating account..."
              : flow === "signIn"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* Toggle between signIn / signUp */}
        <p className="text-xs text-gray-400 mt-5 text-center">
          {flow === "signIn" ? (
            <>
              First time?{" "}
              <button
                onClick={() => { setFlow("signUp"); setError(""); }}
                className="text-[#2EA3DD] underline"
              >
                Create doctor account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setFlow("signIn"); setError(""); }}
                className="text-[#2EA3DD] underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-2 text-center">For authorized staff only</p>
      </div>
    </div>
  );
};

export default DoctorLogin;
