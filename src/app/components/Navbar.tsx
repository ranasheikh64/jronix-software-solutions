import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Globe,
  Upload,
  Server,
  Palette,
  Brain,
  Layers,
  ArrowRight,
  Sparkles,
  Briefcase,
  Users,
  Send,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";
import { useJobs } from "../hooks/useJobs";

// ── Navigation Link Definitions ──────────────────────────────────────────────
interface NavItem {
  name: string;
  path: string;
  dropdownKey?: "work" | "services" | "career";
}

const navLinks: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/portfolio", dropdownKey: "work" },
  { name: "Services", path: "/services", dropdownKey: "services" },
  { name: "Career", path: "/career", dropdownKey: "career" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" }
];

// ── Services Dropdown Data ───────────────────────────────────────────────────
const servicesItems = [
  {
    title: "Flutter App Development",
    slug: "flutter-app-development",
    desc: "Cross-platform iOS & Android mobile apps with native speed",
    icon: Smartphone,
    color: "#a78bfa",
    tag: "Cross-Platform"
  },
  {
    title: "WordPress Website Development",
    slug: "wordpress-website-development",
    desc: "Bespoke themes, high-speed CMS & WooCommerce stores",
    icon: Globe,
    color: "#38bdf8",
    tag: "CMS & E-Com"
  },
  {
    title: "App Publishing",
    slug: "app-publishing",
    desc: "Guaranteed App Store & Google Play deployment & ASO",
    icon: Upload,
    color: "#34d399",
    tag: "100% Approval"
  },
  {
    title: "Backend & API Development",
    slug: "backend-api-development",
    desc: "Scalable REST/GraphQL APIs, microservices & databases",
    icon: Server,
    color: "#fbbf24",
    tag: "99.9% Uptime"
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    desc: "Pixel-perfect Figma designs, user journeys & design systems",
    icon: Palette,
    color: "#f472b6",
    tag: "Figma Pro"
  },
  {
    title: "AI Integration",
    slug: "ai-integration",
    desc: "OpenAI, LLMs, smart bots & custom ML automation",
    icon: Brain,
    color: "#22d3ee",
    tag: "Next-Gen AI"
  }
];

