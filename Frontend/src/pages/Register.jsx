import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus, FiAlertCircle } from "react-icons/fi";

import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(formData);
      login(result.user, result.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-sm border border-[#262B30] bg-[#1C2024] py-3.5 pl-11 pr-4 text-[#E8E6E1] placeholder:text-[#4A5158] outline-none focus:border-[#FF8A3D]/60 transition-colors";

  return (
    <div className="min-h-screen bg-[#0A0C0E] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="mb-5 w-11 h-11 rounded-sm bg-[#14171A] border border-[#262B30] flex items-center justify-center">
            <FiUserPlus className="text-[#FF8A3D] text-lg" />
          </div>

          <h1 className="text-2xl text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 700 }}>
            Create account
          </h1>

          <p className="mt-2 text-[#7A828A] text-sm">
            Register to start analyzing resumes with AI.
          </p>
        </div>

        <div className="rounded-md bg-[#14171A] border border-[#262B30] p-8">
          {error && (
            <div className="mb-5 flex gap-3 rounded-sm border border-[#FF5D5D]/40 bg-[#1C2024] p-4">
              <FiAlertCircle className="text-[#FF5D5D] text-lg shrink-0 mt-0.5" />
              <p className="text-sm text-[#E8E6E1]">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-[#7A828A] mb-2" style={{ fontFamily: monoFont }}>
                full_name
              </label>
              <div className="relative">
                <FiUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5158]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Dwipraj Dey"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#7A828A] mb-2" style={{ fontFamily: monoFont }}>
                email_address
              </label>
              <div className="relative">
                <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5158]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#7A828A] mb-2" style={{ fontFamily: monoFont }}>
                password
              </label>
              <div className="relative">
                <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5158]" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-[#FF8A3D] px-6 py-3.5 text-[#0A0C0E] text-base hover:bg-[#FFA05E] transition-colors disabled:bg-[#262B30] disabled:text-[#4A5158] disabled:cursor-not-allowed"
              style={{ fontFamily: headFont, fontWeight: 600 }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#7A828A]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF8A3D] hover:text-[#FFA05E] transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;