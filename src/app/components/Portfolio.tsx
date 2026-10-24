import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Star, 
  Layers, 
  Box, 
  Smartphone, 
  Globe, 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  LayoutGrid, 
  Monitor, 
  CheckCircle2, 
  X,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router";
import apiClient from "../../api/client";

// Normalize category names so variations like "WEB" and "Web" or "wordpress" merge seamlessly
export function normalizeCategory(cat?: string): string {
  if (!cat) return "Other";
  const c = cat.trim().toLowerCase();
  if (c.includes("web")) return "Web";
  if (c.includes("app") || c.includes("mobile")) return "Mobile App";
  if (c.includes("wordpress") || c.includes("cms")) return "WordPress & CMS";
  if (c.includes("design") || c.includes("ui") || c.includes("ux")) return "UI/UX Design";
  return cat.trim();
}

export const categoryMeta: Record<string, { color: string; glow: string; icon: any; label: string }> = {
  All: {
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.25)",
    icon: Sparkles,
    label: "All Works",
  },
  Web: {
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.25)",
    icon: Globe,
    label: "Web Platforms",
  },
  "Mobile App": {
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.25)",
    icon: Smartphone,
    label: "Mobile Apps",
  },
  "WordPress & CMS": {
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.25)",
    icon: Layers,
    label: "WordPress & CMS",
  },
  "UI/UX Design": {
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.25)",
    icon: Box,
    label: "UI/UX Design",
  },
  default: {
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.25)",
    icon: Code2,
    label: "Custom Software",
  },
};

export function getCategoryMeta(cat?: string) {
  const norm = normalizeCategory(cat);
  return categoryMeta[norm] || categoryMeta.default;
}

export function cleanLiveUrl(url?: string): string {
  if (!url) return "";
  let clean = url.replace(/^#+/, "").trim();
  if (!clean || clean === "#" || clean.toLowerCase() === "null") return "";
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "https://" + clean;
  }
  return clean;
}

