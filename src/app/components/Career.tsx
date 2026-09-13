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
    <section id="career" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(167,139,250,0.06) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, #a78bfa)" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "#a78bfa", fontFamily: "Inter, sans-serif", background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.2)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a78bfa" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              Join Our Team
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, #a78bfa)" }} />
          </div>

          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            <span style={{ color: "#e8f4ff" }}>Build the </span>
            <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 60%, #fb923c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 25px rgba(167,139,250,0.4))" }}>
              Future
            </span>
            <span style={{ color: "#e8f4ff" }}> With Us</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 mb-5 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #a78bfa, #f472b6, transparent)", transformOrigin: "center" }}
          />

          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            We're always looking for talented people who love building things that matter.
          </p>
        </motion.div>

        {/* Perks — premium cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {perks.map((p, i) => {
            const Icon = p.icon;
            const accents = [
              { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", glow: "rgba(59,130,246,0.15)" },
              { color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", glow: "rgba(167,139,250,0.15)" },
              { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)", glow: "rgba(52,211,153,0.15)" },
              { color: "#f472b6", bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)", glow: "rgba(244,114,182,0.15)" },
            ];
            const a = accents[i % accents.length];
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-6 text-center overflow-hidden cursor-default"
                style={{
                  background: "rgba(8,18,36,0.7)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = a.border;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${a.glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }} />

                {/* Radial corner glow */}
                <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at top right, ${a.color}18 0%, transparent 70%)` }} />

                {/* Number */}
                <div className="absolute top-4 right-4 text-[10px] font-bold" style={{ color: a.color + "60", fontFamily: "JetBrains Mono, monospace" }}>
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: a.bg, border: `1px solid ${a.border}` }}>
                  <Icon size={24} style={{ color: a.color }} />
                </div>

                <p className="font-bold mb-2" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "17px", color: "#e8f4ff" }}>
                  {p.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Job listings title */}
        <div className="text-center mt-20 mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-10 opacity-50" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
              Careers
            </span>
            <div className="h-[1px] w-10 opacity-50" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </div>
          <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#e8f4ff", lineHeight: 1.1 }}>
            Explore <span style={{ background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Open Positions</span>
          </h3>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-20 h-[2px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />
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
