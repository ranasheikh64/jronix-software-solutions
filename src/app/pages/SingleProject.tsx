import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, Code2, Star, Calendar, Users, Globe, ChevronRight, Home, Layers, AlertCircle } from "lucide-react";
import apiClient from "../../api/client";

const accentPalette = ["#3b82f6", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#f97316"];

function getAccent(category: string) {
  const map: Record<string, string> = {
    App: "#3b82f6", "Mobile app": "#a78bfa", Web: "#34d399", Design: "#f472b6",
  };
  return map[category] || accentPalette[0];
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#050b14" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(59,130,246,0.1)]" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#3b82f6] border-l-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
        <p className="text-sm" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Loading project…</p>
      </div>
    </div>
  );
}

function NotFoundState({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center" style={{ background: "#050b14" }}>
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-2"
        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
        <AlertCircle size={40} style={{ color: "#ef4444" }} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>Project Not Found</h1>
        <p className="text-base max-w-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
          The project you're looking for doesn't exist or may have been removed.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
        >
          <ArrowLeft size={15} /> Go Back
        </button>
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#3b82f6", fontFamily: "Inter, sans-serif" }}
        >
          <Home size={15} /> Go Home
        </button>
      </div>
    </div>
  );
}

export function SingleProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/projects/${id}`);
        setProject(res.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <LoadingState />;
  if (notFound || !project) return <NotFoundState onHome={() => navigate("/")} />;

  const accent = getAccent(project.category);
  const tech: string[] = project.techStack || project.tags || [];

  return (
    <div className="min-h-screen" style={{ background: "#050b14" }}>

      {/* Hero Section */}
      <div className="relative w-full" style={{ minHeight: 480 }}>
        {/* BG image or gradient */}
        {project.image ? (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,11,20,0.4) 0%, rgba(5,11,20,0.7) 60%, #050b14 100%)" }} />
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${accent}15 0%, transparent 60%)` }} />
            </div>
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}08 0%, rgba(5,11,20,0) 60%, rgba(5,11,20,0) 100%)` }} />
        )}

        {/* Top nav bar */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-16">
            <button onClick={() => navigate("/")} className="text-xs font-medium hover:text-white transition-colors" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>
              Home
            </button>
            <ChevronRight size={12} style={{ color: "#2a3a50" }} />
            <button onClick={() => navigate("/projects")} className="text-xs font-medium hover:text-white transition-colors" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>
              Projects
            </button>
            <ChevronRight size={12} style={{ color: "#2a3a50" }} />
            <span className="text-xs font-medium" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {project.title}
            </span>
          </motion.div>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft size={15} /> Back to Projects
          </motion.button>

          {/* Title area */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: `${accent}20`, border: `1px solid ${accent}45`, color: accent, fontFamily: "Inter, sans-serif" }}>
                {project.category || "Project"}
              </span>
              {project.isFeatured && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", fontFamily: "Inter, sans-serif" }}>
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 4rem)", color: "#e8f4ff", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 700 }}>
              {project.title}
            </h1>

            {/* Short description if available */}
            {project.shortDescription && (
              <p className="mt-4 text-base leading-relaxed max-w-2xl" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                {project.shortDescription}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {project.link && project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ background: accent, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 8px 30px ${accent}40` }}>
                  <ExternalLink size={15} /> Live Project
                </a>
              )}
              {project.githubLink && project.githubLink !== "#" && (
                <a href={project.githubLink} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", fontFamily: "Inter, sans-serif" }}>
                  <Github size={15} /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-28 mt-4 relative z-10">

        {/* Project Image (large) */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-12 relative"
            style={{ border: `1px solid ${accent}20`, boxShadow: `0 30px 80px ${accent}15` }}
          >
            <img src={project.image} alt={project.title} className="w-full object-cover max-h-[500px]" />
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${accent}15` }} />
          </motion.div>
        )}

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-2xl p-7"
              style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>About this Project</h2>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "#a8c4dd", fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.8 }}>
                {project.description || "No description provided."}
              </p>
            </motion.div>

            {/* Tech Stack */}
            {tech.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-2xl p-7"
                style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Technologies Used</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tech.map((tag: string) => (
                    <span key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{ background: `${accent}10`, border: `1px solid ${accent}25`, color: accent, fontFamily: "Inter, sans-serif" }}>
                      <Code2 size={13} />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery (if multiple images) */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="rounded-2xl p-7"
                style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Gallery</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.map((img: string, i: number) => (
                    <img key={i} src={img} alt={`Gallery ${i + 1}`} className="rounded-xl w-full object-cover"
                      style={{ border: "1px solid rgba(255,255,255,0.05)", maxHeight: 200 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-5">

            {/* Stats card */}
            {project.stats && Object.keys(project.stats).some(k => project.stats[k]) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="rounded-2xl p-6"
                style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Key Metrics</h2>
                </div>
                <div className="space-y-4">
                  {project.stats.users && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}>
                        <Users size={16} style={{ color: accent }} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif" }}>{project.stats.users}</div>
                        <div className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Users</div>
                      </div>
                    </div>
                  )}
                  {project.stats.rating && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                        <Star size={16} style={{ color: "#fbbf24" }} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif" }}>{project.stats.rating}</div>
                        <div className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Rating</div>
                      </div>
                    </div>
                  )}
                  {project.stats.year && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                        <Calendar size={16} style={{ color: "#10b981" }} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif" }}>{project.stats.year}</div>
                        <div className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Year</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
              className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Project Info</h2>
              </div>

              <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Category</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${accent}15`, color: accent, fontFamily: "Inter, sans-serif" }}>
                  {project.category || "Project"}
                </span>
              </div>

              {project.isFeatured && (
                <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Status</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#fbbf24" }}>
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                </div>
              )}

              {tech.length > 0 && (
                <div className="flex items-start justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="text-xs shrink-0" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Tech Stack</span>
                  <span className="text-xs text-right ml-3" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                    {tech.slice(0, 3).join(", ")}{tech.length > 3 ? ` +${tech.length - 3}` : ""}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="rounded-2xl p-6 space-y-3"
              style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>Links</h2>
              </div>

              {project.link && project.link !== "#" ? (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5 group"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                  <span className="flex items-center gap-2">
                    <Globe size={14} style={{ color: accent }} />
                    Live Project
                  </span>
                  <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                </a>
              ) : (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.06)" }}>
                  <Globe size={14} style={{ color: "#2a3a50" }} />
                  <span style={{ color: "#2a3a50", fontFamily: "Inter, sans-serif" }}>No live link available</span>
                </div>
              )}

              {project.githubLink && project.githubLink !== "#" && (
                <a href={project.githubLink} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5 group"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                  <span className="flex items-center gap-2">
                    <Github size={14} />
                    GitHub Repository
                  </span>
                  <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
