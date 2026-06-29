import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Code2, X, Globe, Star, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import apiClient from "../../api/client";

export function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  // Subtle accent for each card (muted tones)
  const accents = ["#6366f1", "#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];
  const accent = accents[index % accents.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group h-full cursor-pointer"
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl flex flex-col overflow-hidden border transition-all duration-300"
        style={{
          background: hovered ? "rgba(15, 23, 42, 0.95)" : "rgba(15, 23, 42, 0.7)",
          borderColor: hovered ? `${accent}40` : "rgba(255,255,255,0.06)",
          boxShadow: hovered ? `0 20px 50px -10px ${accent}18, 0 0 0 1px ${accent}20` : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Image */}
        {project.image && (
          <div className="relative w-full overflow-hidden" style={{ height: "170px", flexShrink: 0 }}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.85) 100%)" }} />
          </div>
        )}

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transformOrigin: "center" }}
        />

        {/* Left accent bar */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg, transparent, ${accent}60, transparent)` }} />

        <div className={`flex flex-col ${project.image ? "px-5 py-3" : "px-7 py-6"} flex-1 overflow-hidden`}>
          {/* Header */}
          <div className={`flex items-start justify-between gap-3 ${project.image ? "mb-2" : "mb-4"}`}>
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold leading-tight text-white mb-1 truncate"
                style={{ fontFamily: "Inter, sans-serif", fontSize: project.image ? "14px" : "16px" }}
              >
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                  style={{
                    background: `${accent}12`,
                    color: accent,
                    border: `1px solid ${accent}25`,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {project.category || project.typeBadge || project.badge || "Project"}
                </span>
                {project.isFeatured && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400/70" style={{ fontFamily: "Inter, sans-serif" }}>
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
              </div>
            </div>
            <motion.div
              animate={{ x: hovered ? 2 : 0, opacity: hovered ? 1 : 0.3 }}
              className="shrink-0 mt-0.5"
              style={{ color: accent }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>

          {/* Description — only show if no image, or shorten */}
          <p
            className="leading-relaxed flex-1 line-clamp-2"
            style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif", fontSize: project.image ? "12px" : "13px" }}
          >
            {project.description || project.desc || "No description available."}
          </p>

          {/* Divider + stats — hide when image present */}
          {!project.image && (
            <div className="my-4 border-t border-white/5" />
          )}

          {/* Stats row */}
          {!project.image && project.stats && Object.keys(project.stats).length > 0 && (
            <div className="flex gap-5 mb-4">
              {Object.entries(project.stats).map(([label, value]) => (
                <div key={label}>
                  <div className="text-[14px] font-bold" style={{ color: accent, fontFamily: "Inter, sans-serif" }}>{String(value)}</div>
                  <div className="text-[11px] capitalize text-slate-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {(project.techStack || project.tags || []).slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#64748b", fontFamily: "Inter, sans-serif" }}
              >
                <Code2 size={9} style={{ color: "#475569" }} /> {tag}
              </span>
            ))}
            {(project.techStack || project.tags || []).length > 4 && (
              <span className="text-[11px] text-slate-600 self-center pl-1">+{(project.techStack || project.tags || []).length - 4}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectDetailsModal({ project, onClose }: { project: any; onClose: () => void }) {
  const accents = ["#6366f1", "#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];
  const accent = accents[0]; // default, we can pass index later

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(2, 6, 23, 0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 16, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 border-b border-white/5" style={{ background: "#0f172a" }}>
          <div>
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>{project.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{project.category || "Project"}</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-white/5 text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Optional project image */}
        {project.image && (
          <div className="mx-7 mt-6 rounded-xl overflow-hidden" style={{ height: "220px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-85" />
          </div>
        )}

        {/* Content */}
        <div className="px-7 py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Overview</h3>
            <p className="text-[14px] leading-relaxed text-slate-300 whitespace-pre-wrap" style={{ fontFamily: "Inter, sans-serif" }}>
              {project.description || project.desc || "No description provided."}
            </p>
          </div>

          {/* Stats */}
          {project.stats && Object.keys(project.stats).length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Key Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(project.stats).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{String(value)}</div>
                    <div className="text-[11px] capitalize text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          {(project.techStack || project.tags || []).length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {(project.techStack || project.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#cbd5e1", fontFamily: "Inter, sans-serif" }}
                  >
                    <Code2 size={12} style={{ color: "#64748b" }} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {project.link && project.link !== "#" && (
            <div className="pt-2 border-t border-white/5">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontFamily: "Inter, sans-serif" }}
              >
                <Globe size={15} /> View Live Project <ExternalLink size={13} style={{ opacity: 0.6 }} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("All");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/projects');
        setProjectsData(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filters = ["All", ...Array.from(new Set(projectsData.map(p => p.category).filter(Boolean)))];
  const filtered = active === "All" ? projectsData : projectsData.filter((p) => p.category === active);

  return (
    <section id="work" className="py-28 relative">

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="w-6 h-[2px] rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            Selected Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-[15px] text-slate-400 max-w-md leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A curated showcase of projects that reflect our engineering standards and design philosophy.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: active === f ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                color: active === f ? "#a5b4fc" : "#64748b",
                border: `1px solid ${active === f ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} onClick={() => navigate(`/project/${project._id || project.id}`)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
            No projects found.
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-start mt-12"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            View all projects
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
