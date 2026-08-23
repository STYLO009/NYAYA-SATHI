import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Scale, MessageSquare, Phone, ShieldAlert, LayoutDashboard,
  FileText, Bell, Settings, LogOut, ChevronRight, User,
  ArrowRight, Mic, Send, X, Calendar, HelpCircle,
  CheckCircle2, Clock, AlertCircle, BookOpen, Mail, ExternalLink,
  Upload, FileUp, ChevronDown, Lock, Eye, EyeOff,
  Plus, FolderOpen, Trash2
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { apiFetch, getToken, setToken, clearToken, getUser, setUser, clearUser, type StoredUser } from "../../lib/api";
import { authUrls, dashboardCopy } from "../content/siteContent";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "AI Agent", id: "agent" },
  { icon: Phone, label: "Teleconsultation", id: "tele" },
  { icon: ShieldAlert, label: "FIR & Rights", id: "fir" },
  { icon: Calendar, label: "Case Tracking", id: "cases" },
  { icon: Bell, label: "Reminders", id: "reminders" },
  { icon: FileText, label: "My Documents", id: "documents" },
  { icon: HelpCircle, label: "Help & Support", id: "help" },
  { icon: Settings, label: "Settings", id: "settings" },
];

// ── Agent Chat Modal ──────────────────────────────────────────────────────────
type ChatMessage = { from: "agent" | "user"; text: string };

const initialMessages: ChatMessage[] = [
  { from: "agent", text: dashboardCopy.agentWelcome },
];

function AgentModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch(authUrls.aiChat,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data?.response ?? data?.message ?? data?.answer ?? JSON.stringify(data);
      setMessages(prev => [...prev, { from: "agent", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { from: "agent", text: "Sorry, I couldn't reach the server. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-lg flex flex-col overflow-hidden"
        style={{ height: "560px", boxShadow: "0 24px 64px rgba(15,23,42,0.18)" }}
      >
        <div className="bg-[#0F172A] px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm" style={{ fontWeight: 700 }}>{dashboardCopy.agentTitle}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <p className="text-white/50 text-xs">{dashboardCopy.onlineStatus}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F8FAFC]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
              {msg.from === "agent" && (
                <div className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Scale className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.from === "agent" ? "bg-white border border-[#E5E7EB] text-[#374151]" : "bg-[#0F172A] text-white"}`}
                style={{ lineHeight: 1.6, boxShadow: msg.from === "agent" ? "0 2px 8px rgba(15,23,42,0.06)" : "none" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3 flex items-center gap-1.5" style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.06)" }}>
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-[#E5E7EB] bg-white flex-shrink-0">
          <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-xl px-3 py-2 focus-within:border-[#0F172A] focus-within:ring-2 focus-within:ring-[#0F172A]/10 transition-all">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your legal question..."
              disabled={loading}
              className="flex-1 text-sm text-[#111111] placeholder-[#9CA3AF] focus:outline-none bg-transparent disabled:opacity-60"
            />
            <button onClick={send} disabled={loading || !input.trim()} className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center hover:bg-[#1E3A5F] transition-colors disabled:opacity-50">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── FIR & Rights Section ──────────────────────────────────────────────────────
function FIRSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Write FIR form state
  const [writeForm, setWriteForm] = useState({ complainantName: "", datePlace: "", description: "", accusedDetails: "" });
  // Complaint form state
  const [complaintForm, setComplaintForm] = useState({ firDetails: "", natureOfComplaint: "", reliefSought: "" });

  const handleGenerateFIR = async () => {
    setLoading(true); setResult(null);
    try {
      const data = await apiFetch("/fir/draft", { method: "POST", body: JSON.stringify({ complainantName: writeForm.complainantName, datePlace: writeForm.datePlace, description: writeForm.description, accusedDetails: writeForm.accusedDetails }) });
      setResult(data.draftText);
    } catch (e: any) { setResult("Error: " + e.message); }
    finally { setLoading(false); }
  };

  const handleGenerateComplaint = async () => {
    setLoading(true); setResult(null);
    try {
      const data = await apiFetch("/fir/complaint", { method: "POST", body: JSON.stringify(complaintForm) });
      setResult(data.draftText);
    } catch (e: any) { setResult("Error: " + e.message); }
    finally { setLoading(false); }
  };

  const selectedOption = [
    { id: "write", label: "Write an FIR", icon: FileText, desc: "Draft and file a First Information Report with guided AI assistance", color: "text-red-600", bg: "bg-red-50 border-red-100" },
    { id: dashboardCopy.firOptions.complaint.id, label: dashboardCopy.firOptions.complaint.label, icon: ShieldAlert, desc: dashboardCopy.firOptions.complaint.desc, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
  ].find(o => o.id === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>FIR & Legal Rights</h2>

      {/* Dropdown selector */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-5" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-sm text-[#6B7280] mb-4">Select what you'd like to do:</p>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 border border-[#E5E7EB] rounded-xl hover:border-[#0F172A] transition-colors bg-white"
          >
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: selectedOption ? 600 : 400 }}>
              {selectedOption ? selectedOption.label : "Choose an option..."}
            </span>
            <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden z-20"
                style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.12)" }}
              >
                {[
                  { id: "write", label: "Write an FIR", icon: FileText, desc: "Draft and file a First Information Report with guided AI assistance", color: "text-red-600", bg: "bg-red-50 border-red-100" },
                  { id: dashboardCopy.firOptions.complaint.id, label: dashboardCopy.firOptions.complaint.label, icon: ShieldAlert, desc: dashboardCopy.firOptions.complaint.desc, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSelected(opt.id); setDropdownOpen(false); setResult(null); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F8FAFC] transition-colors text-left border-b border-[#F1F5F9] last:border-0"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${opt.bg}`}>
                      <opt.icon className={`w-4 h-4 ${opt.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>{opt.label}</p>
                      <p className="text-xs text-[#9CA3AF]">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form content */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#F1F5F9]"
            >
              {selected === "write" && (
                <div className="space-y-3">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Write an FIR</p>
                  <p className="text-xs text-[#6B7280]">Our AI will guide you step-by-step through drafting a legally accurate FIR with all required sections under Bharatiya Nagarik Suraksha Sanhita (BNSS).</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([["complainantName","Name of complainant"],["datePlace","Date & place of incident"],["description","Description of offence"],["accusedDetails","Accused details (if known)"]] as [keyof typeof writeForm, string][]).map(([key, label]) => (
                      <div key={key} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                        <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>{label.toUpperCase()}</label>
                        <input value={writeForm[key]} onChange={e => setWriteForm(f => ({ ...f, [key]: e.target.value }))} placeholder={`Enter ${label.toLowerCase()}...`} className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB]" />
                      </div>
                    ))}
                  </div>
                  {result && <pre className="text-xs text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 whitespace-pre-wrap max-h-64 overflow-y-auto">{result}</pre>}
                  <button onClick={handleGenerateFIR} disabled={loading} className="mt-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2 disabled:opacity-60" style={{ fontWeight: 600 }}>
                    {loading ? "Generating..." : "Generate FIR Draft with AI"}
                  </button>
                </div>
              )}
              {selected === "complaint" && (
                <div className="space-y-3">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Complaint regarding FIR</p>
                  <p className="text-xs text-[#6B7280]">File a complaint about an existing FIR — including delayed registration, false FIR, or improper investigation to a Superintendent of Police or Magistrate.</p>
                  <div className="space-y-3">
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                      <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>FIR NUMBER / STATION</label>
                      <input value={complaintForm.firDetails} onChange={e => setComplaintForm(f => ({ ...f, firDetails: e.target.value }))} placeholder="Enter FIR number / station..." className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB]" />
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                      <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>NATURE OF COMPLAINT</label>
                      <textarea rows={2} value={complaintForm.natureOfComplaint} onChange={e => setComplaintForm(f => ({ ...f, natureOfComplaint: e.target.value }))} placeholder="Enter nature of complaint..." className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB] resize-none" />
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3">
                      <label className="block text-[10px] text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>RELIEF SOUGHT</label>
                      <input value={complaintForm.reliefSought} onChange={e => setComplaintForm(f => ({ ...f, reliefSought: e.target.value }))} placeholder="Enter relief sought..." className="w-full text-sm text-[#0F172A] bg-transparent focus:outline-none placeholder-[#D1D5DB]" />
                    </div>
                  </div>
                  {result && <pre className="text-xs text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 whitespace-pre-wrap max-h-64 overflow-y-auto">{result}</pre>}
                  <button onClick={handleGenerateComplaint} disabled={loading} className="mt-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2 disabled:opacity-60" style={{ fontWeight: 600 }}>
                    {loading ? "Generating..." : "Draft Complaint with AI"}
                  </button>
                </div>
              )}
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Decode FIR Sections", desc: "Understand the IPC/BNS sections mentioned in your FIR", color: "text-red-600", bg: "bg-red-50 border-red-100" },
          { title: "Rights During Custody", desc: "Know your fundamental rights when detained by police", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { title: "Bail Guide", desc: "Regular bail, anticipatory bail — understand the process", color: "text-green-600", bg: "bg-green-50 border-green-100" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E5E7EB] hover:-translate-y-0.5 transition-all cursor-pointer" style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.06)" }}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${card.bg} mb-3`}>
              <ShieldAlert className={`w-4 h-4 ${card.color}`} />
            </div>
            <p className="text-sm text-[#0F172A] mb-1" style={{ fontWeight: 600 }}>{card.title}</p>
            <p className="text-xs text-[#9CA3AF]" style={{ lineHeight: 1.5 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Reminders Section ─────────────────────────────────────────────────────────
function RemindersSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reminders, setReminders] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formatDate = (d?: Date) => d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";

  useEffect(() => {
    apiFetch("/reminders/manual").then(d => setReminders(d.data ?? [])).catch(() => {});
  }, []);

  const handleSetReminder = async () => {
    if (!title || !description || !selectedDate) return;
    setSaving(true);
    try {
      const data = await apiFetch("/reminders/manual", { method: "POST", body: JSON.stringify({ caseTitle: title, description, hearingDate: selectedDate.toISOString().split("T")[0] }) });
      setReminders(prev => [data.data, ...prev]);
      setTitle(""); setDescription(""); setSelectedDate(undefined);
    } catch (e) {}
    finally { setSaving(false); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("document", file);
      const data = await apiFetch("/reminders/ai-upload", { method: "POST", body: fd });
      setReminders(prev => [data.data, ...prev]);
      setUploadedFile(null);
    } catch (e) {}
    finally { setUploading(false); e.target.value = ""; }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Reminders</h2>

      {/* Add Reminder Form */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Add a New Reminder</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: form fields */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>TITLE</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Court hearing at District Court"
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>DESCRIPTION</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Add any notes or details about this reminder..."
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10 transition-all resize-none"
              />
            </div>

            {/* Date picker */}
            <div>
              <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>DATE</label>
              <div className="relative">
                <button
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm hover:border-[#0F172A] transition-colors"
                >
                  <span className={selectedDate ? "text-[#0F172A]" : "text-[#9CA3AF]"} style={{ fontWeight: selectedDate ? 500 : 400 }}>
                    {selectedDate ? formatDate(selectedDate) : "Select a date"}
                  </span>
                  <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <AnimatePresence>
                  {calendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 z-30 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.14)" }}
                    >
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(d) => { setSelectedDate(d); setCalendarOpen(false); }}
                        className="p-3"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button onClick={handleSetReminder} disabled={saving || !title || !description || !selectedDate} className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors flex items-center gap-2 disabled:opacity-60" style={{ fontWeight: 600 }}>
              <Bell className="w-4 h-4" /> {saving ? "Saving..." : "Set Reminder"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex lg:flex-col items-center gap-3 lg:gap-0 justify-center">
            <div className="flex-1 h-px lg:h-full lg:w-px bg-[#E5E7EB]" />
            <span className="text-xs text-[#9CA3AF] bg-white px-2 py-1 rounded-full border border-[#E5E7EB] flex-shrink-0" style={{ fontWeight: 600 }}>OR</span>
            <div className="flex-1 h-px lg:h-full lg:w-px bg-[#E5E7EB]" />
          </div>

          {/* Right: upload */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-sm text-[#0F172A] mb-2" style={{ fontWeight: 600 }}>Upload Reminders from Document</p>
            <p className="text-xs text-[#9CA3AF] mb-4" style={{ lineHeight: 1.6 }}>Upload a court order, notice, or legal document and our AI will automatically extract and set reminders for all important dates.</p>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleFileUpload} />
            {uploadedFile ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700 flex-1 truncate" style={{ fontWeight: 500 }}>{uploading ? "Processing with AI..." : uploadedFile.name}</p>
                {!uploading && <button onClick={() => setUploadedFile(null)} className="text-[#9CA3AF] hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>}
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-[#D1D5DB] rounded-2xl hover:border-[#0F172A] hover:bg-[#F8FAFC] transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#F1F5F9] group-hover:bg-[#0F172A]/10 rounded-xl flex items-center justify-center transition-colors">
                  <FileUp className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#0F172A] transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 600 }}>Click to upload document</p>
                  <p className="text-xs text-[#9CA3AF]">PDF, DOC, DOCX, JPG, PNG</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] text-sm" style={{ fontWeight: 700 }}>Upcoming Reminders</span>
          <span className="text-[10px] bg-[#0F172A] text-white px-2 py-0.5 rounded-full ml-1" style={{ fontWeight: 600 }}>{reminders.length}</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {reminders.length === 0 && <p className="text-xs text-[#9CA3AF] px-6 py-4">No reminders yet.</p>}
          {reminders.map((r: any, i: number) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#F8FAFC] transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#F1F5F9]">
                <Bell className="w-4 h-4 text-[#9CA3AF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{r.caseTitle ?? r.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-[#9CA3AF]" />
                  <p className="text-xs text-[#9CA3AF]">{r.hearingDate ? new Date(r.hearingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Case Tracking Section ─────────────────────────────────────────────────────
const CASE_STAGES = ["Filed", "Admitted", "Evidence", "Arguments", "Judgment"];

function CaseTrackingSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddCase, setShowAddCase] = useState(false);
  const [stageAnswers, setStageAnswers] = useState<Record<string, Record<number, "yes" | "no" | null>>>({});
  const [caseList, setCaseList] = useState<any[]>([]);
  const [addForm, setAddForm] = useState({ caseTitle: "", courtName: "", caseNumber: "", nextHearingDate: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/cases/").then(d => {
      const list = d.data ?? d;
      setCaseList(list);
      // Pre-fill stageAnswers based on currentStage from DB
      const initial: Record<string, Record<number, "yes" | "no" | null>> = {};
      list.forEach((c: any) => {
        const id = c._id ?? c.id;
        const stageIdx = CASE_STAGES.indexOf(c.currentStage);
        if (stageIdx >= 0) {
          initial[id] = {};
          for (let i = 0; i <= stageIdx; i++) initial[id][i] = "yes";
        }
      });
      setStageAnswers(initial);
    }).catch(() => {});
  }, []);

  const handleSaveCase = async () => {
    if (!addForm.caseTitle || !addForm.caseNumber) return;
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        title: addForm.caseTitle,
        court: addForm.courtName,
        caseNumber: addForm.caseNumber,
      };
      if (addForm.nextHearingDate) payload.nextHearingDate = addForm.nextHearingDate;
      const data = await apiFetch("/cases/add", { method: "POST", body: JSON.stringify(payload) });
      setCaseList(prev => [data.data ?? data, ...prev]);
      setAddForm({ caseTitle: "", courtName: "", caseNumber: "", nextHearingDate: "" });
      setShowAddCase(false);
    } catch (e) {}
    finally { setSaving(false); }
  };

  const setAnswer = async (caseId: string, stageIdx: number, answer: "yes" | "no") => {
    const toggled = stageAnswers[caseId]?.[stageIdx] === answer ? null : answer;
    setStageAnswers(prev => ({
      ...prev,
      [caseId]: {
        ...(prev[caseId] || {}),
        [stageIdx]: toggled,
      },
    }));
    // When YES is clicked (or un-toggled), sync currentStage to backend
    if (answer === "yes" && toggled === "yes") {
      try {
        const newStage = CASE_STAGES[stageIdx];
        const updated = await apiFetch(`/cases/${caseId}/stage`, { method: "PATCH", body: JSON.stringify({ newStage }) });
        setCaseList(prev => prev.map((c: any) => (c._id ?? c.id) === caseId ? { ...c, ...(updated.data ?? {}) } : c));
      } catch (e) {}
    }
  };

  const getAnswer = (caseId: string, stageIdx: number): "yes" | "no" | null =>
    stageAnswers[caseId]?.[stageIdx] ?? null;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#0F172A]" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Case Tracking</h2>
        <button
          onClick={() => setShowAddCase(!showAddCase)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-all active:scale-95"
          style={{ fontWeight: 700, boxShadow: "0 4px 14px rgba(15,23,42,0.25)" }}
        >
          <Plus className="w-4 h-4" />
          Add Case
        </button>
      </div>

      <AnimatePresence>
        {showAddCase && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5"
          >
            <div className="bg-white rounded-2xl border border-[#0F172A] p-5" style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.1)" }}>
              <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Add New Case</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([["caseTitle","Case Title"],["courtName","Court Name"],["caseNumber","Case Number"],["nextHearingDate","Next Hearing Date"]] as [keyof typeof addForm, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-[10px] text-[#9CA3AF] mb-1.5" style={{ fontWeight: 600 }}>{label.toUpperCase()}</label>
                    <input value={addForm[key]} onChange={e => setAddForm(f => ({ ...f, [key]: e.target.value }))} placeholder={`Enter ${label.toLowerCase()}...`} className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] placeholder-[#D1D5DB] focus:outline-none focus:border-[#0F172A] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={handleSaveCase} disabled={saving || !addForm.caseTitle || !addForm.caseNumber} className="px-5 py-2 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors disabled:opacity-60" style={{ fontWeight: 600 }}>{saving ? "Saving..." : "Save Case"}</button>
                <button onClick={() => setShowAddCase(false)} className="px-5 py-2 border border-[#E5E7EB] rounded-xl text-sm text-[#6B7280] hover:bg-[#F8FAFC] transition-colors" style={{ fontWeight: 500 }}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] text-sm" style={{ fontWeight: 700 }}>Case Tracking</span>
          <span className="text-[10px] bg-[#0F172A] text-white px-2 py-0.5 rounded-full ml-1" style={{ fontWeight: 600 }}>{caseList.length} Active</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {caseList.length === 0 && <p className="text-xs text-[#9CA3AF] px-6 py-4">No cases yet. Add your first case above.</p>}
          {caseList.map((c: any) => (
            <div key={c._id ?? c.id}>
              <div
                className="px-6 py-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === (c._id ?? c.id) ? null : (c._id ?? c.id))}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 600 }}>{c.caseNumber ?? c.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-600 border-blue-100" style={{ fontWeight: 600 }}>{c.currentStage ?? c.status ?? "Filed"}</span>
                    </div>
                    <p className="text-sm text-[#0F172A] mb-0.5" style={{ fontWeight: 600 }}>{c.caseTitle ?? c.title}</p>
                    <p className="text-xs text-[#9CA3AF]">{c.courtName ?? c.court}{c.nextHearingDate ? ` · Next: ${new Date(c.nextHearingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : ""}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform mt-0.5 ${expanded === (c._id ?? c.id) ? "rotate-90" : ""}`} />
                </div>
              </div>

              {/* Expanded: stages with YES / NO */}
              <AnimatePresence>
                {expanded === (c._id ?? c.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#F1F5F9] bg-[#F8FAFC]"
                  >
                    <p className="text-xs text-[#9CA3AF] px-6 pt-4 mb-4" style={{ fontWeight: 600 }}>CASE STAGES</p>
                    <div className="px-6 pb-5 space-y-3">
                      {CASE_STAGES.map((stage, i) => {
                        const answer = getAnswer(c._id ?? c.id, i);
                        return (
                          <div
                            key={i}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition-all ${
                              answer === "yes"
                                ? "bg-green-50 border-green-200"
                                : answer === "no"
                                ? "bg-red-50 border-red-200"
                                : "bg-white border-[#E5E7EB]"
                            }`}
                          >
                            {/* Stage label + status icon */}
                            <div className="flex items-center gap-3">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                answer === "yes" ? "bg-green-500" : answer === "no" ? "bg-red-500" : "bg-[#F1F5F9]"
                              }`}>
                                {answer === "yes" && (
                                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                {answer === "no" && (
                                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                )}
                                {answer === null && (
                                  <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 700 }}>{i + 1}</span>
                                )}
                              </div>
                              <span className={`text-sm ${
                                answer === "yes" ? "text-green-800" : answer === "no" ? "text-red-800" : "text-[#374151]"
                              }`} style={{ fontWeight: 600 }}>{stage}</span>
                              {answer === "yes" && <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Completed</span>}
                              {answer === "no" && <span className="text-[10px] text-red-600 bg-red-100 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Pending</span>}
                            </div>

                            {/* YES / NO buttons */}
                            <div className="flex items-center gap-2 flex-shrink-0 ml-4" onClick={e => e.stopPropagation()}>
                              <button
                              onClick={() => setAnswer(c._id ?? c.id, i, "yes")}
                                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                                  answer === "yes"
                                    ? "bg-green-500 text-white shadow-sm"
                                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-green-400 hover:text-green-600 hover:bg-green-50"
                                }`}
                                style={{ fontWeight: 700 }}
                              >
                                YES
                              </button>
                              <button
                                onClick={() => setAnswer(c._id ?? c.id, i, "no")}
                                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                                  answer === "no"
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                                }`}
                                style={{ fontWeight: 700 }}
                              >
                                NO
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── My Documents Section ──────────────────────────────────────────────────────
function MyDocumentsSection() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    apiFetch("/documents/").then(d => setDocuments(d.data ?? d)).catch(() => {});
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("document", file);
        const data = await apiFetch("/documents/upload", { method: "POST", body: fd });
        setDocuments(prev => [...prev, data.data ?? data]);
      }
    } catch (e) {}
    finally { setUploading(false); e.target.value = ""; }
  };

  const getInsights = async (id: string) => {
    setDocuments(prev => prev.map((d: any) => (d._id ?? d.id) === id ? { ...d, loadingInsights: true } : d));
    try {
      const data = await apiFetch(`/documents/${id}/insights`);
      setDocuments(prev => prev.map((d: any) =>
        (d._id ?? d.id) === id ? { ...d, loadingInsights: false, insights: data.data } : d
      ));
    } catch (e) {
      setDocuments(prev => prev.map((d: any) => (d._id ?? d.id) === id ? { ...d, loadingInsights: false } : d));
    }
  };

  const removeDoc = (id: string) => {
    setDocuments(prev => prev.filter((d: any) => (d._id ?? d.id) !== id));
  };

  const typeColor: Record<string, string> = {
    PDF: "bg-red-50 text-red-600 border-red-100",
    DOCX: "bg-blue-50 text-blue-600 border-blue-100",
    DOC: "bg-blue-50 text-blue-600 border-blue-100",
    JPG: "bg-purple-50 text-purple-600 border-purple-100",
    PNG: "bg-purple-50 text-purple-600 border-purple-100",
    FILE: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>My Documents</h2>

      {/* Upload area */}
      <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" className="hidden" onChange={handleUpload} />
      <div
        onClick={() => fileRef.current?.click()}
        className="bg-white rounded-2xl border-2 border-dashed border-[#D1D5DB] p-8 mb-6 flex flex-col items-center justify-center gap-4 hover:border-[#0F172A] hover:bg-[#F8FAFC] transition-all cursor-pointer group"
        style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}
      >
        <div className="w-14 h-14 bg-[#F1F5F9] group-hover:bg-[#0F172A]/10 rounded-2xl flex items-center justify-center transition-colors">
          <Upload className="w-7 h-7 text-[#9CA3AF] group-hover:text-[#0F172A] transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-[#0F172A] mb-1" style={{ fontWeight: 700 }}>Upload your Documents</p>
          <p className="text-sm text-[#9CA3AF]">Drag & drop or click to browse — PDF, DOC, DOCX, JPG, PNG supported</p>
        </div>
        <span className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm group-hover:bg-[#1E3A5F] transition-colors flex items-center gap-2" style={{ fontWeight: 600 }}>
          <Upload className="w-4 h-4" /> Browse Files
        </span>
      </div>

      {/* Documents list */}
      {documents.length === 0 ? (
        <div className="text-center py-10 text-[#9CA3AF]">
          <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc: any) => (
            <motion.div
              key={doc._id ?? doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
              style={{ boxShadow: "0 4px 12px rgba(15,23,42,0.06)" }}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-xs flex-shrink-0 ${typeColor[(doc.fileType ?? doc.type ?? "FILE").toUpperCase()] || typeColor.FILE}`} style={{ fontWeight: 700 }}>
                  {(doc.fileType ?? doc.type ?? "FILE").toUpperCase().slice(0,4)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0F172A] truncate" style={{ fontWeight: 600 }}>{doc.originalName ?? doc.filename ?? doc.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{doc.size ? `${(doc.size/1024/1024).toFixed(1)} MB · ` : ""}{doc.uploadedAt ? `Uploaded ${new Date(doc.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : doc.date ?? ""}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => getInsights(doc._id ?? doc.id)}
                    disabled={doc.loadingInsights}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl text-xs hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontWeight: 600 }}
                  >
                    {doc.loadingInsights ? (
                      <>
                        <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Get AI Insights
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => removeDoc(doc._id ?? doc.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#E5E7EB] hover:bg-red-50 hover:border-red-100 transition-colors text-[#9CA3AF] hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* AI Insights Panel */}
              <AnimatePresence>
                {doc.insights && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[#E5E7EB] bg-gradient-to-r from-[#EEF2FF] to-[#F5F3FF] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[#4338CA] mb-2" style={{ fontWeight: 700 }}>AI INSIGHTS</p>
                        {doc.insights.summary && (
                          <p className="text-sm text-[#374151] mb-3" style={{ lineHeight: 1.65 }}>{doc.insights.summary}</p>
                        )}
                        {Array.isArray(doc.insights.keyInsights) && doc.insights.keyInsights.length > 0 && (
                          <ul className="space-y-1.5">
                            {doc.insights.keyInsights.map((point: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[#374151]" style={{ lineHeight: 1.6 }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] flex-shrink-0 mt-2" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                        {typeof doc.insights === "string" && (
                          <p className="text-sm text-[#374151]" style={{ lineHeight: 1.65 }}>{doc.insights}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Settings Section ──────────────────────────────────────────────────────────
function SettingsSection({ user, onUserUpdated }: { user: StoredUser | null; onUserUpdated: (user: StoredUser) => void }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  const handleProfileSave = async () => {
    if (!name.trim() || !phoneNumber.trim()) return;

    setProfileSaving(true);
    setProfileMessage("");

    try {
      await apiFetch("/auth/update-profile", {
        method: "PUT",
        body: JSON.stringify({
          name: name.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
      });

      const updatedUser = {
        name: name.trim(),
        email: user?.email ?? "",
        phoneNumber: phoneNumber.trim(),
      };
      setUser(updatedUser);
      onUserUpdated(updatedUser);
      setProfileMessage("Profile updated successfully");
    } catch (error: any) {
      setProfileMessage(error.message || "Unable to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSave = () => {
    if (newPwd && newPwd === confirmPwd) {
      setPwdSaved(true);
      setOldPwd(""); setNewPwd(""); setConfirmPwd("");
      setTimeout(() => setPwdSaved(false), 3000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Settings</h2>

      <div className="space-y-5 max-w-xl">
        {/* Profile settings */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
          <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Profile Information</p>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center">
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                {(user?.name?.trim()?.[0] ?? user?.email?.trim()?.[0] ?? "U").toUpperCase()}
                {(user?.name?.split(/\s+/).filter(Boolean).slice(1)[0]?.[0] ?? "").toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[#0F172A] text-sm" style={{ fontWeight: 600 }}>{user?.name ?? "User"}</p>
              <p className="text-[#9CA3AF] text-xs">{user?.email ?? ""}</p>
            </div>
          </div>
          <div className="space-y-3">
            <>
              <div>
                <label className="block text-xs text-[#6B7280] mb-1" style={{ fontWeight: 600 }}>FULL NAME</label>
                <input value={name} onChange={(event) => setName(event.target.value)} className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-[#6B7280] mb-1" style={{ fontWeight: 600 }}>EMAIL ADDRESS</label>
                <input value={user?.email ?? ""} disabled className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] bg-[#F8FAFC]" />
              </div>
              <div>
                <label className="block text-xs text-[#6B7280] mb-1" style={{ fontWeight: 600 }}>PHONE NUMBER</label>
                <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors" />
              </div>
            </>
          </div>
          <button onClick={handleProfileSave} disabled={profileSaving || !name.trim() || !phoneNumber.trim()} className="mt-4 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm hover:bg-[#1E3A5F] transition-colors disabled:opacity-60" style={{ fontWeight: 600 }}>{profileSaving ? "Saving..." : "Save Changes"}</button>
          {profileMessage && <p className={`mt-3 text-sm ${profileMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{profileMessage}</p>}
        </div>
        
        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
          <p className="text-sm text-[#0F172A] mb-4" style={{ fontWeight: 700 }}>Notification Preferences</p>
          <div className="space-y-3">
            {["Email reminders for hearings", "SMS alerts for deadlines", "Push notifications", "Weekly case summary"].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                <span className="text-sm text-[#374151]">{item}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                  <div className="w-9 h-5 bg-[#E5E7EB] peer-checked:bg-[#0F172A] rounded-full transition-colors peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Lawyer Teleconsultation Section ──────────────────────────────────────────
const caseTypes = [
  "Criminal", "Civil", "Family / Matrimonial", "Property / Real Estate",
  "Consumer", "Labour / Employment", "RTI / Public Interest", "Cyber Crime",
  "Tax", "Intellectual Property", "Other",
];

const lawyers = [
  {
    name: "Adv. Priya Sharma",
    initials: "PS",
    avatarColor: "bg-violet-600",
    expertise: ["Criminal Law", "POCSO", "Bail & Anticipatory Bail"],
    experience: 14,
    rating: 4.9,
    reviews: 238,
    languages: ["Hindi", "English"],
    location: "Delhi High Court",
    fee: "₹500 / 30 min",
    available: true,
  },
  {
    name: "Adv. Rajan Mehta",
    initials: "RM",
    avatarColor: "bg-blue-600",
    expertise: ["Civil & Property Law", "Land Disputes", "Consumer Forum"],
    experience: 21,
    rating: 4.7,
    reviews: 315,
    languages: ["Hindi", "English", "Punjabi"],
    location: "District Court, Delhi",
    fee: "₹700 / 30 min",
    available: true,
  },
  {
    name: "Adv. Sunita Nair",
    initials: "SN",
    avatarColor: "bg-emerald-600",
    expertise: ["Family Law", "Divorce & Custody", "Domestic Violence"],
    experience: 9,
    rating: 4.8,
    reviews: 174,
    languages: ["Hindi", "English", "Malayalam"],
    location: "Family Court, Delhi",
    fee: "₹450 / 30 min",
    available: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-[#E5E7EB]"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TeleconsultationSection() {
  const [selectedCaseType, setSelectedCaseType] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bookedLawyer, setBookedLawyer] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Lawyer Teleconsultation</h2>

      {/* Case type question */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}>
        <p className="text-[#0F172A] mb-1" style={{ fontWeight: 700, fontSize: "1rem" }}>What is your case type?</p>
        <p className="text-sm text-[#9CA3AF] mb-4">Select the category that best describes your legal matter to find the most suitable lawyer.</p>

        <div className="relative max-w-sm">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 border border-[#E5E7EB] rounded-xl hover:border-[#0F172A] transition-colors bg-white"
          >
            <span className={selectedCaseType ? "text-sm text-[#0F172A]" : "text-sm text-[#9CA3AF]"} style={{ fontWeight: selectedCaseType ? 600 : 400 }}>
              {selectedCaseType ?? "Select case type..."}
            </span>
            <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden z-20"
                style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.14)" }}
              >
                <div className="max-h-56 overflow-y-auto py-1">
                  {caseTypes.map((ct) => (
                    <button
                      key={ct}
                      onClick={() => { setSelectedCaseType(ct); setDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F8FAFC] transition-colors ${selectedCaseType === ct ? "text-[#0F172A] bg-[#F1F5F9]" : "text-[#374151]"}`}
                      style={{ fontWeight: selectedCaseType === ct ? 600 : 400 }}
                    >
                      {ct}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {selectedCaseType && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-[#6B7280]"
          >
            Showing lawyers experienced in <span className="text-[#0F172A]" style={{ fontWeight: 600 }}>{selectedCaseType}</span> matters.
          </motion.p>
        )}
      </div>

      {/* Lawyer profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {lawyers.map((lawyer) => (
          <motion.div
            key={lawyer.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col"
            style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07)" }}
          >
            {/* Availability badge */}
            <div className={`h-1 w-full ${lawyer.available ? "bg-green-400" : "bg-[#E5E7EB]"}`} />

            <div className="p-5 flex-1 flex flex-col">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${lawyer.avatarColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm" style={{ fontWeight: 700 }}>{lawyer.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0F172A] truncate" style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{lawyer.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${lawyer.available ? "bg-green-400" : "bg-[#D1D5DB]"}`} />
                    <span className={`text-[10px] ${lawyer.available ? "text-green-600" : "text-[#9CA3AF]"}`} style={{ fontWeight: 600 }}>
                      {lawyer.available ? "Available Now" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={lawyer.rating} />
                <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.rating}</span>
                <span className="text-xs text-[#9CA3AF]">({lawyer.reviews} reviews)</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-[10px] text-[#9CA3AF] mb-0.5" style={{ fontWeight: 600 }}>EXPERIENCE</p>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.experience} years</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-[10px] text-[#9CA3AF] mb-0.5" style={{ fontWeight: 600 }}>CONSULTATION FEE</p>
                  <p className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>{lawyer.fee}</p>
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-4">
                <p className="text-[10px] text-[#9CA3AF] mb-2" style={{ fontWeight: 600 }}>EXPERTISE</p>
                <div className="flex flex-wrap gap-1.5">
                  {lawyer.expertise.map((e) => (
                    <span key={e} className="text-[11px] px-2.5 py-1 bg-[#F1F5F9] text-[#374151] rounded-lg" style={{ fontWeight: 500 }}>{e}</span>
                  ))}
                </div>
              </div>

              {/* Languages + location */}
              <div className="space-y-1.5 mb-5">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-xs text-[#6B7280]">{lawyer.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-[#6B7280]">{lawyer.location}</span>
                </div>
              </div>

              {/* Book button */}
              <div className="mt-auto">
                {bookedLawyer === lawyer.name ? (
                  <div className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-50 border border-green-200 rounded-xl">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-green-700" style={{ fontWeight: 600 }}>Consultation Booked!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setBookedLawyer(lawyer.name)}
                    disabled={!lawyer.available}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
                      lawyer.available
                        ? "bg-[#0F172A] text-white hover:bg-[#1E3A5F] active:scale-95"
                        : "bg-[#F1F5F9] text-[#9CA3AF] cursor-not-allowed"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    <Phone className="w-4 h-4" />
                    {lawyer.available ? "Book Consultation" : "Currently Unavailable"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Help & Support Section ────────────────────────────────────────────────────
const faqs = [
  { q: "How do I upload a legal document for analysis?", a: "Go to the Documents section, click 'Upload Document', and select your PDF or image. Our AI will analyze it within seconds." },
  { q: "Is the AI legal guidance a substitute for a lawyer?", a: dashboardCopy.faqs.legalGuidance },
  { q: "How do I file an FIR complaint?", a: "Visit your nearest police station and submit a written complaint. You can also file an e-FIR on your state police portal. Our AI Agent can guide you step by step." },
];

function HelpSupportSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, title: "AI Chat Support", desc: "Ask the AI agent anything, 24/7", action: "Start Chat", color: "text-[#0F172A]", bg: "bg-[#0F172A]/5" },
          { icon: Mail, title: "Email Support", desc: "help@nyayasaathi.gov.in", action: "Send Email", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Phone, title: "Helpline", desc: "1800-XXX-XXXX · Toll Free", action: "Call Now", color: "text-green-600", bg: "bg-green-50" },
        ].map(({ icon: Icon, title, desc, action, color, bg }, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5E7EB]" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-sm text-[#0F172A] mb-0.5" style={{ fontWeight: 700 }}>{title}</p>
            <p className="text-xs text-[#9CA3AF] mb-3">{desc}</p>
            <button className="text-xs text-[#0F172A] flex items-center gap-1 hover:underline" style={{ fontWeight: 600 }}>
              {action} <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}>
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#0F172A]" />
          <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Frequently Asked Questions</span>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="text-sm text-[#0F172A] pr-4" style={{ fontWeight: 500 }}>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-4 bg-[#F8FAFC] border-t border-[#F1F5F9]"
                >
                  <p className="text-sm text-[#6B7280] pt-3" style={{ lineHeight: 1.7 }}>{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Home ─────────────────────────────────────────────────────────────
function DashboardHome({ setActiveSection, setAgentOpen }: { setActiveSection: (s: string) => void; setAgentOpen: (v: boolean) => void }) {
  const [cases, setCases] = useState<any[]>([]);
  const [upcomingReminders, setUpcomingReminders] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/cases/").then(d => setCases(d.data ?? d)).catch(() => {});
    apiFetch("/reminders/manual").then(d => setUpcomingReminders(d.data ?? [])).catch(() => {});
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0F172A] rounded-2xl p-6 mb-5 relative overflow-hidden cursor-pointer group"
        style={{ boxShadow: "0 8px 32px rgba(15,23,42,0.18)" }}
        onClick={() => setAgentOpen(true)}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/3 rounded-full translate-y-12" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-0.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-[10px]" style={{ fontWeight: 600 }}>Online Now</span>
              </div>
            </div>
            <h2 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.375rem", letterSpacing: "-0.01em" }}>
              Talk to our AI Legal Agent
            </h2>
            <p className="text-white/50 text-sm max-w-md" style={{ lineHeight: 1.6 }}>
              Get instant answers to your legal questions. Understand your rights, decode documents, and receive step-by-step guidance.
            </p>
          </div>
          <div className="flex-shrink-0 ml-6 hidden sm:block">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 group-hover:translate-x-1 transition-all duration-200">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Lawyer Teleconsultation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)" }}
          onClick={() => setActiveSection("tele")}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Available</span>
          </div>
          <h3 className="text-[#0F172A] mb-1.5" style={{ fontWeight: 700, fontSize: "1rem" }}>Lawyer Teleconsultation</h3>
          <p className="text-[#6B7280] text-sm mb-4" style={{ lineHeight: 1.6 }}>Connect with verified lawyers for a live video or phone consultation at your convenience.</p>
          <div className="space-y-2 mb-4">
            {["Free 15-min initial session", "Verified Bar Council lawyers", "Hindi & regional languages"].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <span className="text-xs text-[#6B7280]">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-[#0F172A] text-[#0F172A] rounded-xl py-2.5 hover:bg-[#0F172A] hover:text-white transition-all duration-200 text-sm" style={{ fontWeight: 600 }}>
            Book a Consultation <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* FIR & Rights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-2xl p-5 border border-[#E5E7EB] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)" }}
          onClick={() => setActiveSection("fir")}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-[10px] bg-red-50 border border-red-100 text-red-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>Know Your Rights</span>
          </div>
          <h3 className="text-[#0F172A] mb-1.5" style={{ fontWeight: 700, fontSize: "1rem" }}>FIR & Legal Rights</h3>
          <p className="text-[#6B7280] text-sm mb-4" style={{ lineHeight: 1.6 }}>Understand your FIR, know your rights when detained, and get step-by-step legal guidance.</p>
          <div className="space-y-2 mb-4">
            {["Write an FIR with AI guidance", "Complaint regarding FIR", "Rights during police custody"].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="text-xs text-[#6B7280]">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-[#0F172A] text-[#0F172A] rounded-xl py-2.5 hover:bg-[#0F172A] hover:text-white transition-all duration-200 text-sm" style={{ fontWeight: 600 }}>
            Explore FIR Guide <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom row: Cases + Reminders + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Cases box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Active Cases</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSection("cases")}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#0F172A] text-white rounded-lg text-xs hover:bg-[#1E3A5F] transition-colors"
                style={{ fontWeight: 600 }}
              >
                <Plus className="w-3 h-3" /> Add Case
              </button>
            </div>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {cases.map((c: any, i: number) => (
              <div key={i} className="px-4 py-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={() => setActiveSection("cases")}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-[#0F172A] truncate flex-1 pr-2" style={{ fontWeight: 500 }}>{c.caseTitle ?? c.title}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full border flex-shrink-0 bg-blue-50 text-blue-600 border-blue-100" style={{ fontWeight: 600 }}>{c.currentStage ?? c.status ?? "Filed"}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reminders box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>Upcoming Reminders</span>
            <button onClick={() => setActiveSection("reminders")} className="text-xs text-[#6B7280] hover:text-[#0F172A] flex items-center gap-1 transition-colors" style={{ fontWeight: 500 }}>
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {upcomingReminders.slice(0, 3).map((r: any, i: number) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F1F5F9]">
                  <Bell className="w-3.5 h-3.5 text-[#9CA3AF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#0F172A] truncate" style={{ fontWeight: 500 }}>{r.caseTitle ?? r.title}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{r.hearingDate ? new Date(r.hearingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* My Documents box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
            <span className="text-sm text-[#0F172A]" style={{ fontWeight: 700 }}>My Documents</span>
            <button onClick={() => setActiveSection("documents")} className="text-xs text-[#6B7280] hover:text-[#0F172A] flex items-center gap-1 transition-colors" style={{ fontWeight: 500 }}>
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {[
              { name: "FIR_Copy_2026.pdf", type: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
              { name: "Land_Registry_Deed.pdf", type: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
              { name: "Consumer_Forum_Notice.docx", type: "DOCX", color: "bg-blue-50 text-blue-600 border-blue-100" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border text-[10px] flex-shrink-0 ${doc.color}`} style={{ fontWeight: 700 }}>{doc.type}</div>
                <p className="text-xs text-[#0F172A] truncate flex-1" style={{ fontWeight: 500 }}>{doc.name}</p>
              </div>
            ))}
            <button
              onClick={() => setActiveSection("documents")}
              className="w-full flex items-center justify-center gap-2 mt-2 py-2 border border-dashed border-[#D1D5DB] rounded-xl text-xs text-[#9CA3AF] hover:border-[#0F172A] hover:text-[#0F172A] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Upload className="w-3.5 h-3.5" /> Upload Document
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function UserDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [agentOpen, setAgentOpen] = useState(false);
  const [user, setUserState] = useState<StoredUser | null>(() => getUser());

  const getInitials = (name?: string, email?: string) => {
    const source = name?.trim() || email?.split("@")[0] || "User";
    const parts = source.split(/\s+/).filter(Boolean);
    const initials = parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : source.slice(0, 2);
    return initials.toUpperCase();
  };

  useEffect(() => {
    // Capture token from Google OAuth redirect (?token=...)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      window.history.replaceState({}, "", "/dashboard");
    }
    const storedToken = getToken();
    if (!storedToken && !urlToken) {
      navigate("/login");
      return;
    }

    apiFetch("/auth/dashboard")
      .then((data) => {
        const authUser = data?.user ?? data?.data?.user ?? data?.data ?? null;
        if (authUser?.name || authUser?.email) {
          const nextUser = {
            name: authUser.name ?? authUser.email ?? "User",
            email: authUser.email ?? "",
            phoneNumber: authUser.phoneNumber ?? "",
          };
          setUser(nextUser);
          setUserState(nextUser);
        }
      })
      .catch(() => {
        const cached = getUser();
        if (cached) {
          setUserState(cached);
        }
      });
  }, []);

  const handleLogout = () => {
    clearToken();
    clearUser();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "reminders":
        return <RemindersSection />;
      case "cases":
        return <CaseTrackingSection />;
      case "fir":
        return <FIRSection />;
      case "tele":
        return <TeleconsultationSection />;
      case "documents":
        return <MyDocumentsSection />;
      case "settings":
        return <SettingsSection user={user} onUserUpdated={setUserState} />;
      case "help":
        return (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-[#0F172A] mb-6" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Help & Support</h2>
            <HelpSupportSection />
          </motion.div>
        );
      default:
        return <DashboardHome setActiveSection={setActiveSection} setAgentOpen={setAgentOpen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-60 bg-[#0F172A] flex flex-col flex-shrink-0 min-h-screen">
        <div className="px-5 h-16 flex items-center gap-2.5 border-b border-white/10">
          <div className="w-7 h-7 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em" }}>Nyaya Saathi</span>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); if (id === "agent") setAgentOpen(true); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
                activeSection === id ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80 hover:bg-white/8"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm" style={{ fontWeight: activeSection === id ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>{user?.name ?? user?.email ?? "User"}</p>
              <p className="text-white/40 text-[10px] truncate">{user?.email ?? ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all mt-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs" style={{ fontWeight: 500 }}>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-16 bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(15,23,42,0.05)" }}>
          <div>
            <h1 className="text-[#0F172A]" style={{ fontWeight: 700, fontSize: "1.0625rem" }}>Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
            <p className="text-[#9CA3AF] text-xs">Here's your legal overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors relative">
              <Bell className="w-4 h-4 text-[#374151]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>{getInitials(user?.name, user?.email)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      {agentOpen && <AgentModal onClose={() => { setAgentOpen(false); setActiveSection("dashboard"); }} />}
    </div>
  );
}
