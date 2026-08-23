import { Scale, Github, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { appName, footerCopy, footerSections, supportedBy } from "../content/siteContent";

export function Footer() {
  return (
    <footer className="bg-[#0F172A]">
      {/* CTA Strip */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2
            className="text-white whitespace-nowrap"
            style={{ fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}
          >
            {footerCopy.ctaTitle}
          </h2>
          <button className="flex-shrink-0 flex items-center gap-2 bg-white text-[#0F172A] px-7 py-3.5 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg group">
            <span style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{footerCopy.ctaButton}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.125rem" }}>{appName}</span>
            </div>
            <p className="text-white/40 text-sm mb-5" style={{ lineHeight: 1.7 }}>
              {footerCopy.brandDescription}
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white/40 text-xs">{footerCopy.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white/40 text-xs">{footerCopy.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white/40 text-xs">{footerCopy.location}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section}>
              <p className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>{section}</p>
              <ul className="space-y-2.5">
                {links.map(({ label }) => (
                  <li key={label}>
                    <button className="text-white/40 text-sm hover:text-white/70 transition-colors">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Supported By */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-white/30 text-xs mb-3 uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Conceptually Supported By
          </p>
          <div className="flex flex-wrap gap-3">
            {supportedBy.map((org, i) => (
              <span key={i} className="text-xs text-white/30 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {org}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <p className="text-white/30 text-xs" style={{ lineHeight: 1.7 }}>
            <strong className="text-white/50">Disclaimer:</strong> {footerCopy.disclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-white/30 text-xs">
            {footerCopy.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">{footerCopy.supportLine}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/30 text-xs">{footerCopy.systemStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
