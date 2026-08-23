import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Scale, CheckCircle2, ArrowRight } from "lucide-react";
import { aboutValues, appName } from "../content/siteContent";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="bg-white py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-4"
            >
              <Scale className="w-3.5 h-3.5 text-[#0F172A]" />
              <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>About {appName}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0F172A] mb-6"
              style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.02em" }}
            >
              Making Justice Accessible Through AI
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#6B7280] mb-8"
              style={{ fontSize: "1.0625rem", lineHeight: 1.8 }}
            >
              {appName} simplifies legal information and makes justice accessible for every Indian citizen — regardless of education, income, or language.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {aboutValues.map(({ icon: Icon, title, description }, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-[#E5E7EB]" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.04)" }}>
                  <div className="w-8 h-8 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-[#0F172A]" />
                  </div>
                  <p className="text-[#0F172A] text-sm mb-1" style={{ fontWeight: 700 }}>{title}</p>
                  <p className="text-[#6B7280] text-xs" style={{ lineHeight: 1.5 }}>{description}</p>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-[#0F172A] text-sm group"
              style={{ fontWeight: 600 }}
            >
              Learn more about our mission
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract Legal Illustration */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#E5E7EB] relative overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.09), 0 1px 4px rgba(15,23,42,0.05)" }}>
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F172A]/3 rounded-full translate-x-8 -translate-y-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1E3A5F]/5 rounded-full -translate-x-6 translate-y-6" />

              {/* Center Scale Icon */}
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Scale className="w-10 h-10 text-white" />
                </div>

                <div className="text-center mb-8">
                  <p className="text-[#0F172A] mb-2" style={{ fontWeight: 800, fontSize: "1.5rem" }}>{appName}</p>
                  <p className="text-[#6B7280] text-sm">nyāya sāthī (न्याय साथी)</p>
                  <p className="text-[#9CA3AF] text-xs mt-1">Meaning: "Companion in Justice"</p>
                </div>

                <div className="space-y-3">
                  {[
                    { text: "Trained on Indian Constitution", icon: CheckCircle2 },
                    { text: "IPC, CrPC, and 500+ Indian laws", icon: CheckCircle2 },
                    { text: "Supreme Court & High Court judgments", icon: CheckCircle2 },
                    { text: "Legal Aid Authority guidelines", icon: CheckCircle2 },
                    { text: "Consumer protection laws & RTI Act", icon: CheckCircle2 },
                  ].map(({ text, icon: Icon }, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-[#E5E7EB]" style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.06)" }}>
                      <Icon className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm text-[#374151]" style={{ fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[#0F172A] rounded-xl p-4 text-center">
                  <p className="text-white/60 text-xs mb-1">Our Mission</p>
                  <p className="text-white text-sm" style={{ fontWeight: 600, fontStyle: "italic" }}>
                    "Justice becomes accessible when understanding becomes simpler."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
