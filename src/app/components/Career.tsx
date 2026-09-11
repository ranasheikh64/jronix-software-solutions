import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, TrendingUp, Sparkles, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useJobs } from "../hooks/useJobs";
import { JobCard } from "./JobCard";
import { JobApplyModal } from "./JobApplyModal";

const perks = [
  { icon: Wifi, label: "Remote Friendly", desc: "Work from anywhere in the world." },
  { icon: TrendingUp, label: "Growth Opportunities", desc: "Mentorship, courses, and career paths." },
  { icon: Sparkles, label: "Exciting Projects", desc: "Real-world products that ship globally." },
  { icon: Heart, label: "Collaborative Culture", desc: "A team that lifts each other up." },
];

export function Career() {
  const { jobs, loading } = useJobs();
  const [applyJob, setApplyJob] = useState<any | null>(null);

  // Take only the first 6 jobs
  const displayJobs = jobs.slice(0, 6);

  return (
    <section id="career" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-4" style={{ background: "var(--primary-accent-glow)", border: "1px solid var(--primary-accent)", color: "var(--primary-accent)", fontFamily: "JetBrains Mono, monospace" }}>
            Join Our Team
          </div>
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f4ff" }}>
            Build the <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Future</span> With Us
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            We're always looking for talented people who love building things that matter.
          </p>
        </motion.div>

        {/* Perks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-5 text-center"
                style={{ background: "linear-gradient(135deg, rgba(13,31,60,0.6), rgba(10,22,40,0.8))", border: "1px solid var(--primary-accent-glow)" }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: "var(--primary-accent-glow)", border: "1px solid var(--primary-accent)" }}>
                  <Icon size={20} style={{ color: "var(--primary-accent)" }} />
                </div>
                <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8f4ff" }}>{p.label}</p>
                <p className="text-xs mt-1" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Job listings */}
        <div className="text-center mt-20 mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[var(--primary-accent)] opacity-[0.03] blur-3xl rounded-full pointer-events-none"></div>
          <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-xs font-medium tracking-wider uppercase mb-3" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
            Careers
          </span>
          <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#e8f4ff" }}>
            Explore <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Open Positions</span>
          </h3>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "var(--primary-gradient)" }}></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayJobs.map((job, i) => (
              <JobCard key={job._id || job.title} job={job} index={i} onApply={setApplyJob} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link to="/open-positions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-accent-rgb),0.4)] border border-[var(--primary-accent)] hover:bg-[rgba(var(--primary-accent-rgb),0.1)] text-[#e8f4ff]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              View All Positions <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

        <AnimatePresence>
          {applyJob && <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
