import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, Code2, Star, Calendar, Users } from "lucide-react";
import apiClient from "../../api/client";

export function SingleProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get(`/projects/${id}`);
        setProject(res.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#010515" }}>
        <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#010515" }}>
        <p className="text-slate-400 text-lg">Project not found.</p>
        <button onClick={() => navigate("/")} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Go Home
        </button>
      </div>
    );
  }

  const accents = ["#6366f1", "#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];
  const accent = accents[0];

  return (
    <div className="min-h-screen" style={{ background: "#010515" }}>
      {/* Hero image */}
      {project.image && (
        <div className="relative w-full" style={{ height: "420px" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(1,5,21,0.3) 0%, rgba(1,5,21,0.85) 80%, #010515 100%)" }}
          />
          {/* Back button on image */}
          <div className="absolute top-6 left-6">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", fontFamily: "Inter, sans-serif" }}
            >
              <ArrowLeft size={15} />
              Back
            </motion.button>
          </div>
        </div>
      )}

      {/* If no image, show back button at top */}
      {!project.image && (
        <div className="max-w-4xl mx-auto px-6 pt-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </motion.button>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24" style={{ marginTop: project.image ? "-80px" : 0, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent, fontFamily: "Inter, sans-serif" }}
            >
              {project.category || project.typeBadge || "Project"}
            </span>
            {project.isFeatured && (
              <span
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full"
                style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24", fontFamily: "Inter, sans-serif" }}
              >
                <Star size={10} fill="currentColor" /> Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h1>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: accent, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 4px 20px ${accent}40` }}
              >
                <ExternalLink size={15} />
                Live Project
              </a>
            )}
            {project.githubLink && project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontFamily: "Inter, sans-serif" }}
              >
                <Github size={15} />
                GitHub
              </a>
            )}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Description */}
            <div className="md:col-span-2 space-y-8">
              <div
                className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  About this Project
                </h2>
                <p className="text-slate-300 text-[15px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "Inter, sans-serif" }}>
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              {(project.techStack || []).length > 0 && (
                <div
                  className="rounded-2xl p-7"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", fontFamily: "Inter, sans-serif" }}
                      >
                        <Code2 size={13} style={{ color: "#64748b" }} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar stats */}
            <div className="space-y-4">
              {/* Stats */}
              {project.stats && Object.keys(project.stats).some(k => project.stats[k]) && (
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                    Key Stats
                  </h2>
                  <div className="space-y-4">
                    {project.stats.users && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}>
                          <Users size={14} style={{ color: accent }} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{project.stats.users}</div>
                          <div className="text-slate-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Users</div>
                        </div>
                      </div>
                    )}
                    {project.stats.rating && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                          <Star size={14} style={{ color: "#fbbf24" }} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{project.stats.rating}</div>
                          <div className="text-slate-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Rating</div>
                        </div>
                      </div>
                    )}
                    {project.stats.year && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                          <Calendar size={14} style={{ color: "#10b981" }} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{project.stats.year}</div>
                          <div className="text-slate-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Year</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links card */}
              <div
                className="rounded-2xl p-6 space-y-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  Links
                </h2>
                {project.link && project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8", fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink size={14} style={{ color: accent }} />
                      Live Project
                    </span>
                    <ArrowLeft size={14} className="rotate-180 opacity-40" />
                  </a>
                ) : (
                  <p className="text-xs text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>No live link available</p>
                )}
                {project.githubLink && project.githubLink !== "#" && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8", fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      <Github size={14} />
                      GitHub Repo
                    </span>
                    <ArrowLeft size={14} className="rotate-180 opacity-40" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
