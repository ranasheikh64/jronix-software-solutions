import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Eye, ArrowRight, Star, Code2 } from "lucide-react";
import apiClient from "../../api/client";

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  // 3-D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-80, 80], [10, -10]), { stiffness: 250, damping: 28 });
  const ry = useSpring(useTransform(mx, [-80, 80], [-10, 10]), { stiffness: 250, damping: 28 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetTilt = () => { mx.set(0); my.set(0); setHovered(false); };

  const colors = ["#54c5f8", "#00aaff", "#f472b6", "#34d399", "#a78bfa", "#fb923c"];
  const badgeColor = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={resetTilt}
        onMouseEnter={() => setHovered(true)}
        className="group relative rounded-2xl overflow-hidden h-full cursor-pointer"
        animate={{
          boxShadow: hovered
            ? `0 24px 70px ${badgeColor}28, 0 0 0 1px ${badgeColor}35`
            : "0 4px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,170,255,0.07)",
        }}
        transition={{ duration: 0.25 }}
        style2={{
          background: "rgba(8,18,36,0.75)",
          backdropFilter: "blur(14px)",
        } as React.CSSProperties}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: "210px" }}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Gradient overlay always */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(8,18,36,0.9) 100%)" }} />

          {/* Hover overlay with actions */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "rgba(5,12,26,0.7)", backdropFilter: "blur(4px)" }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
              style={{ background: `linear-gradient(135deg, ${badgeColor}cc, ${badgeColor})`, color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              <Eye size={14} /> Case Study
            </motion.a>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="p-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
            >
              <ExternalLink size={14} />
            </motion.a>
          </motion.div>

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs"
              style={{ background: `${badgeColor}22`, border: `1px solid ${badgeColor}50`, color: badgeColor, fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}
            >
              {project.typeBadge || project.badge}
            </span>
          </div>

          {/* Featured star */}
          {project.isFeatured && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.35)", color: "#fbbf24", fontFamily: "JetBrains Mono, monospace" }}>
                <Star size={10} fill="currentColor" /> Featured
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div
          className="p-5"
          style={{ background: "rgba(8,18,36,0.85)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "18px", color: "#e8f4ff", lineHeight: 1.2 }}>
              {project.title}
            </h3>
            <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight size={16} style={{ color: badgeColor, flexShrink: 0, marginTop: 2 }} />
            </motion.div>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            {project.description || project.desc}
          </p>

          {/* Stats row */}
          {project.stats && Object.keys(project.stats).length > 0 && (
            <div className="flex gap-4 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(0,170,255,0.08)" }}>
              {Object.entries(project.stats).map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: badgeColor }}>{String(value)}</div>
                  <div className="text-xs capitalize" style={{ color: "#5a8aaa", fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {(project.techStack || project.tags || []).map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded text-xs" style={{ background: "rgba(0,170,255,0.06)", border: "1px solid rgba(0,170,255,0.12)", color: "#7aa8cc", fontFamily: "JetBrains Mono, monospace" }}>
                <Code2 size={9} /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow bar on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${badgeColor}, transparent)`, transformOrigin: "center" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("All");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const [projectsData, setProjectsData] = useState<any[]>([]);

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

  const filters = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))];
  const filtered = active === "All" ? projectsData : projectsData.filter((p) => p.category === active);

  return (
    <section id="work" className="py-28 relative">
      {/* Section background tint */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,12,26,0.2) 0%, rgba(5,12,26,0.5) 50%, rgba(5,12,26,0.2) 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5"
            style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)", color: "#00aaff", fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}
          >
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4ff" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} />
            Our Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: "#e8f4ff", lineHeight: 1.15 }}
          >
            Work That{" "}
            <span style={{ background: "linear-gradient(90deg, #00aaff, #00d4ff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Defines Us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            Hand-picked projects that demonstrate our engineering craft, design depth, and delivery speed.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-5 h-px w-32"
            style={{ background: "linear-gradient(90deg, transparent, #00aaff, #a78bfa, transparent)", transformOrigin: "center" }}
          />
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 rounded-xl text-sm transition-colors duration-200 overflow-hidden"
              style={{
                background: active === f ? "transparent" : "rgba(0,170,255,0.05)",
                color: active === f ? "#fff" : "#7aa8cc",
                border: `1px solid ${active === f ? "rgba(0,170,255,0.5)" : "rgba(0,170,255,0.12)"}`,
                fontFamily: "Inter, sans-serif",
                backdropFilter: "blur(8px)",
              }}
            >
              {active === f && (
                <motion.div
                  layoutId="filterBg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <button
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105"
            style={{ border: "1px solid rgba(0,170,255,0.3)", color: "#00aaff", fontFamily: "Inter, sans-serif", background: "rgba(0,170,255,0.04)", backdropFilter: "blur(8px)" }}
          >
            View All Projects
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowRight size={15} />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
