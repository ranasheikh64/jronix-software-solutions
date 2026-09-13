import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Sparkles, Search, SlidersHorizontal } from "lucide-react";
import apiClient from "../../api/client";
import { ProjectCard } from "../components/Portfolio";

function LoadingSkeleton() {
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

const categoryColors: Record<string, string> = {
  App: "#3b82f6",
  "Mobile app": "#a78bfa",
  Web: "#34d399",
  Design: "#f472b6",
  default: "#60a5fa",
};
function getColor(cat: string) { return categoryColors[cat] || categoryColors.default; }

export function AllProjects() {
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const filtered = projectsData
    .filter(p => active === "All" || p.category === active)
    .filter(p => !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden" style={{ background: "#050b14" }}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-10 rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-08 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
        >
          <ArrowLeft size={15} /> Back
        </motion.button>

        {/* Header */}
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8" style={{ background: "var(--primary-accent)" }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>Archive</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#e8f4ff", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            All <span style={{ color: "var(--primary-accent)", textShadow: "0 0 30px rgba(59,130,246,0.4)" }}>Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="mt-4 text-base max-w-xl leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            A complete collection of our work — case studies, apps, platforms, and engineering achievements across various domains.
          </motion.p>
        </div>

        {/* Filter + Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
        >
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 flex-1">
            {filters.map((f) => {
              const count = f === "All" ? projectsData.length : projectsData.filter(p => p.category === f).length;
              const col = getColor(f);
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
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
          </div>

          {/* Search input */}
          <div className="relative shrink-0">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7aa8cc" }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 w-56"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e8f4ff",
                fontFamily: "Inter, sans-serif",
                caretColor: "var(--primary-accent)",
              }}
            />
          </div>
        </motion.div>

        {/* Results count */}
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <p className="text-sm" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>
              Showing <strong style={{ color: "#7aa8cc" }}>{filtered.length}</strong> project{filtered.length !== 1 ? "s" : ""}
              {active !== "All" && <> in <strong style={{ color: getColor(active) }}>{active}</strong></>}
              {searchQuery && <> matching "<strong style={{ color: "var(--primary-accent)" }}>{searchQuery}</strong>"</>}
            </p>
          </motion.div>
        )}

        {/* Grid / Loading / Empty */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.12)" }}>
              <Sparkles size={36} style={{ color: "var(--primary-accent)" }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              No Projects Found
            </h3>
            <p className="text-sm max-w-sm leading-relaxed mb-8" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {searchQuery
                ? `No projects match "${searchQuery}". Try a different search term.`
                : `No projects in the "${active}" category yet.`}
            </p>
            <div className="flex gap-3">
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                  Clear Search
                </button>
              )}
              <button onClick={() => { setActive("All"); setSearchQuery(""); }} className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
                Show All Projects
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id || project.id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <ProjectCard project={project} index={i} onClick={() => navigate(`/project/${project._id || project.id}`)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
