import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Scale, Eye, EyeOff, ArrowLeft, Briefcase } from "lucide-react";
import { apiFetch, setLawyer, setToken } from "../../lib/api";
import { appName, authCopy } from "../content/siteContent";

export function LawyerLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/auth/login-lawyer", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setToken(data.token);
      setLawyer(data.user);
      navigate("/dashboard-lawyer");
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0F172A] px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {appName}
          </span>
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          style={{ fontWeight: 500 }}
        >
          <ArrowLeft className="w-4 h-4" />
          {authCopy.backButton}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div
            className="bg-white rounded-2xl border border-[#E5E7EB] p-8"
            style={{
              boxShadow:
                "0 8px 32px rgba(15,23,42,0.1), 0 1px 4px rgba(15,23,42,0.05)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-3">
                <Briefcase className="w-3 h-3 text-blue-600" />
                <span
                  className="text-xs text-blue-600"
                  style={{ fontWeight: 600 }}
                >
                  Lawyer Portal
                </span>
              </div>
              <h1
                className="text-[#0F172A] mb-1"
                style={{
                  fontWeight: 800,
                  fontSize: "1.625rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {authCopy.lawyerLogin.headline}
              </h1>
              <p className="text-[#6B7280] text-sm">
                {authCopy.lawyerLogin.subheadline}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  className="block text-xs text-[#374151] mb-1.5"
                  style={{ fontWeight: 600 }}
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="test@example.com"
                  required
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="text-xs text-[#374151]"
                    style={{ fontWeight: 600 }}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-[#0F172A] hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 pr-11 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white rounded-xl py-3 hover:bg-[#1E3A5F] transition-colors mt-2"
                style={{ fontWeight: 600, fontSize: "0.9375rem" }}
              >
                {loading ? "Signing in..." : authCopy.lawyerLogin.submit}
              </button>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            </form>

            {/* Switch to user login */}
            <div className="mt-5 pt-5 border-t border-[#F1F5F9] text-center space-y-2">
              <p className="text-sm text-[#6B7280]">
                {authCopy.lawyerLogin.footerPromptOne}{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#0F172A] hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  {authCopy.lawyerLogin.footerActionOne}
                </button>
              </p>
              <p className="text-sm text-[#6B7280]">
                {authCopy.lawyerLogin.footerPromptTwo}{" "}
                <button
                  onClick={() => navigate("/signup-lawyer")}
                  className="text-[#0F172A] hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  {authCopy.lawyerLogin.footerActionTwo}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
