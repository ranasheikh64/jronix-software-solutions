import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, ArrowUpRight, Star, Layers, Box, Smartphone, Globe, Code2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import apiClient from "../../api/client";

const categoryIcon: Record<string, any> = {
  App: Code2,
  "Mobile app": Smartphone,
  Web: Globe,
  Design: Layers,
};

const categoryColors: Record<string, string> = {
  App: "#3b82f6",
  "Mobile app": "#a78bfa",
  Web: "#34d399",
  Design: "#f472b6",
  default: "#60a5fa",
};

function getColor(category: string) {
  return categoryColors[category] || categoryColors.default;
}

export function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const color = getColor(project.category);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{
        background: "rgba(8,18,36,0.7)",
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 20px 60px -10px ${color}25, 0 0 0 1px ${color}20` : "0 4px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        transition: "all 0.35s ease",
      }}
    >
      {/* Top color accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220, flexShrink: 0 }}>
        {project.image ? (
          <>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, rgba(8,18,36,0.95) 100%)` }} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}10 0%, rgba(8,18,36,0.8) 100%)` }}>
            <Box size={48} style={{ color: color + "40" }} />
          </div>
        )}

        {/* Category + Featured badges on top of image */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md"
            style={{ background: `${color}25`, border: `1px solid ${color}50`, color: color }}>
            {project.category || "Project"}
          </span>
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.35)", color: "#fbbf24" }}>
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        {/* Hover arrow overlay */}
        <motion.div
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <ArrowUpRight size={16} className="text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-1" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "20px" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 line-clamp-2 mb-5" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
          {project.description || "No description available."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          <div className="flex flex-wrap gap-1.5">
            {(project.techStack || project.tags || []).slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: `${color}10`, border: `1px solid ${color}25`, color: color, fontFamily: "Inter, sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            animate={{ x: hovered ? 3 : 0, background: hovered ? color + "30" : "rgba(255,255,255,0.05)" }}
            style={{ border: `1px solid ${hovered ? color + "50" : "rgba(255,255,255,0.08)"}` }}
          >
            <ArrowRight size={14} style={{ color: hovered ? color : "#7aa8cc" }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Loading skeleton
function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(8,18,36,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="h-[220px]" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="p-5 space-y-3">
        <div className="h-5 rounded-lg w-3/4" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="h-3 rounded-lg w-full" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="h-3 rounded-lg w-2/3" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("All");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/projects');
        setProjectsData(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = ["All", ...Array.from(new Set(projectsData.map(p => p.category).filter(Boolean)))];
  const filtered = active === "All" ? projectsData : projectsData.filter(p => p.category === active);

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute right-0 top-20 w-[600px] h-[600px] pointer-events-none opacity-10 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
      <div className="absolute left-0 bottom-20 w-[400px] h-[400px] pointer-events-none opacity-10 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="mb-16 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase px-5 py-2 rounded-full"
              style={{
                color: "var(--primary-accent)",
                fontFamily: "Inter, sans-serif",
                background: "rgba(59,130,246,0.07)",
                border: "1px solid rgba(59,130,246,0.2)",
                letterSpacing: "0.2em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary-accent)" }} />
              Portfolio
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h2
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "#e8f4ff" }}>Selected </span>
              <span
                style={{
                  background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))",
                }}
              >
                Work
              </span>
            </h2>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 mb-6 h-[2px] w-24 rounded-full"
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
            className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            A curated showcase of projects that reflect our engineering standards and design philosophy.

          </motion.p>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((f) => {
            const count = f === "All" ? projectsData.length : projectsData.filter(p => p.category === f).length;
            const col = getColor(f);
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: active === f ? `${col}20` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active === f ? col + "50" : "rgba(255,255,255,0.08)"}`,
                  color: active === f ? col : "#7aa8cc",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: active === f ? `0 0 20px ${col}20` : "none",
                }}
              >
                {f}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: active === f ? `${col}25` : "rgba(255,255,255,0.06)", color: active === f ? col : "#4a6080" }}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Project Grid / Loading / Empty */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <ProjectSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <Sparkles size={32} style={{ color: "var(--primary-accent)" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              No Projects Found
            </h3>
            <p className="text-sm max-w-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              There are no projects in the <strong style={{ color: "var(--primary-accent)" }}>{active}</strong> category yet. Try a different filter.
            </p>
            <button onClick={() => setActive("All")} className="mt-6 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
              Show All Projects
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id || project.id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} index={i} onClick={() => navigate(`/project/${project._id || project.id}`)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All CTA */}
        {!loading && projectsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => navigate('/projects')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(167,139,250,0.1))",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#e8f4ff",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 8px 30px rgba(59,130,246,0.1)",
              }}
            >
              <span>View All Projects</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
