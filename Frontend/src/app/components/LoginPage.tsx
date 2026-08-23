import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Scale, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { apiFetch, setToken, setUser } from "../../lib/api";
import { appName, authCopy, authUrls } from "../content/siteContent";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setToken(data.token);
      setUser({ name: data.user.name, email: data.user.email });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = authUrls.google;
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
          <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#ffffff", letterSpacing: "-0.02em" }}>
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
          {/* Card */}
          <div
            className="bg-white rounded-2xl border border-[#E5E7EB] p-8"
            style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.1), 0 1px 4px rgba(15,23,42,0.05)" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.625rem", letterSpacing: "-0.02em" }}>
                {authCopy.login.headline}
              </h1>
              <p className="text-[#6B7280] text-sm">{authCopy.login.subheadline}</p>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-[#E5E7EB] rounded-xl py-3 mb-6 hover:bg-[#F8FAFC] transition-colors"
              style={{ fontWeight: 500, fontSize: "0.9375rem" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {authCopy.login.googleButton}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF]" style={{ fontWeight: 500 }}>{authCopy.login.divider}</span>
              <div className="flex-1 h-px bg-[#E5E7EB]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#374151]" style={{ fontWeight: 600 }}>
                    Password
                  </label>
                  <button type="button" className="text-xs text-[#0F172A] hover:underline" style={{ fontWeight: 500 }}>
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
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 text-center bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white rounded-xl py-3 hover:bg-[#1E3A5F] transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontWeight: 600, fontSize: "0.9375rem" }}
              >
                {loading ? authCopy.login.submitLoading : authCopy.login.submit}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#6B7280] mt-6">
              {authCopy.login.footerPrompt}{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#0F172A] hover:underline"
                style={{ fontWeight: 600 }}
              >
                {authCopy.login.footerAction}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
