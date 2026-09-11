import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Code2, X, Globe, Star, ExternalLink, Activity, Box, AppWindow } from "lucide-react";
import { useNavigate } from "react-router";
import apiClient from "../../api/client";

// Simple fallback icon mapping
const getTechIcon = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('react') || t.includes('flutter')) return <Activity size={12} />;
  if (t.includes('solid') || t.includes('node') || t.includes('getx')) return <Box size={12} />;
  return <AppWindow size={12} />;
};

export function ProjectCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

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
        className="relative rounded-2xl flex flex-col overflow-hidden transition-all duration-300 h-full p-4"
        style={{
          background: hovered ? "rgba(22, 28, 45, 0.95)" : "rgba(18, 23, 38, 0.8)",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}`,
          boxShadow: hovered ? `0 20px 50px -10px rgba(100,150,255,0.15), 0 0 0 1px rgba(255,255,255,0.1)` : "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Inset Image */}
        {project.image ? (
          <div className="relative w-full overflow-hidden rounded-xl bg-black/40 mb-5" style={{ height: "200px", flexShrink: 0, border: "1px solid rgba(255,255,255,0.05)" }}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/20 mb-5 flex items-center justify-center" style={{ height: "200px", flexShrink: 0, border: "1px solid rgba(255,255,255,0.05)" }}>
            <Box size={40} className="text-white/20" />
          </div>
        )}

        {/* Tags Row */}
        <div className="flex items-center gap-3 mb-3 px-1">
          <span
            className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(59, 130, 246, 0.15)",
              color: "#60a5fa",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {project.category || project.typeBadge || project.badge || "Project"}
          </span>
          {(project.isFeatured || index === 0) && ( // Mocking featured for demonstration
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-amber-500" style={{ fontFamily: "Inter, sans-serif" }}>
              <Star size={12} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1 px-1">
          <h3
            className="font-bold text-white mb-2 line-clamp-1"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", letterSpacing: "-0.01em" }}
          >
            {project.title}
          </h3>
          <p
            className="leading-relaxed flex-1 line-clamp-3 text-sm mb-6"
            style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif" }}
          >
            {project.description || project.desc || "No description available."}
          </p>

          {/* Footer Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {(project.techStack || project.tags || ["React", "Node"]).slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#cbd5e1", fontFamily: "Inter, sans-serif" }}
                >
                  {getTechIcon(tag)} {tag}
                </span>
              ))}
            </div>

            {/* Go Button */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{ background: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)" }}
              animate={{ x: hovered ? 3 : 0 }}
            >
              <ArrowRight size={14} className="text-white" />
            </motion.div>
          </div>
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

  // Ensure default data exists if API is empty
  const defaultProjects = [
    { id: 1, title: "P-Media Hub: AI Download App", category: "App", description: "This is app for media download app for Flutter for asea and design simplitor standardss...", tags: ["Flutter", "GetX"], isFeatured: true },
    { id: 2, title: "NovaDeFi: Smart Portfolio Management", category: "Mobile App", description: "A comprehensive platform for multi-chain asset tracking and decentralized finance analytics.", tags: ["React", "Solidity"] },
    { id: 3, title: "Doerly: Real People Help - Community Marketplace", category: "App", description: "Now, whenever you add or edit a Service in your Admin Dashboard, you can specify the tags...", tags: ["Mobile App", "Community"] },
  ];

  const dataToUse = projectsData.length > 0 ? projectsData : defaultProjects;

  const filters = ["All", ...Array.from(new Set(dataToUse.map(p => p.category).filter(Boolean)))];
  const filtered = active === "All" ? dataToUse : dataToUse.filter((p) => p.category === active);

  return (
    <section id="work" className="py-32 relative">
      {/* Subtle Background Elements */}
      <div className="absolute right-0 top-20 w-1/2 h-1/2 pointer-events-none opacity-20 bg-no-repeat bg-right-top" style={{ backgroundImage: "radial-gradient(ellipse at right, rgba(59,130,246,0.3) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-5 h-[2px] rounded-full bg-blue-500" />
            <span className="text-[13px] font-bold tracking-widest uppercase text-[#8a9bb3]" style={{ fontFamily: "Inter, sans-serif" }}>
              PORTFOLIO
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-[42px] font-bold text-white mb-5"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            Selected Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-[15px] text-[#8a9bb3] max-w-lg leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A curated showcase of projects that reflect our engineering standards and design philosophy.
          </motion.p>
        </div>

        {/* Filter Capsule */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center p-1.5 rounded-full mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="relative px-6 py-2.5 text-[14px] font-medium transition-all duration-300 rounded-full"
              style={{
                background: active === f ? "rgba(255,255,255,0.12)" : "transparent",
                color: active === f ? "#ffffff" : "#94a3b8",
                boxShadow: active === f ? "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)" : "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id || project.id || i}
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
          className="flex justify-start mt-14"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300 group hover:bg-white/10"
            style={{ 
              background: "rgba(255,255,255,0.06)", 
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Inter, sans-serif" 
            }}
          >
            View all projects
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
