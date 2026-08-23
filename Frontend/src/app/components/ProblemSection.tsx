import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { problemCards } from "../content/siteContent";

function ProblemCard({ problem, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = problem.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 group"
      style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}
    >
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${problem.color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-[#0F172A] mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
        {problem.title}
      </h3>
      <p className="text-[#6B7280] text-sm leading-relaxed">{problem.description}</p>
    </motion.div>
  );
}

export function ProblemSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="bg-[#F8FAFC] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-4"
          >
            <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>The Problem We Solve</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0F172A] mb-4"
            style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}
          >
            Why Citizens Need Nyaya Saathi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#6B7280] max-w-2xl mx-auto"
            style={{ fontSize: "1.0625rem" }}
          >
            Millions of Indian citizens face barriers to justice every day. We're here to bridge that gap with AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemCards.map((problem, i) => (
            <ProblemCard key={i} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