// ── Work Dropdown Categories ─────────────────────────────────────────────────
const workCategories = [
  {
    title: "Mobile Apps",
    categoryParam: "Mobile App",
    desc: "Flutter, iOS & Android applications built for scale",
    icon: Smartphone,
    color: "#a78bfa",
    count: "15+ Apps",
    tags: ["iOS", "Android", "Flutter"]
  },
  {
    title: "Web Platforms",
    categoryParam: "Web",
    desc: "Modern SaaS platforms, full-stack portals & dashboards",
    icon: Globe,
    color: "#34d399",
    count: "25+ Platforms",
    tags: ["React", "Next.js", "Cloud"]
  },
  {
    title: "WordPress & CMS",
    categoryParam: "WordPress & CMS",
    desc: "Custom WordPress, WooCommerce & corporate websites",
    icon: Layers,
    color: "#60a5fa",
    count: "30+ Sites",
    tags: ["Custom Theme", "ACF", "SEO"]
  },
  {
    title: "UI/UX Design",
    categoryParam: "UI/UX Design",
    desc: "Interactive prototypes, design systems & web mockups",
    icon: Palette,
    color: "#f472b6",
    count: "40+ Concepts",
    tags: ["Figma", "User Flow", "Wireframe"]
  }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading: jobsLoading } = useJobs();

  // Scroll detection for navbar background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Dropdown hover enter & leave debouncing
  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const closeDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    closeDropdown();
    const targetId = id.toLowerCase();

    const doScroll = () => {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 75;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 250);
    } else {
      setTimeout(doScroll, 80);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setExpandedMobile(null);
  };

  const toggleMobileAccordion = (key: string) => {
    setExpandedMobile(prev => (prev === key ? null : key));
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full"
      style={{
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        background: scrolled ? "rgba(5, 12, 26, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59, 130, 246, 0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.3)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <ImageWithFallback
            src={logoImg}
            alt="Jronix Software Solutions logo"
            className="w-10 h-10 object-contain rounded-full border border-blue-500/20"
          />
          <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff", letterSpacing: "0.05em" }}>
            Jronix
          </span>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1.5 bg-[rgba(255,255,255,0.02)] p-1.5 rounded-full border border-[rgba(255,255,255,0.05)] shadow-inner"
          onMouseLeave={handleMouseLeave}
        >
          {navLinks.map((link) => {
            const hasDropdown = Boolean(link.dropdownKey);
            const isDropdownOpen = activeDropdown === link.dropdownKey;

            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  if (link.dropdownKey) {
                    handleMouseEnter(link.dropdownKey);
                  } else {
                    closeDropdown();
                  }
                }}
              >
                <Link
                  to={link.path}
                  onClick={() => closeDropdown()}
                  className="relative text-sm px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 group hover:bg-[rgba(59,130,246,0.1)]"
                  style={{
                    color: isDropdownOpen ? "#ffffff" : "#7aa8cc",
                    fontFamily: "Inter, sans-serif"
                  }}
                >
                  <span className="group-hover:text-white transition-colors relative z-10 font-medium">
                    {link.name}
                  </span>

                  {hasDropdown && (
                    <ChevronDown
                      size={13}
                      className={`relative z-10 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180 text-blue-400" : "text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-blue-300"
                      }`}
                    />
                  )}

                  <span
                    className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                      isDropdownOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      boxShadow: "inset 0 0 10px rgba(59,130,246,0.2)",
                      background: isDropdownOpen ? "rgba(59,130,246,0.12)" : "transparent"
                    }}
                  />
                </Link>

                {/* ── DESKTOP DROPDOWNS ── */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 pointer-events-auto"
                      onMouseEnter={() => link.dropdownKey && handleMouseEnter(link.dropdownKey)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* 1. SERVICES DROPDOWN */}
                      {link.dropdownKey === "services" && (
                        <div
                          className="w-[660px] rounded-2xl overflow-hidden shadow-2xl relative"
                          style={{
                            background: "rgba(6, 14, 28, 0.96)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(59, 130, 246, 0.12)"
                          }}
                        >
                          {/* Top Glow Line */}
                          <div
                            className="h-[2px] w-full"
                            style={{ background: "linear-gradient(90deg, transparent, #3b82f6, #a78bfa, transparent)" }}
                          />

                          {/* Header Bar */}
                          <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                              <span
                                className="text-[11px] font-bold tracking-[0.18em] uppercase text-blue-400"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                Specialized Services
                              </span>
                            </div>
                            <span
                              className="text-xs text-slate-400 font-mono"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              6 Core Offerings
                            </span>
                          </div>

                          {/* 2-Column Services Grid */}
                          <div className="p-4 grid grid-cols-2 gap-2.5">
                            {servicesItems.map((srv) => {
                              const Icon = srv.icon;
                              return (
                                <Link
                                  key={srv.slug}
                                  to={`/service/${srv.slug}`}
                                  onClick={closeDropdown}
                                  className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-blue-500/[0.08] border border-transparent hover:border-blue-500/25"
                                >
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                      background: `${srv.color}15`,
                                      border: `1px solid ${srv.color}35`,
                                      boxShadow: `0 0 12px ${srv.color}20`
                                    }}
                                  >
                                    <Icon size={18} style={{ color: srv.color }} />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                      <h4
                                        className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight"
                                        style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "15.5px" }}
                                      >
                                        {srv.title}
                                      </h4>
                                      <span
                                        className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 opacity-90"
                                        style={{
                                          background: `${srv.color}20`,
                                          color: srv.color
                                        }}
                                      >
                                        {srv.tag}
                                      </span>
                                    </div>
                                    <p
                                      className="text-[11px] text-[#7aa8cc] leading-relaxed line-clamp-2"
                                      style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                      {srv.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="px-6 py-3 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-[#7aa8cc]" style={{ fontFamily: "Inter, sans-serif" }}>
                              Need custom cloud or AI architecture?
                            </span>
                            <Link
                              to="/services"
                              onClick={closeDropdown}
                              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              <span>Explore All Services</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* 2. WORK / PORTFOLIO DROPDOWN */}
                      {link.dropdownKey === "work" && (
                        <div
                          className="w-[580px] rounded-2xl overflow-hidden shadow-2xl relative"
                          style={{
                            background: "rgba(6, 14, 28, 0.96)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(59, 130, 246, 0.12)"
                          }}
                        >
                          {/* Top Glow Line */}
                          <div
                            className="h-[2px] w-full"
                            style={{ background: "linear-gradient(90deg, transparent, #38bdf8, #34d399, transparent)" }}
                          />

                          {/* Header Bar */}
                          <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span
                                className="text-[11px] font-bold tracking-[0.18em] uppercase text-emerald-400"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                Portfolio & Solutions
                              </span>
                            </div>
                            <span
                              className="text-xs text-slate-400 font-mono"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              Filter by Category
                            </span>
                          </div>

                          {/* Categories Grid */}
                          <div className="p-4 grid grid-cols-2 gap-3">
                            {workCategories.map((cat) => {
                              const Icon = cat.icon;
                              return (
                                <Link
                                  key={cat.title}
                                  to={`/projects?category=${encodeURIComponent(cat.categoryParam)}`}
                                  onClick={closeDropdown}
                                  className="group flex flex-col justify-between p-3.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] border border-white/[0.05] hover:border-blue-500/30"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.01)"
                                  }}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2.5">
                                      <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                          background: `${cat.color}15`,
                                          border: `1px solid ${cat.color}35`
                                        }}
                                      >
                                        <Icon size={18} style={{ color: cat.color }} />
                                      </div>
                                      <span
                                        className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                                        style={{
                                          background: `${cat.color}18`,
                                          color: cat.color
                                        }}
                                      >
                                        {cat.count}
                                      </span>
                                    </div>

                                    <h4
                                      className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mb-1"
                                      style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "16px" }}
                                    >
                                      {cat.title}
                                    </h4>
                                    <p
                                      className="text-[11px] text-[#7aa8cc] leading-relaxed mb-3 line-clamp-2"
                                      style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                      {cat.desc}
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[11px] font-semibold text-blue-400 group-hover:text-blue-300">
                                    <span>Browse Projects</span>
                                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="px-6 py-3 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-[#7aa8cc] flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                              <Sparkles size={13} className="text-amber-400" />
                              50+ high-impact client systems delivered
                            </span>
                            <Link
                              to="/projects"
                              onClick={closeDropdown}
                              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              <span>Explore All Works</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      )}

                      {/* 3. CAREER DROPDOWN */}
                      {link.dropdownKey === "career" && (
                        <div
                          className="w-[460px] rounded-2xl overflow-hidden shadow-2xl relative"
                          style={{
                            background: "rgba(6, 14, 28, 0.96)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(167, 139, 250, 0.25)",
                            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(167, 139, 250, 0.15)"
                          }}
                        >
                          {/* Top Glow Line */}
                          <div
                            className="h-[2px] w-full"
                            style={{ background: "linear-gradient(90deg, transparent, #a78bfa, #f472b6, transparent)" }}
                          />

                          {/* Header Bar */}
                          <div className="px-6 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                              <span
                                className="text-[11px] font-bold tracking-[0.18em] uppercase text-purple-400"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                Join Our Team
                              </span>
                            </div>
                            <span
                              className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold"
                              style={{
                                background: jobs && jobs.length > 0 ? "rgba(52, 211, 153, 0.15)" : "rgba(59, 130, 246, 0.15)",
                                color: jobs && jobs.length > 0 ? "#34d399" : "#60a5fa"
                              }}
                            >
                              {jobs && jobs.length > 0 ? `${jobs.length} Openings` : "Talent Pool"}
                            </span>
                          </div>

                          <div className="p-4">
                            {jobsLoading ? (
                              <div className="py-8 flex flex-col items-center justify-center gap-2">
                                <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs text-slate-400">Checking opportunities...</span>
                              </div>
                            ) : jobs && jobs.length > 0 ? (
                              // ACTIVE JOBS LIST
                              <div className="space-y-2">
                                {jobs.slice(0, 3).map((job: any) => (
                                  <Link
                                    key={job._id || job.title}
                                    to="/open-positions"
                                    onClick={closeDropdown}
                                    className="group flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-purple-500/[0.08] border border-white/[0.05] hover:border-purple-500/25"
                                  >
                                    <div className="min-w-0 pr-3">
                                      <h4
                                        className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate"
                                        style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "15px" }}
                                      >
                                        {job.title}
                                      </h4>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-slate-400 font-medium">
                                          {job.type || "Full Time"}
                                        </span>
                                        <span className="text-[10px] text-slate-600">•</span>
                                        <span className="text-[10px] text-purple-400 font-medium">
                                          {job.location || "Remote"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 shrink-0">
                                      <span>Apply</span>
                                      <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              // EMPTY STATE (When no current job openings)
                              <div
                                className="p-4 rounded-xl text-center relative overflow-hidden"
                                style={{
                                  background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.08) 0%, rgba(6, 14, 28, 0.5) 100%)",
                                  border: "1px solid rgba(167, 139, 250, 0.15)"
                                }}
                              >
                                <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center mb-2.5 shadow-lg"
                                  style={{
                                    background: "rgba(167, 139, 250, 0.12)",
                                    border: "1px solid rgba(167, 139, 250, 0.25)",
                                    color: "#a78bfa"
                                  }}
                                >
                                  <Briefcase size={20} />
                                </div>

                                <h4
                                  className="text-sm font-bold text-white mb-1"
                                  style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "16px" }}
                                >
                                  No Open Positions Right Now
                                </h4>

                                <p
                                  className="text-[11px] text-[#7aa8cc] leading-relaxed max-w-xs mx-auto mb-3"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                  We are not actively hiring right now, but our talent pool is always open. Drop your CV and we will reach out as soon as a match opens!
                                </p>

                                <div className="flex flex-wrap justify-center gap-1.5 mb-3.5">
                                  {["🌍 100% Remote", "⚡ Cutting-Edge Tech", "📈 Growth Culture"].map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-300 font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <Link
                                  to="/contact"
                                  onClick={closeDropdown}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-95"
                                  style={{
                                    background: "linear-gradient(135deg, #a78bfa, #818cf8)",
                                    fontFamily: "Inter, sans-serif"
                                  }}
                                >
                                  <Send size={12} />
                                  <span>Send Open Application</span>
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="px-6 py-3 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-[#7aa8cc]" style={{ fontFamily: "Inter, sans-serif" }}>
                              Want to learn about life at Jronix?
                            </span>
                            <Link
                              to="/career"
                              onClick={closeDropdown}
                              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              <span>Explore Career Perks</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.4)", "0 0 0px rgba(59,130,246,0)"] }}
            transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
            onClick={() => scrollTo("contact")}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group shadow-lg"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", fontFamily: "Inter, sans-serif" }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Get a Quote</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }} />
          </motion.button>

          <button
            className="lg:hidden p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]"
            style={{ color: "#7aa8cc" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE ACCORDION MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(5, 12, 26, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(59, 130, 246, 0.2)"
            }}
          >
            <div className="px-5 py-4 max-h-[80vh] overflow-y-auto flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const hasDropdown = Boolean(link.dropdownKey);
                const isExpanded = expandedMobile === link.dropdownKey;

                if (!hasDropdown) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="w-full text-left py-3 px-3 border-b text-sm font-medium transition-all flex items-center justify-between active:bg-blue-500/15 active:text-white rounded-xl"
                      style={{
                        color: "#a8c4dd",
                        borderColor: "rgba(59, 130, 246, 0.12)",
                        fontFamily: "Inter, sans-serif"
                      }}
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={15} className="opacity-40" />
                    </Link>
                  );
                }

                return (
                  <div key={link.name} className="border-b border-blue-500/10 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.path}
                        onClick={closeMobileMenu}
                        className="py-3 px-3 text-sm font-medium text-[#a8c4dd] hover:text-white flex-1"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {link.name}
                      </Link>

                      <button
                        onClick={() => link.dropdownKey && toggleMobileAccordion(link.dropdownKey)}
                        className="p-3 text-blue-400 hover:text-white focus:outline-none"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-300" : "text-slate-400"}`}
                        />
                      </button>
                    </div>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white/[0.02] px-3 pb-3 pt-1 rounded-b-xl space-y-1.5"
                        >
                          {/* Services sub-items */}
                          {link.dropdownKey === "services" && (
                            <>
                              {servicesItems.map((srv) => (
                                <Link
                                  key={srv.slug}
                                  to={`/service/${srv.slug}`}
                                  onClick={closeMobileMenu}
                                  className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs text-[#8cb0ce] hover:text-white hover:bg-blue-500/10 transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: srv.color }} />
                                  <span className="flex-1 truncate">{srv.title}</span>
                                  <ChevronRight size={12} className="opacity-40" />
                                </Link>
                              ))}
                              <Link
                                to="/services"
                                onClick={closeMobileMenu}
                                className="block text-center py-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                              >
                                View All Services →
                              </Link>
                            </>
                          )}

                          {/* Work sub-items */}
                          {link.dropdownKey === "work" && (
                            <>
                              {workCategories.map((cat) => (
                                <Link
                                  key={cat.title}
                                  to={`/projects?category=${encodeURIComponent(cat.categoryParam)}`}
                                  onClick={closeMobileMenu}
                                  className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs text-[#8cb0ce] hover:text-white hover:bg-blue-500/10 transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                                    <span>{cat.title}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400">{cat.count}</span>
                                </Link>
                              ))}
                              <Link
                                to="/projects"
                                onClick={closeMobileMenu}
                                className="block text-center py-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
                              >
                                View All Projects →
                              </Link>
                            </>
                          )}

                          {/* Career sub-items */}
                          {link.dropdownKey === "career" && (
                            <>
                              {jobs && jobs.length > 0 ? (
                                jobs.slice(0, 3).map((job: any) => (
                                  <Link
                                    key={job._id || job.title}
                                    to="/open-positions"
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs text-[#8cb0ce] hover:text-white hover:bg-purple-500/10 transition-colors"
                                  >
                                    <span className="truncate">{job.title}</span>
                                    <span className="text-[10px] text-purple-400 font-medium shrink-0">
                                      {job.location || "Remote"}
                                    </span>
                                  </Link>
                                ))
                              ) : (
                                <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/15 text-center">
                                  <p className="text-xs text-slate-300 mb-2">No active openings right now</p>
                                  <Link
                                    to="/contact"
                                    onClick={closeMobileMenu}
                                    className="inline-block px-3 py-1.5 rounded-md text-[11px] font-semibold text-white bg-purple-600 hover:bg-purple-500"
                                  >
                                    Submit Open CV
                                  </Link>
                                </div>
                              )}
                              <Link
                                to="/career"
                                onClick={closeMobileMenu}
                                className="block text-center py-2 text-xs font-semibold text-purple-400 hover:text-purple-300"
                              >
                                Explore Career Perks →
                              </Link>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="mt-3 block w-full py-3 rounded-xl text-sm font-bold text-center transition-transform active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                  color: "#fff",
                  fontFamily: "Inter, sans-serif"
                }}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
