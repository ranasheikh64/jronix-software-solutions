import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import apiClient from "../../api/client";
import { ProjectCard } from "../components/Portfolio";

export function AllProjects() {
  const [active, setActive] = useState("All");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
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
    <div className="pt-32 pb-24 min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Heading */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-6 h-[2px] rounded-full bg-indigo-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Archive
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-4"
            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}
          >
            All Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-[15px] text-slate-400 max-w-lg leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A complete collection of all our work, case studies, and engineering achievements across various domains.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
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
      </div>
    </div>
  );
}
