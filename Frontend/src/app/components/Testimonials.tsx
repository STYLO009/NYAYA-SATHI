import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../content/siteContent";

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300"
      style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white text-sm" style={{ fontWeight: 700 }}>
            {t.avatar}
          </div>
          <div>
            <p className="text-[#0F172A] text-sm" style={{ fontWeight: 700 }}>{t.name}</p>
            <p className="text-[#6B7280] text-xs">{t.role}</p>
            <p className="text-[#9CA3AF] text-[10px]">{t.location}</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.bg} ${t.text} border`} style={{ fontWeight: 600 }}>
          {t.type}
        </span>
      </div>

      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <div className="relative">
        <Quote className="absolute -top-1 -left-1 w-5 h-5 text-[#E5E7EB]" />
        <p className="text-[#374151] text-sm pl-4" style={{ lineHeight: 1.7 }}>
          {t.review}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F8FAFC] py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-4"
          >
            <Star className="w-3.5 h-3.5 text-[#0F172A]" />
            <span className="text-xs text-[#0F172A]" style={{ fontWeight: 600 }}>Citizens Speak</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0F172A] mb-4"
            style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: "-0.02em" }}
          >
            Stories of Legal Empowerment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#6B7280] max-w-xl mx-auto"
            style={{ fontSize: "1.0625rem" }}
          >
            Real experiences from citizens, students, NGOs, and organizations across India.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 bg-white rounded-2xl p-6 border border-[#E5E7EB]"
        >
          <div className="text-center sm:text-left">
            <p className="text-[#0F172A] mb-1" style={{ fontWeight: 800, fontSize: "2.5rem" }}>4.9</p>
            <div className="flex gap-1 justify-center sm:justify-start mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-[#6B7280] text-sm">Average rating</p>
          </div>
          <div className="w-px h-12 bg-[#E5E7EB] hidden sm:block" />
          <div className="text-center sm:text-left">
            <p className="text-[#0F172A] mb-1" style={{ fontWeight: 700 }}>10,000+ Reviews</p>
            <p className="text-[#6B7280] text-sm">From citizens across India</p>
          </div>
          <div className="w-px h-12 bg-[#E5E7EB] hidden sm:block" />
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {["Google Play", "App Store", "Web App"].map((store, i) => (
              <span key={i} className="text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] px-3 py-1.5 rounded-full" style={{ fontWeight: 500 }}>
                {store}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
