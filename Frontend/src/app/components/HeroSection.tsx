import heroImage from "../../imports/ChatGPT_Image_May_29__2026__10_38_41_AM.png";
import { motion } from "motion/react";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { heroCopy } from "../content/siteContent";

function HeroImage() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/5 to-[#1E3A5F]/10 rounded-3xl blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.08)" }}
      >
        <img
          src={heroImage}
          alt={heroCopy.imageAlt}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#0F172A]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#1E3A5F]/4 rounded-full blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F172A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0F172A] mb-6"
              style={{ fontWeight: 800, fontSize: "3.25rem", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              {heroCopy.titleStart}{" "}
              <span className="relative">
                <span className="text-[#1E3A5F]">{heroCopy.titleEmphasis}</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 C50 2, 150 2, 198 6" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {heroCopy.titleEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#374151] mb-8 max-w-lg"
              style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            >
              {heroCopy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3.5 rounded-xl hover:bg-[#1E3A5F] transition-all duration-200 shadow-md hover:shadow-lg group">
                <span style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{heroCopy.primaryAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 bg-white text-[#0F172A] px-6 py-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#0F172A]/30 hover:bg-[#F8FAFC] transition-all duration-200 group">
                <span style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{heroCopy.secondaryAction}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {heroCopy.highlights.map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A]" />
                  <span className="text-sm text-[#374151]" style={{ fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Hero Image */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
