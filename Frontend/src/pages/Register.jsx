import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserPlus,
  FiAlertCircle,
} from "react-icons/fi";

import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FiUserPlus className="text-white text-2xl" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Register to start analyzing resumes with AI.
          </p>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
          {error && (
            <div className="mb-5 flex gap-3 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
              <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <FiUser
                  size={18}
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 pl-14 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dwipraj Dey"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 pl-14 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                Password
              </label>

              <div className="relative">
                <FiLock size={18}
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 pl-14 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;