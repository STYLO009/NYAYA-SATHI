import { useState, useRef, useEffect, type ElementType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Scale, Menu, X, ChevronDown } from "lucide-react";
import { appName, authOptions, navLinks } from "../content/siteContent";

function NavDropdown({
  label,
  options,
  buttonClassName,
  onSelect,
}: {
  label: string;
  options: { icon: ElementType; title: string; subtitle: string; route: string }[];
  buttonClassName: string;
  onSelect: (route: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 ${buttonClassName}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden z-50"
            style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.14)" }}
          >
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => { onSelect(opt.route); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8FAFC] transition-colors text-left border-b border-[#F1F5F9] last:border-0"
              >
                <div className="w-8 h-8 bg-[#F1F5F9] rounded-xl flex items-center justify-center" style={{ flexShrink: 0 }}>
                  <opt.icon className="w-4 h-4 text-[#0F172A]" />
                </div>
                <div>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>{opt.title}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{opt.subtitle}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [mobileSignupOpen, setMobileSignupOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "#ffffff", letterSpacing: "-0.02em" }}>
              {appName}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                style={{ fontWeight: 500 }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <NavDropdown
              label="Login"
              options={authOptions.login}
              buttonClassName="text-sm text-white/70 hover:text-white transition-colors px-4 py-2 rounded-lg"
              onSelect={(route) => navigate(route)}
            />
            <NavDropdown
              label="Get Started"
              options={authOptions.signup}
              buttonClassName="text-sm bg-white text-[#0F172A] px-5 py-2.5 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-sm"
              onSelect={(route) => navigate(route)}
            />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1E3A5F] border-t border-white/10 px-6 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-white/70 hover:text-white py-1 text-sm transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </button>
              ))}

              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                {/* Login accordion */}
                <button
                  onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                  className="flex items-center justify-between w-full text-sm text-white/70 hover:text-white py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors px-4"
                  style={{ fontWeight: 500 }}
                >
                  Login
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileLoginOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileLoginOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1 pl-2"
                    >
                      {authOptions.login.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => { navigate(opt.route); setMobileOpen(false); }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                        >
                          <opt.icon className="w-4 h-4 text-white/60" style={{ flexShrink: 0 }} />
                          <div>
                            <p className="text-sm text-white" style={{ fontWeight: 500 }}>{opt.title}</p>
                            <p className="text-[11px] text-white/40">{opt.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Get Started accordion */}
                <button
                  onClick={() => setMobileSignupOpen(!mobileSignupOpen)}
                  className="flex items-center justify-between w-full text-sm bg-white text-[#0F172A] py-2.5 rounded-lg hover:bg-white/90 transition-colors px-4"
                  style={{ fontWeight: 600 }}
                >
                  Get Started
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileSignupOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSignupOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1 pl-2"
                    >
                      {authOptions.signup.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => { navigate(opt.route); setMobileOpen(false); }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                        >
                          <opt.icon className="w-4 h-4 text-white/60" style={{ flexShrink: 0 }} />
                          <div>
                            <p className="text-sm text-white" style={{ fontWeight: 500 }}>{opt.title}</p>
                            <p className="text-[11px] text-white/40">{opt.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
