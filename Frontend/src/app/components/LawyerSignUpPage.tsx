import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Scale, Eye, EyeOff, ArrowLeft, Briefcase } from "lucide-react";
import { apiFetch, setLawyer, setToken } from "../../lib/api";
import { appName, authCopy } from "../content/siteContent";

const practiceAreas = [
  "Criminal Law", "Civil Law", "Family / Matrimonial", "Property / Real Estate",
  "Consumer Law", "Labour / Employment", "Constitutional / PIL", "Cyber Crime",
  "Tax Law", "Intellectual Property", "Other",
];

export function LawyerSignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    barCouncilId: "",
    practiceArea: "",
    experience: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/auth/signup-lawyer", {
        method: "POST",
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          BarCouncilEnrollment: form.barCouncilId,
          primaryPracticeArea: form.practiceArea,
          yearsOfExperience: Number(form.experience),
        }),
      });
      setToken(data.token);
      setLawyer(data.user);
      navigate("/dashboard-lawyer");
    } catch (err: any) {
      setError(err.message ?? "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0F172A] px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer">
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
          className="w-full max-w-lg"
        >
          <div
            className="bg-white rounded-2xl border border-[#E5E7EB] p-8"
            style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.1), 0 1px 4px rgba(15,23,42,0.05)" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-3">
                <Briefcase className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-blue-600" style={{ fontWeight: 600 }}>Lawyer Portal</span>
              </div>
              <h1 className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "1.625rem", letterSpacing: "-0.02em" }}>
                {authCopy.lawyerSignup.headline}
              </h1>
              <p className="text-[#6B7280] text-sm">{authCopy.lawyerSignup.subheadline}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Adv. Priya Sharma"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="adv.priya@example.com"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                </div>

                {/* Bar Council ID */}
                <div>
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Bar Council Enrollment No.</label>
                  <input
                    type="text"
                    name="barCouncilId"
                    value={form.barCouncilId}
                    onChange={handleChange}
                    placeholder="e.g. D/123/2010"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 8"
                    min="0"
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  />
                </div>

                {/* Primary Practice Area */}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Primary Practice Area</label>
                  <select
                    name="practiceArea"
                    value={form.practiceArea}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all bg-white"
                  >
                    <option value="" disabled>Select practice area...</option>
                    {practiceAreas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#374151] mb-1.5" style={{ fontWeight: 600 }}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
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
                  <p className="text-[10px] text-[#9CA3AF] mt-1.5">Minimum 8 characters recommended</p>
                </div>
              </div>

              {/* Info note */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs text-blue-700" style={{ lineHeight: 1.6 }}>
                  Your Bar Council enrollment number will be verified before your profile goes live. This typically takes 1–2 business days.
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs text-[#9CA3AF]" style={{ lineHeight: 1.6 }}>
                By registering you agree to our{" "}
                <button type="button" className="text-[#0F172A] hover:underline" style={{ fontWeight: 500 }}>Terms of Service</button>
                {" "}and{" "}
                <button type="button" className="text-[#0F172A] hover:underline" style={{ fontWeight: 500 }}>Lawyer Code of Conduct</button>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F172A] text-white rounded-xl py-3 hover:bg-[#1E3A5F] transition-colors"
                style={{ fontWeight: 600, fontSize: "0.9375rem" }}
              >
                {loading ? "Creating account..." : authCopy.lawyerSignup.submit}
              </button>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            </form>

            {/* Links */}
            <div className="mt-5 pt-5 border-t border-[#F1F5F9] text-center space-y-2">
              <p className="text-sm text-[#6B7280]">
                {authCopy.lawyerSignup.footerPromptOne}{" "}
                <button onClick={() => navigate("/login-lawyer")} className="text-[#0F172A] hover:underline" style={{ fontWeight: 600 }}>
                  {authCopy.lawyerSignup.footerActionOne}
                </button>
              </p>
              <p className="text-sm text-[#6B7280]">
                {authCopy.lawyerSignup.footerPromptTwo}{" "}
                <button onClick={() => navigate("/signup")} className="text-[#0F172A] hover:underline" style={{ fontWeight: 600 }}>
                  {authCopy.lawyerSignup.footerActionTwo}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