function extractHostname(url?: string, fallback: string = "jronix.agency"): string {
  try {
    const cleaned = cleanLiveUrl(url);
    if (!cleaned) return fallback;
    const u = new URL(cleaned);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return fallback;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK VIEW MODAL
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectQuickViewModal({
  project,
  onClose,
  onViewCaseStudy
}: {
  project: any;
  onClose: () => void;
  onViewCaseStudy: (id: string) => void;
}) {
  const [selectedImg, setSelectedImg] = useState<string>(project?.image || "");
  const meta = getCategoryMeta(project?.category);
  const liveUrl = cleanLiveUrl(project?.link);
  const appStore = cleanLiveUrl(project?.appStoreLink);
  const playStore = cleanLiveUrl(project?.playStoreLink || (project?.link?.includes("play.google") ? project?.link : ""));
  const gallery = [project?.image, ...(project?.gallery || [])].filter(Boolean);

  useEffect(() => {
    if (project?.image) setSelectedImg(project.image);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl my-8"
        style={{
          background: "linear-gradient(135deg, rgba(8, 18, 36, 0.98) 0%, rgba(5, 12, 26, 0.98) 100%)",
          boxShadow: `0 25px 80px -15px ${meta.glow}, 0 0 0 1px rgba(255, 255, 255, 0.08)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${meta.color}15`,
                border: `1px solid ${meta.color}40`,
                color: meta.color,
                fontFamily: "Inter, sans-serif"
              }}
            >
              <meta.icon size={12} />
              {normalizeCategory(project.category)}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            )}
            {liveUrl && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live in Production
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Mockup Frame */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#070f1e] shadow-xl mb-6">
            {/* Browser top chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] text-[11px] text-slate-400 font-mono">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span className="truncate max-w-[200px] sm:max-w-[320px]">
                  {extractHostname(liveUrl, `${project.title.toLowerCase().replace(/\s+/g, "-")}.jronix.com`)}
                </span>
              </div>
              <div className="w-12" />
            </div>

            {/* Main Preview Image */}
            <div className="relative aspect-[16/9] sm:aspect-[16/8] bg-black/50 overflow-hidden flex items-center justify-center">
              {selectedImg ? (
                <img
                  src={selectedImg}
                  alt={project.title}
                  className="w-full h-full object-cover sm:object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Box size={40} />
                  <span className="text-xs">No preview image available</span>
                </div>
              )}
            </div>

            {/* Thumbnails if gallery exists */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 p-3 bg-black/30 border-t border-white/5 overflow-x-auto">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`shrink-0 w-16 h-10 rounded-lg overflow-hidden border transition-all ${
                      selectedImg === img ? "border-sky-400 scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Info */}
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {project.title}
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed text-[#8cb3d9] mb-6 whitespace-pre-line"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {project.description || "Custom enterprise software engineered with high performance, scalability, and seamless user experience."}
              </p>

              {/* Tech Stack */}
              {(project.techStack || project.tags || []).length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 font-mono">
                    Technologies & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || project.tags || []).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-200"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-1">
                Project Actions
              </h4>

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    color: "#ffffff",
                    fontFamily: "Inter, sans-serif"
                  }}
                >
                  <ExternalLink size={15} />
                  <span>Launch Live Site</span>
                </a>
              )}

              {playStore && (
                <a
                  href={playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Smartphone size={15} className="text-emerald-400" />
                  <span>Google Play Store</span>
                </a>
              )}

              {appStore && appStore !== "#" && (
                <a
                  href={appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Smartphone size={15} className="text-sky-400" />
                  <span>Apple App Store</span>
                </a>
              )}

              <button
                onClick={() => onViewCaseStudy(project._id || project.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span>Full Case Study</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectCard({
  project,
  index,
  onClick,
  onQuickView
}: {
  project: any;
  index: number;
  onClick: () => void;
  onQuickView?: (project: any) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  
  const meta = getCategoryMeta(project.category);
  const color = meta.color;
  const liveUrl = cleanLiveUrl(project.link);
  const normalizedCat = normalizeCategory(project.category);
  const isMobile = normalizedCat === "Mobile App";
  const hostname = extractHostname(liveUrl, `${project.title?.toLowerCase().replace(/\s+/g, "-")}.jronix.agency`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{
        background: "linear-gradient(180deg, rgba(10, 22, 44, 0.75) 0%, rgba(6, 14, 28, 0.85) 100%)",
        border: `1px solid ${hovered ? color + "60" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered 
          ? `0 24px 60px -12px ${color}30, 0 0 0 1px ${color}30` 
          : "0 6px 24px rgba(0,0,0,0.45)",
        backdropFilter: "blur(14px)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Top glowing beam */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
        }}
      />

      {/* Ambient background bloom */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none transition-opacity duration-500 blur-3xl"
        style={{
          background: color,
          opacity: hovered ? 0.18 : 0.04,
        }}
      />

      {/* ── Mockup Chrome Header ── */}
      <div 
        className="flex items-center justify-between px-3.5 py-2.5 select-none border-b"
        style={{
          background: "rgba(5, 11, 22, 0.95)",
          borderColor: "rgba(255, 255, 255, 0.06)"
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>

        {/* Address badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-400 font-mono max-w-[170px] truncate">
          {isMobile ? (
            <Smartphone size={10} style={{ color }} className="shrink-0" />
          ) : (
            <Globe size={10} style={{ color }} className="shrink-0" />
          )}
          <span className="truncate">{hostname}</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1">
          {liveUrl ? (
            <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          ) : (
            <span className="text-[9px] font-medium text-slate-500 bg-white/[0.03] px-1.5 py-0.5 rounded">
              Engineered
            </span>
          )}
        </div>
      </div>

      {/* ── Image & Hover Action Overlay ── */}
      <div className="relative overflow-hidden bg-slate-950/60" style={{ height: 210, flexShrink: 0 }}>
        {project.image ? (
          <>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 35%, rgba(6,14,28,0.92) 100%)",
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-900 to-slate-950">
            <Box size={36} style={{ color: color + "50" }} />
            <span className="text-xs text-slate-500 font-mono">Digital Solution</span>
          </div>
        )}

        {/* Category & Featured Badge (top left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm"
            style={{
              background: `${color}25`,
              border: `1px solid ${color}60`,
              color: color,
              fontFamily: "Inter, sans-serif"
            }}
          >
            <meta.icon size={11} />
            {normalizedCat}
          </span>
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        {/* Hover Quick Action Buttons (bottom overlay) */}
        <div 
          className={`absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(59,130,246,0.9))",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              <ExternalLink size={12} />
              <span>Live Demo</span>
            </a>
          ) : <div />}

          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(project);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/90 bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-105"
            >
              <Eye size={12} />
              <span>Quick Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Content & Tech Tags ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-lg font-bold text-white mb-2 leading-snug line-clamp-1 transition-colors duration-300"
          style={{ 
            fontFamily: "Rajdhani, sans-serif", 
            fontSize: "21px",
            color: hovered ? "#ffffff" : "#e8f4ff"
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-xs sm:text-sm leading-relaxed flex-1 line-clamp-2 mb-4"
          style={{ color: "#7fa5c8", fontFamily: "Inter, sans-serif" }}
        >
          {project.description || "Scalable digital architecture built with state-of-the-art standards and modern design."}
        </p>

        {/* Footer: Tech Stack + Arrow CTA */}
        <div
          className="flex items-center justify-between pt-3.5 mt-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-wrap gap-1.5 items-center">
            {(project.techStack || project.tags || []).slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md transition-colors"
                style={{
                  background: hovered ? `${color}15` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hovered ? color + "30" : "rgba(255,255,255,0.08)"}`,
                  color: hovered ? color : "#94a3b8",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
            {(project.techStack || project.tags || []).length > 3 && (
              <span className="text-[10px] text-slate-500 font-mono">
                +{(project.techStack || project.tags || []).length - 3}
              </span>
            )}
          </div>

          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-2"
            animate={{
              x: hovered ? 3 : 0,
              background: hovered ? color + "25" : "rgba(255,255,255,0.04)",
              borderColor: hovered ? color + "60" : "rgba(255,255,255,0.08)",
            }}
            style={{ border: "1px solid" }}
          >
            <ArrowUpRight size={14} style={{ color: hovered ? color : "#7aa8cc" }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPOTLIGHT HERO CARD (FLAGSHIP SHOWCASE)
// ─────────────────────────────────────────────────────────────────────────────
function ProjectSpotlightCard({
  project,
  onClick,
  onQuickView
}: {
  project: any;
  onClick: () => void;
  onQuickView: (project: any) => void;
}) {
  const meta = getCategoryMeta(project.category);
  const color = meta.color;
  const liveUrl = cleanLiveUrl(project.link);
  const hostname = extractHostname(liveUrl, `${project.title?.toLowerCase().replace(/\s+/g, "-")}.jronix.agency`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden border border-white/10 p-1 sm:p-2 mb-10 group"
      style={{
        background: "linear-gradient(135deg, rgba(14,28,54,0.85) 0%, rgba(6,14,30,0.95) 100%)",
        boxShadow: `0 20px 70px -15px ${color}20, 0 0 0 1px ${color}20`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: color }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-15"
        style={{ background: "#6366f1" }}
      />

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center p-5 sm:p-7 relative z-10">
        {/* Left: Device / Browser Mockup Preview */}
        <div className="lg:col-span-7">
          <div
            onClick={onClick}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#070f1e] shadow-2xl cursor-pointer group/mockup relative"
          >
            {/* Browser top chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] text-[11px] text-slate-300 font-mono">
                <Globe size={11} style={{ color }} />
                <span>{hostname}</span>
              </div>
              {liveUrl ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              ) : <div className="w-10" />}
            </div>

            {/* Main Preview Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/mockup:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <Box size={48} className="text-slate-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* View Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600/90 shadow-xl border border-white/20">
                  <Eye size={14} />
                  <span>Inspect Case Study</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Flagship Project Details */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#f59e0b",
                fontFamily: "Inter, sans-serif"
              }}
            >
              <Star size={12} fill="currentColor" />
              Flagship Showcase
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-slate-300 bg-white/[0.05] border border-white/10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {normalizeCategory(project.category)}
            </span>
          </div>

          <h3
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "Rajdhani, sans-serif", lineHeight: 1.15 }}
          >
            {project.title}
          </h3>

          <p
            className="text-sm leading-relaxed text-[#8cb3d9] mb-5 line-clamp-3 sm:line-clamp-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {project.description || "An enterprise-grade software delivery engineered with high reliability, dynamic interactivity, and modern design principles."}
          </p>

          {/* Tech stack */}
          {(project.techStack || project.tags || []).length > 0 && (
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(project.techStack || project.tags || []).map((t: string) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-slate-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-auto">
            <button
              onClick={onClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 8px 24px -4px rgba(59, 130, 246, 0.4)",
              }}
            >
              <span>Explore Case Study</span>
              <ArrowRight size={16} />
            </button>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/15 transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
              </a>
            )}

            <button
              onClick={() => onQuickView(project)}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Eye size={15} />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function ProjectSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/5 animate-pulse flex flex-col"
      style={{ background: "rgba(8,18,36,0.6)" }}
    >
      <div className="h-9 bg-white/[0.03] border-b border-white/5 px-3 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
      </div>
      <div className="h-[200px] bg-white/[0.04]" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-5 rounded-lg w-3/4 bg-white/[0.08] mb-2" />
          <div className="h-3 rounded-lg w-full bg-white/[0.04] mb-1.5" />
          <div className="h-3 rounded-lg w-2/3 bg-white/[0.04]" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/5">
          <div className="flex gap-1.5">
            <div className="h-5 w-14 rounded bg-white/[0.06]" />
            <div className="h-5 w-14 rounded bg-white/[0.06]" />
          </div>
          <div className="w-7 h-7 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PORTFOLIO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function Portfolio() {
  const [active, setActive] = useState("All");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProject, setQuickViewProject] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/projects');
        setProjectsData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Normalize categories across data and remove duplicates
  const { filters, filteredProjects, flagshipProject, companionProjects } = useMemo(() => {
    const categoriesSet = new Set<string>();
    projectsData.forEach(p => {
      if (p.category) {
        categoriesSet.add(normalizeCategory(p.category));
      }
    });

    const categoryList = ["All", ...Array.from(categoriesSet)];

    const filtered = active === "All"
      ? projectsData
      : projectsData.filter(p => normalizeCategory(p.category) === active);

    // Identify flagship project for spotlight view
    const flagship = filtered.find(p => p.isFeatured) || filtered[0] || null;
    const rest = flagship ? filtered.filter(p => (p._id || p.id) !== (flagship._id || flagship.id)) : filtered;

    return {
      filters: categoryList,
      filteredProjects: filtered,
      flagshipProject: flagship,
      companionProjects: rest,
    };
  }, [projectsData, active]);

  return (
    <section id="work" className="py-12 md:py-20 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div
        className="absolute right-0 top-1/4 w-[600px] h-[600px] pointer-events-none opacity-15 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-0 bottom-1/4 w-[500px] h-[500px] pointer-events-none opacity-15 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <div ref={headingRef} className="mb-10 md:mb-14 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase px-5 py-2 rounded-full"
              style={{
                color: "var(--primary-accent)",
                fontFamily: "Inter, sans-serif",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.25)",
                letterSpacing: "0.2em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Engineering Portfolio
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h2
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "#e8f4ff" }}>Featured </span>
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 35px rgba(59,130,246,0.45))",
                }}
              >
                Works & Solutions
              </span>
            </h2>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 mb-5 h-[2px] w-24 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)",
              transformOrigin: "center",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22 }}
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "#7fa5c8", fontFamily: "Inter, sans-serif" }}
          >
            High-impact web systems, mobile applications, and enterprise software engineered for scale, reliability, and real business results.
          </motion.p>
        </div>

        {/* ── Filter Bar & View Mode Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
            {filters.map((f) => {
              const meta = getCategoryMeta(f);
              const Icon = meta.icon;
              const count = f === "All"
                ? projectsData.length
                : projectsData.filter(p => normalizeCategory(p.category) === f).length;
              const isSelected = active === f;

              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                  style={{
                    color: isSelected ? "#ffffff" : "#7fa5c8",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {/* Sliding pill background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activePortfolioTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${meta.color}25, ${meta.color}10)`,
                        border: `1px solid ${meta.color}60`,
                        boxShadow: `0 0 24px ${meta.glow}`,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={14} style={{ color: isSelected ? meta.color : "#64748b" }} />
                    {f === "All" ? "All Works" : f}
                  </span>

                  <span
                    className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold"
                    style={{
                      background: isSelected ? `${meta.color}35` : "rgba(255,255,255,0.05)",
                      color: isSelected ? "#ffffff" : "#64748b",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Spotlight vs Grid) */}
          {filteredProjects.length > 1 && (
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 shrink-0">
              <button
                onClick={() => setViewMode("spotlight")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "spotlight"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Spotlight Showcase View"
              >
                <Monitor size={13} />
                <span>Spotlight</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* ── Content: Loading, Empty, or Projects ── */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <ProjectSkeleton key={i} />)}
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/5 bg-white/[0.01]"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <Sparkles size={32} style={{ color: "var(--primary-accent)" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              No Projects in {active}
            </h3>
            <p className="text-sm max-w-sm text-[#7aa8cc] mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              We are continually building and deploying new systems. Check back soon or browse all our work.
            </p>
            <button
              onClick={() => setActive("All")}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.4)",
                color: "var(--primary-accent)",
                fontFamily: "Inter, sans-serif"
              }}
            >
              Show All Works
            </button>
          </motion.div>
        ) : (
          <div>
            {/* Spotlight Showcase View */}
            {viewMode === "spotlight" && flagshipProject && (
              <ProjectSpotlightCard
                project={flagshipProject}
                onClick={() => navigate(`/project/${flagshipProject._id || flagshipProject.id}`)}
                onQuickView={(p) => setQuickViewProject(p)}
              />
            )}

            {/* Grid of Companion or All Projects */}
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {(viewMode === "spotlight" && flagshipProject ? companionProjects : filteredProjects).map((project, i) => (
                  <motion.div
                    key={project._id || project.id || i}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <ProjectCard
                      project={project}
                      index={i}
                      onClick={() => navigate(`/project/${project._id || project.id}`)}
                      onQuickView={(p) => setQuickViewProject(p)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ── View All Archive CTA ── */}
        {!loading && projectsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 md:mt-16"
          >
            <button
              onClick={() => navigate('/projects')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 shadow-xl"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(167,139,250,0.14))",
                border: "1px solid rgba(59,130,246,0.4)",
                color: "#e8f4ff",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 10px 30px -5px rgba(59,130,246,0.25)",
              }}
            >
              <span>Explore All Engineering Archives</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProject && (
          <ProjectQuickViewModal
            project={quickViewProject}
            onClose={() => setQuickViewProject(null)}
            onViewCaseStudy={(id) => {
              setQuickViewProject(null);
              navigate(`/project/${id}`);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
