import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useJobs } from "../hooks/useJobs";
import { JobCard } from "../components/JobCard";
import { JobApplyModal } from "../components/JobApplyModal";

export function AllPositions() {
  const { jobs, loading } = useJobs();
  const [applyJob, setApplyJob] = useState<any | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Banner with Image */}
      <div className="relative w-full h-[400px] mb-16 overflow-hidden">
        {/* Background Image - placeholder from unspalsh, adjust as needed */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
        <div className="absolute inset-0 bg-[#020617]/60" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#7aa8cc] hover:text-white transition-colors mb-6 w-fit" style={{ fontFamily: "Inter, sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-xs font-medium tracking-wider uppercase mb-4 backdrop-blur-md" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
              Join Our Team
            </span>
            <h1 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#e8f4ff", lineHeight: 1.1 }}>
              Find Your <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Next Opportunity</span>
            </h1>
            <p className="mt-4 text-lg max-w-2xl" style={{ color: "#a5c6df", fontFamily: "Inter, sans-serif" }}>
              Discover roles where you can make an impact, grow your career, and build the future with a team that values innovation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "24px", color: "#e8f4ff" }}>All Openings ({jobs.length})</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={job._id || job.title} job={job} index={i} onApply={setApplyJob} />
            ))}
          </div>
        )}

        {/* Empty state (optional, just in case) */}
        {!loading && jobs.length === 0 && (
          <div className="text-center py-20 bg-[rgba(13,31,60,0.3)] rounded-2xl border border-[rgba(255,255,255,0.05)]">
            <p className="text-[#7aa8cc]" style={{ fontFamily: "Inter, sans-serif" }}>No open positions at the moment. Check back later!</p>
          </div>
        )}

        <AnimatePresence>
          {applyJob && <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
