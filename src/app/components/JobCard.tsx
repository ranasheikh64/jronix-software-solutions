import { motion } from "motion/react";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export function JobCard({ job, index, onApply }: { job: any; index: number; onApply: (job: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col justify-between gap-3.5 sm:gap-6 p-3.5 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border border-transparent hover:border-[var(--primary-accent)]"
      style={{ background: "linear-gradient(145deg, rgba(13,31,60,0.7), rgba(10,22,40,0.9))", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary-accent)] opacity-0 rounded-full blur-[50px] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

      <div>
        <h4 
          style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, color: "#e8f4ff" }}
          className="text-base sm:text-xl md:text-[22px] mb-2 sm:mb-4 line-clamp-2 leading-tight"
        >
          {job.title}
        </h4>
        
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Clock size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--primary-accent)" }} />
            </div>
            <span className="truncate">{job.type}</span>
          </span>
          <span className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <MapPin size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: "var(--primary-accent)" }} />
            </div>
            <span className="truncate">{job.location}</span>
          </span>
        </div>

        <div className="mt-3 pt-3 sm:mt-5 sm:pt-5" style={{ borderTop: "1px dashed rgba(122, 168, 204, 0.2)" }}>
          <p className="text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
            {job.description || `Join our team as a ${job.title} and help us build amazing products.`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onApply(job)}
        className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-accent-rgb),0.3)] mt-2"
        style={{ background: "var(--primary-gradient)", color: "#fff", fontFamily: "Inter, sans-serif" }}
      >
        <span>Apply Now</span> <ArrowRight size={13} className="shrink-0 sm:w-4 sm:h-4" />
      </button>
    </motion.div>
  );
}
