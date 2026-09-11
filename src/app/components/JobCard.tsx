import { motion } from "motion/react";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export function JobCard({ job, index, onApply }: { job: any; index: number; onApply: (job: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col justify-between gap-6 p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border border-transparent hover:border-[var(--primary-accent)]"
      style={{ background: "linear-gradient(145deg, rgba(13,31,60,0.7), rgba(10,22,40,0.9))", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary-accent)] opacity-0 rounded-full blur-[50px] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

      <div>
        <h4 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff", marginBottom: "16px" }}>
          {job.title}
        </h4>
        
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-3 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Clock size={14} style={{ color: "var(--primary-accent)" }} />
            </div>
            {job.type}
          </span>
          <span className="flex items-center gap-3 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <MapPin size={14} style={{ color: "var(--primary-accent)" }} />
            </div>
            {job.location}
          </span>
        </div>

        <div className="mt-5 pt-5" style={{ borderTop: "1px dashed rgba(122, 168, 204, 0.2)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            {job.description || `Join our team as a ${job.title} and help us build amazing products.`}
          </p>
        </div>
      </div>

      <button
        onClick={() => onApply(job)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-accent-rgb),0.3)] mt-2"
        style={{ background: "var(--primary-gradient)", color: "#fff", fontFamily: "Inter, sans-serif" }}
      >
        Apply Now <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}
