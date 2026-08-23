import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { howItWorksSteps } from "../content/siteContent";

const INTERVAL_MS = 1400;

export function HowItWorks() {
  const headRef = useRef(null);
  const sectionRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const sectionInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through steps while section is visible
  useEffect(() => {
    if (!sectionInView) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % howItWorksSteps.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [sectionInView]);

  return (
    <section id="about" className="bg-white py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>Simple Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0F172A] mb-4"
            style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}
          >
            How Nyaya Saathi Works
          </motion.h2>
        </div>

        {/* Desktop Steps */}
        <div ref={sectionRef} className="hidden lg:flex items-start gap-0 relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-[#E5E7EB] via-[#0F172A]/20 to-[#E5E7EB]" />
          {howItWorksSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex-1 flex flex-col items-center text-center px-4 relative cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <div className="relative mb-6 z-10">
                  <motion.div
                    animate={
                      isActive
                        ? { scale: 1.12, boxShadow: "0 10px 32px rgba(15,23,42,0.28)" }
                        : { scale: 1, boxShadow: "0 4px 14px rgba(15,23,42,0.08)" }
                    }
                    transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 20 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-[#0F172A] border-[#0F172A]"
                        : "bg-white border-[#E5E7EB]"
                    }`}
                  >
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${isActive ? "text-white" : "text-[#0F172A]"}`} />
                  </motion.div>

                  {/* Step number badge */}
                  <motion.div
                    animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 border-white transition-colors duration-300 ${
                      isActive ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#0F172A] border-[#E5E7EB]"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Pulse ring when active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.7 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-2xl bg-[#0F172A]/20 pointer-events-none"
                    />
                  )}
                </div>

                <h3
                  className="text-sm mb-2 transition-colors duration-300"
                  style={{ fontWeight: 700, color: isActive ? "#0F172A" : "#374151" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs mb-2 transition-colors duration-300"
                  style={{ lineHeight: 1.6, color: isActive ? "#4B5563" : "#9CA3AF" }}
                >
                  {step.description}
                </p>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "bg-[#0F172A]/5 text-[#0F172A] border-[#0F172A]/20"
                      : "text-[#9CA3AF] bg-[#F8FAFC] border-[#E5E7EB]"
                  }`}
                >
                  {step.detail}
                </span>

                {i < howItWorksSteps.length - 1 && (
                  <div className="absolute top-8 -right-4 z-20">
                    <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-[#0F172A]" : "text-[#D1D5DB]"}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Steps */}
        <div className="lg:hidden space-y-6">
          {howItWorksSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <div className="relative shrink-0">
                  <motion.div
                    animate={
                      isActive
                        ? { scale: 1.1, boxShadow: "0 8px 24px rgba(15,23,42,0.22)" }
                        : { scale: 1, boxShadow: "none" }
                    }
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-colors duration-300 ${
                      isActive ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#E5E7EB]"
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-white" : "text-[#0F172A]"}`} />
                  </motion.div>
                  <div
                    className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] flex items-center justify-center border-2 border-white transition-colors duration-300 ${
                      isActive ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#0F172A]"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3
                    className="mb-1 text-sm transition-colors duration-300"
                    style={{ fontWeight: 700, color: isActive ? "#0F172A" : "#374151" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] text-xs" style={{ lineHeight: 1.6 }}>{step.description}</p>
                  <span className="inline-block mt-1 text-[10px] text-[#9CA3AF] bg-[#F8FAFC] px-2 py-0.5 rounded-full border border-[#E5E7EB]">
                    {step.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {howItWorksSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 h-2 bg-[#0F172A]" : "w-2 h-2 bg-[#E5E7EB] hover:bg-[#9CA3AF]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
