import { motion } from "motion/react";
import { Network, Cpu, Settings, Code, Lightbulb, PenTool, CheckCircle, Rocket, Wrench } from "lucide-react";
import { useProcesses } from "../hooks/useProcesses";

const iconMap: { [key: string]: any } = {
  Network,
  Cpu,
  Settings,
  Code,
  Lightbulb,
  PenTool,
  CheckCircle,
  Rocket,
  Wrench
};

export function ProcessSection() {
  const { processes, loading } = useProcesses();

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="w-8 h-8 border-2 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!processes || processes.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden" id="process">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary-accent)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-xs font-medium tracking-wider uppercase mb-4" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
            Process
          </span>
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#e8f4ff", lineHeight: 1.2, maxWidth: "800px" }} className="mx-auto">
            Transforming Ideas Into <br />
            <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Actionable Solutions</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {processes.map((process, i) => {
            const IconComponent = iconMap[process.icon] || Settings;
            const isMiddle = i % 2 !== 0; // True for index 1, 3, etc.

            return (
              <motion.div
                key={process._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* For Left and Right cards (Number on top) */}
                {!isMiddle && (
                  <div className="flex flex-col items-center w-full mb-0 md:-mt-4">
                    <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#7aa8cc] group-hover:bg-[var(--primary-accent)] group-hover:border-[var(--primary-accent)] group-hover:text-white transition-all duration-300 font-medium">
                      {process.stepNumber}
                    </div>
                    <div className="h-10 border-l border-dashed border-[rgba(255,255,255,0.15)] group-hover:border-[var(--primary-accent)] transition-colors duration-300"></div>
                  </div>
                )}

                {/* Main Card */}
                <div 
                  className={`w-full p-10 rounded-3xl text-center flex flex-col items-center transition-all duration-500 relative overflow-hidden ${isMiddle ? '' : ''}`}
                  style={{ 
                    background: "rgba(255,255,255,0.02)", 
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Hover background effect (invisible until hover) */}
                  <div className="absolute inset-0 bg-[#081226] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-20"></div>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-[var(--primary-accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"></div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                     <div className="absolute inset-0 bg-[var(--primary-accent)] opacity-0 group-hover:opacity-10 blur-xl rounded-full transition-all duration-500"></div>
                     <IconComponent size={48} className="text-[#3b82f6] group-hover:text-[var(--primary-accent)] relative z-10 transition-colors duration-500" />
                  </div>

                  <h3 className="mb-4 text-xl text-[#e8f4ff] group-hover:text-white transition-colors duration-500" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}>
                    {process.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[#7aa8cc] group-hover:text-[#a5c6df] transition-colors duration-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    {process.description}
                  </p>
                </div>

                {/* For Middle card (Number on bottom) */}
                {isMiddle && (
                  <div className="flex flex-col items-center w-full">
                    <div className="h-10 border-l border-dashed border-[rgba(255,255,255,0.15)] group-hover:border-[var(--primary-accent)] transition-colors duration-300"></div>
                    <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#7aa8cc] group-hover:bg-[var(--primary-accent)] group-hover:border-[var(--primary-accent)] group-hover:text-white transition-all duration-300 font-medium">
                      {process.stepNumber}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
