import type { ElementType } from "react";
import {
  BarChart3,
  Bell,
  Briefcase,
  CheckCircle2,
  FileWarning,
  Globe2,
  Heart,
  Languages,
  Scale,
  ShieldQuestion,
  Target,
  User,
  Zap,
} from "lucide-react";

export const appName = "Nyaya Saathi";

export const navLinks = [
  { label: "Features", id: "features" },
  { label: "Dashboard", id: "dashboard" },
  { label: "How It Works", id: "how-it-works" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export const authOptions = {
  login: [
    { icon: User, title: "Login as User", subtitle: "Access your legal dashboard", route: "/login" },
    { icon: Briefcase, title: "Login as Lawyer", subtitle: "Access your lawyer portal", route: "/login-lawyer" },
  ],
  signup: [
    { icon: User, title: "Sign up as User", subtitle: "Start your legal journey", route: "/signup" },
    { icon: Briefcase, title: "Sign up as Lawyer", subtitle: "Register your legal profile", route: "/signup-lawyer" },
  ],
} as const;

export const heroCopy = {
  titleStart: "Justice Made Simple",
  titleEmphasis: "for Every",
  titleEnd: "Citizen",
  description:
    "Understand legal rights, decode complex documents, track cases, and receive AI-powered legal guidance in your preferred Indian language.",
  primaryAction: "Try AI Assistant",
  secondaryAction: "Explore Features",
  highlights: [
    "No Legal Expertise Required",
    "15+ Indian Languages",
    "100% Free for Citizens",
  ],
  imageAlt: "Scales of justice and gavel representing Indian legal system",
};

export const problemCards = [
  {
    icon: FileWarning,
    title: "Complex Legal Language",
    description:
      "Legal documents are written in dense, archaic language that ordinary citizens find impossible to understand.",
    color: "bg-red-50 text-red-600 border-red-100",
  },
  {
    icon: ShieldQuestion,
    title: "FIR Understanding",
    description:
      "Citizens don't know what an FIR means, what rights they have, or what legal steps to take next.",
    color: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    icon: Bell,
    title: "Rights Awareness Gap",
    description:
      "Most citizens are unaware of their fundamental rights and legal protections under Indian law.",
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
  },
  {
    icon: BarChart3,
    title: "Case Tracking Challenges",
    description:
      "Keeping track of hearing dates, legal milestones, and court proceedings is confusing and error-prone.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: Scale,
    title: "Document Complexity",
    description:
      "Legal documents, petitions, and court orders are overwhelming without professional legal assistance.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Languages,
    title: "Language Barriers",
    description:
      "Legal services are predominantly in English, excluding millions of citizens who speak regional languages.",
    color: "bg-green-50 text-green-600 border-green-100",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    icon: User,
    title: "Upload Document or Ask Question",
    description:
      "Upload your legal document (FIR, court order, agreement) or simply type your legal question in any Indian language.",
    detail: "Supports PDF, DOC, images, and text input",
  },
  {
    step: "02",
    icon: Zap,
    title: "AI Analyzes Information",
    description:
      "Our advanced AI engine processes your document or question, cross-referencing Indian law databases, case precedents, and legal guidelines.",
    detail: "Powered by LLM trained on Indian legal corpus",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Receive Simplified Guidance",
    description:
      "Get clear, jargon-free explanations of your legal situation with actionable next steps in your preferred language.",
    detail: "Available in 15+ Indian languages",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Track Cases and Documents",
    description:
      "Add your case details to the dashboard for ongoing monitoring of hearing dates, document submissions, and case progress.",
    detail: "Real-time court updates where available",
  },
  {
    step: "05",
    icon: Bell,
    title: "Receive Updates and Reminders",
    description:
      "Stay on top of every legal deadline with intelligent reminders, pre-hearing checklists, and regular AI-generated progress updates.",
    detail: "Via SMS, email, and in-app notifications",
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "First-time FIR Complainant",
    location: "Jaipur, Rajasthan",
    avatar: "PS",
    rating: 5,
    review:
      "I received a threatening legal notice and had no idea what to do. Nyaya Saathi explained it in simple Hindi and told me exactly what steps to take. I felt empowered instead of scared.",
    type: "Citizen",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    name: "Arjun Menon",
    role: "Law Student",
    location: "Ernakulam, Kerala",
    avatar: "AM",
    rating: 5,
    review:
      "As a law student, I use Nyaya Saathi to simplify complex judgments for my research. The AI explanations are accurate, contextual, and available in Malayalam. Outstanding platform.",
    type: "Student",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    name: "Fatima Ansari",
    role: "Legal Aid Coordinator",
    location: "Lucknow, Uttar Pradesh",
    avatar: "FA",
    rating: 5,
    review:
      "Our NGO uses Nyaya Saathi to assist rural clients who can't afford lawyers. The multilingual support and rights education have transformed how we deliver legal aid services.",
    type: "NGO",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
];

export const aboutValues = [
  {
    icon: Target,
    title: "Citizen-First Design",
    description: "Every feature is built around the needs of ordinary citizens, not legal experts.",
  },
  {
    icon: Heart,
    title: "Inclusive Access",
    description: "We believe justice is a right, not a privilege. Our platform ensures no one is left behind.",
  },
  {
    icon: Zap,
    title: "AI-Powered Accuracy",
    description: "Our AI is trained specifically on Indian law to provide accurate, contextual guidance.",
  },
  {
    icon: Scale,
    title: "Transparent & Trustworthy",
    description: "We clearly distinguish AI guidance from professional legal advice, always.",
  },
];

export const footerSections = {
  Platform: [
    { label: "Features" },
    { label: "Dashboard" },
    { label: "AI Assistant" },
    { label: "Case Tracking" },
  ],
  Resources: [
    { label: "Legal Rights Guide" },
    { label: "FIR Handbook" },
    { label: "FAQ" },
    { label: "Documentation" },
  ],
  Company: [
    { label: "About Us" },
    { label: "Contact" },
    { label: "Careers" },
    { label: "Press Kit" },
  ],
  Legal: [
    { label: "Privacy Policy" },
    { label: "Terms of Service" },
    { label: "Disclaimer" },
    { label: "Cookie Policy" },
  ],
} as const;

export const supportedBy = ["Ministry of Law & Justice", "NALSA", "Digital India Initiative"];

export const footerCopy = {
  ctaTitle: "Start Your Journey Towards Legal Awareness !",
  ctaButton: "Get Started Free",
  brandDescription:
    "AI-powered smart legal assistance platform making justice accessible for every Indian citizen.",
  email: "help@nyayasaathi.gov.in",
  phone: "1800-XXX-XXXX (Toll Free)",
  location: "New Delhi, India",
  disclaimer:
    "Nyaya Saathi provides general legal information and AI-generated guidance for educational purposes only. The information provided does not constitute legal advice. For specific legal matters, please consult a qualified legal professional. This platform is not affiliated with any court or government body.",
  copyright: "© 2026 Nyaya Saathi. All rights reserved. Built for Bharat 🇮🇳",
  supportLine: "Made with ❤️ for Indian Citizens",
  systemStatus: "All systems operational",
};

export const authUrls = {
  google: import.meta.env.VITE_GOOGLE_AUTH_URL ?? "/api/auth/google",
  aiChat: import.meta.env.VITE_AI_CHAT_URL ?? "http://localhost:5000/chat",
};

export const authCopy = {
  brand: appName,
  backButton: "Back to Home",
  login: {
    headline: "Welcome back",
    subheadline: "Sign in to your Nyaya Saathi account",
    googleButton: "Continue with Google",
    divider: "or sign in with email",
    submit: "Sign In",
    submitLoading: "Signing in...",
    footerPrompt: "Don't have an account?",
    footerAction: "Sign up for free",
  },
  signup: {
    headline: "Create your account",
    subheadline: "Start your journey towards legal awareness",
    googleButton: "Sign up with Google",
    divider: "or sign up with email",
    submit: "Create Account",
    submitLoading: "Creating account...",
    footerPrompt: "Already have an account?",
    footerAction: "Sign in",
  },
  lawyerLogin: {
    badge: "Lawyer Portal",
    headline: "Welcome back, Counsellor",
    subheadline: "Sign in to your lawyer account",
    submit: "Sign In as Lawyer",
    footerPromptOne: "Not a lawyer?",
    footerActionOne: "Login as User",
    footerPromptTwo: "New lawyer?",
    footerActionTwo: "Register your profile",
  },
  lawyerSignup: {
    badge: "Lawyer Portal",
    headline: "Register as a Lawyer",
    subheadline: "Join Nyaya Saathi and connect with clients who need your expertise",
    submit: "Register as Lawyer",
    footerPromptOne: "Already registered?",
    footerActionOne: "Sign in as Lawyer",
    footerPromptTwo: "Not a lawyer?",
    footerActionTwo: "Sign up as User",
  },
} as const;

export const dashboardCopy = {
  agentWelcome:
    "Namaste! I'm your Nyaya Saathi AI Agent. I'm here to help you understand your legal rights, decode documents, or guide you through any legal situation. How can I assist you today?",
  agentTitle: `${appName} AI Agent`,
  onlineStatus: "Online — Ready to assist",
  supportEmail: "help@nyayasaathi.gov.in",
  supportHelpline: "1800-XXX-XXXX · Toll Free",
  firOptions: {
    write: {
      id: "write",
      label: "Write an FIR",
      desc: "Draft and file a First Information Report with guided AI assistance",
    },
    complaint: {
      id: "complaint",
      label: "Complaint regarding FIR",
      desc: "File a complaint about an existing FIR — delayed registration, false FIR, or improper investigation",
    },
  },
  faqs: {
    legalGuidance:
      "No. Nyaya Saathi provides general legal information for awareness purposes only. For specific legal matters, always consult a qualified lawyer.",
  },
} as const;
