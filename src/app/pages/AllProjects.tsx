import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Sparkles, Search, SlidersHorizontal, X } from "lucide-react";
import apiClient from "../../api/client";
import { 
  ProjectCard, 
  ProjectQuickViewModal, 
  normalizeCategory, 
  getCategoryMeta 
} from "../components/Portfolio";

function LoadingSkeleton() {
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

export function AllProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [active, setActive] = useState(categoryFromUrl || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProject, setQuickViewProject] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryFromUrl) {
      setActive(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const { filters, filtered } = useMemo(() => {
    const categoriesSet = new Set<string>();
    projectsData.forEach(p => {
      if (p.category) categoriesSet.add(normalizeCategory(p.category));
    });
    const filterList = ["All", ...Array.from(categoriesSet)];

    const query = searchQuery.trim().toLowerCase();
    const result = projectsData
      .filter(p => active === "All" || normalizeCategory(p.category) === active)
      .filter(p => {
        if (!query) return true;
        const titleMatch = p.title?.toLowerCase().includes(query);
        const descMatch = p.description?.toLowerCase().includes(query);
        const techMatch = (p.techStack || p.tags || []).some((t: string) => t.toLowerCase().includes(query));
        const catMatch = p.category?.toLowerCase().includes(query);
        return titleMatch || descMatch || techMatch || catMatch;
      });

    return { filters: filterList, filtered: result };
  }, [projectsData, active, searchQuery]);

  return (
    <div className="pt-28 sm:pt-32 pb-24 min-h-screen relative overflow-hidden" style={{ background: "#050b14" }}>
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-15 rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-12 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#7aa8cc",
            fontFamily: "Inter, sans-serif"
          }}
        >
          <ArrowLeft size={15} /> Back
        </motion.button>

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-[1px] w-8 bg-blue-500" />
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Enterprise Work Archive
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#e8f4ff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}
          >
            All <span style={{ color: "var(--primary-accent)", textShadow: "0 0 35px rgba(59,130,246,0.4)" }}>Projects & Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-3 text-sm sm:text-base max-w-2xl leading-relaxed text-[#7fa5c8]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A comprehensive catalog of applications, scalable web platforms, and custom software systems delivered for clients worldwide.
          </motion.p>
        </div>

        {/* Filter + Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 flex-1 items-center">
            {filters.map((f) => {
              const meta = getCategoryMeta(f);
              const count = f === "All"
                ? projectsData.length
                : projectsData.filter(p => normalizeCategory(p.category) === f).length;
              const isSelected = active === f;

              return (
                <button
                  key={f}
                  onClick={() => {
                    setActive(f);
                    if (f === "All") {
                      setSearchParams({});
                    } else {
                      setSearchParams({ category: f });
                    }
                  }}
                  className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                  style={{
                    background: isSelected ? `${meta.color}25` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isSelected ? meta.color + "60" : "rgba(255,255,255,0.08)"}`,
                    color: isSelected ? "#ffffff" : "#7aa8cc",
                    fontFamily: "Inter, sans-serif",
                    boxShadow: isSelected ? `0 0 20px ${meta.glow}` : "none",
                  }}
                >
                  <span>{f === "All" ? "All Works" : f}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                    style={{
                      background: isSelected ? `${meta.color}35` : "rgba(255,255,255,0.06)",
                      color: isSelected ? meta.color : "#64748b"
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input with quick clear */}
          <div className="relative shrink-0 w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, tech (React, Flutter...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e8f4ff",
                fontFamily: "Inter, sans-serif",
                caretColor: "var(--primary-accent)",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Counter */}
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center justify-between">
            <p className="text-xs sm:text-sm text-slate-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Showing <strong className="text-white">{filtered.length}</strong> of {projectsData.length} engineering case studies
              {active !== "All" && <> in <strong className="text-blue-400">{active}</strong></>}
              {searchQuery && <> matching "<strong className="text-blue-400">{searchQuery}</strong>"</>}
            </p>
          </motion.div>
        )}

        {/* Project Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
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
              No Projects Found
            </h3>
            <p className="text-sm max-w-sm text-slate-400 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              {searchQuery
                ? `No projects matched "${searchQuery}". Try searching for React, Flutter, Node, or CMS.`
                : `No projects found in category "${active}".`}
            </p>
            <div className="flex gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={() => { setActive("All"); setSearchQuery(""); }}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-blue-600/30 border border-blue-500/50 text-blue-300 hover:bg-blue-600/50"
              >
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
    </div>
  );
}
