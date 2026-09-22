import { motion } from "motion/react";
import { Network, Cpu, Settings, Code, Lightbulb, PenTool, CheckCircle, Rocket, Wrench, ArrowRight } from "lucide-react";
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

  const leftProcesses = processes.slice(0, Math.ceil(processes.length / 2));
  const rightProcesses = processes.slice(Math.ceil(processes.length / 2));

  // Determine line curves based on position
  const getLineStyle = (isLeft: boolean, index: number, total: number) => {
    const isTop = index < total / 2 - 0.5;
    const isBottom = index > total / 2 - 0.5;
    const isMiddle = !isTop && !isBottom;

    return { isTop, isBottom, isMiddle };
  };

  return (
    <section className="py-10 md:py-16 relative overflow-hidden bg-[#050b14]" id="process">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, var(--primary-accent) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
      }}></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary-accent)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--primary-accent)] opacity-50"></div>
            <span className="inline-block py-1 px-4 rounded-full border border-[rgba(255,255,255,0.05)] text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)] bg-[rgba(255,255,255,0.02)]" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif" }}>
              Our Process
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--primary-accent)] opacity-50"></div>
          </div>

          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#e8f4ff", lineHeight: 1.2 }} className="mx-auto drop-shadow-lg mb-4">
            Transforming Ideas Into <br />
            <span style={{ color: "var(--primary-accent)", textShadow: "0 0 20px rgba(59,130,246,0.3)" }}>Actionable Solutions</span>
          </h2>

          <p className="max-w-2xl mx-auto text-[#7aa8cc] text-sm sm:text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            We follow a clear and strategic process to turn your vision into high-performing digital products. From planning to deployment, we build solutions that create real impact.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center relative min-h-[600px] xl:min-h-[700px]">

          {/* Central Orb & Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
            {/* Outer large faint ring */}
            <div className="absolute w-[500px] h-[500px] xl:w-[650px] xl:h-[650px] border border-[var(--primary-accent)] opacity-20 rounded-full z-0"></div>

            {/* Inner glowing ring */}
            <div className="absolute w-[300px] h-[300px] xl:w-[350px] xl:h-[350px] border border-[var(--primary-accent)] opacity-50 rounded-full z-0 shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[var(--primary-accent)] shadow-[0_0_15px_var(--primary-accent)]"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 -mb-1 rounded-full bg-white shadow-[0_0_10px_white]"></div>
            </div>

            {/* Core Orb with Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-56 h-56 xl:w-64 xl:h-64 z-20"
            >
              <div className="w-full h-full rounded-full p-1 relative flex items-center justify-center bg-gradient-to-br from-[#0a1120] to-[#050b14] border border-[var(--primary-accent)] shadow-[0_0_50px_rgba(59,130,246,0.4),inset_0_0_30px_rgba(59,130,246,0.2)]">
                {/* Inner glass shine */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

                <img
                  src={`${import.meta.env.BASE_URL}logo.jpg`}
                  alt="Jronix Logo"
                  className="w-full h-full object-cover rounded-full scale-95"
                />
              </div>
            </motion.div>
          </div>

          {/* Left Column */}
          <div className="w-[380px] xl:w-[420px] flex flex-col gap-8 absolute left-0 z-30" style={{ top: "50%", transform: "translateY(-50%)" }}>
            {leftProcesses.map((process, i) => {
              const IconComponent = iconMap[process.icon] || Settings;
              const { isTop, isBottom, isMiddle } = getLineStyle(true, i, leftProcesses.length);

              return (
                <motion.div
                  key={process._id || i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group cursor-pointer relative"
                >
                  {/* Connecting Line to Center */}
                  <div className="absolute left-full top-1/2 w-[60px] xl:w-[100px] h-[2px] bg-transparent pointer-events-none z-0">
                    <div className="relative w-full h-full">
                      {isMiddle && (
                        <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-[var(--primary-accent)] to-transparent opacity-50">
                          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                      {isTop && (
                        <div className="absolute left-0 top-0 w-full h-[60px] border-t border-r border-[var(--primary-accent)] opacity-50 rounded-tr-[30px] border-b-0 border-l-0">
                          <div className="absolute right-[-4px] bottom-[-4px] w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                      {isBottom && (
                        <div className="absolute left-0 bottom-0 w-full h-[60px] border-b border-r border-[var(--primary-accent)] opacity-50 rounded-br-[30px] border-t-0 border-l-0">
                          <div className="absolute right-[-4px] top-[-4px] w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex bg-[rgba(10,17,32,0.8)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden hover:bg-[rgba(20,30,50,0.8)] transition-all duration-300 backdrop-blur-md relative shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    {/* Glowing Left Border */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--primary-accent)] shadow-[2px_0_15px_var(--primary-accent)]"></div>

                    <div className="flex items-center gap-4 p-5 pl-7 w-full">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
                        <IconComponent size={20} className="text-[var(--primary-accent)]" />
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="text-lg text-[#e8f4ff] font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                          <span className="text-[var(--primary-accent)] text-sm font-semibold opacity-80">0{process.stepNumber}</span>
                          {process.title}
                        </h3>
                        <p className="text-xs text-[#7aa8cc] leading-relaxed line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="w-[380px] xl:w-[420px] flex flex-col gap-8 absolute right-0 z-30" style={{ top: "50%", transform: "translateY(-50%)" }}>
            {rightProcesses.map((process, i) => {
              const IconComponent = iconMap[process.icon] || Settings;
              const { isTop, isBottom, isMiddle } = getLineStyle(false, i, rightProcesses.length);

              return (
                <motion.div
                  key={process._id || i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group cursor-pointer relative"
                >
                  {/* Connecting Line to Center */}
                  <div className="absolute right-full top-1/2 w-[60px] xl:w-[100px] h-[2px] bg-transparent pointer-events-none z-0">
                    <div className="relative w-full h-full">
                      {isMiddle && (
                        <div className="absolute right-0 top-0 w-full h-[1px] bg-gradient-to-l from-[var(--primary-accent)] to-transparent opacity-50">
                          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                      {isTop && (
                        <div className="absolute right-0 top-0 w-full h-[60px] border-t border-l border-[var(--primary-accent)] opacity-50 rounded-tl-[30px] border-b-0 border-r-0">
                          <div className="absolute left-[-4px] bottom-[-4px] w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                      {isBottom && (
                        <div className="absolute right-0 bottom-0 w-full h-[60px] border-b border-l border-[var(--primary-accent)] opacity-50 rounded-bl-[30px] border-t-0 border-r-0">
                          <div className="absolute left-[-4px] top-[-4px] w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex bg-[rgba(10,17,32,0.8)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden hover:bg-[rgba(20,30,50,0.8)] transition-all duration-300 backdrop-blur-md relative shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    {/* Glowing Right Border */}
                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[var(--primary-accent)] shadow-[-2px_0_15px_var(--primary-accent)]"></div>

                    <div className="flex items-center gap-4 p-5 pr-7 w-full">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
                        <IconComponent size={20} className="text-[var(--primary-accent)]" />
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="text-lg text-[#e8f4ff] font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                          <span className="text-[var(--primary-accent)] text-sm font-semibold opacity-80">0{process.stepNumber}</span>
                          {process.title}
                        </h3>
                        <p className="text-xs text-[#7aa8cc] leading-relaxed line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center gap-8 relative mt-10">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-48 h-48 mb-8 z-20"
          >
            <div className="absolute inset-[-20px] rounded-full border border-[var(--primary-accent)] opacity-30 animate-[spin_10s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--primary-accent)] shadow-[0_0_10px_var(--primary-accent)]"></div>
            </div>

            <div className="w-full h-full rounded-full p-1 relative flex items-center justify-center bg-gradient-to-br from-[#0a1120] to-[#050b14] border border-[var(--primary-accent)] shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="Jronix Logo"
                className="w-full h-full object-cover rounded-full scale-95"
              />
            </div>
          </motion.div>

          <div className="w-full flex flex-col gap-6 z-10 max-w-md">
            {processes.map((process, i) => {
              const IconComponent = iconMap[process.icon] || Settings;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={process._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  <div className="flex bg-[rgba(10,17,32,0.8)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden backdrop-blur-md relative shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
                    {/* Alternating Edge glow for mobile too, or just left edge */}
                    <div className={`absolute top-0 bottom-0 w-1.5 bg-[var(--primary-accent)] ${isEven ? 'left-0 shadow-[2px_0_15px_var(--primary-accent)]' : 'right-0 shadow-[-2px_0_15px_var(--primary-accent)]'}`}></div>

                    <div className={`flex items-center gap-4 p-5 w-full ${isEven ? 'pl-7' : 'pr-7 flex-row-reverse'}`}>
                      <div className="shrink-0 w-12 h-12 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
                        <IconComponent size={20} className="text-[var(--primary-accent)]" />
                      </div>

                      <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                        <h3 className={`text-lg text-[#e8f4ff] font-bold mb-1 flex items-center gap-2 ${isEven ? '' : 'justify-end'}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>
                          {isEven && <span className="text-[var(--primary-accent)] text-sm font-semibold opacity-80">0{process.stepNumber}</span>}
                          {process.title}
                          {!isEven && <span className="text-[var(--primary-accent)] text-sm font-semibold opacity-80">0{process.stepNumber}</span>}
                        </h3>
                        <p className="text-xs text-[#7aa8cc] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pill (Your Vision -> Our Process -> Real Results) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-24 flex justify-center z-20 relative"
        >
          <div className="flex items-center gap-3 sm:gap-6 bg-[rgba(10,17,32,0.6)] border border-[rgba(255,255,255,0.1)] rounded-full px-6 sm:px-10 py-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_0_15px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-2 group">
              <Lightbulb size={18} className="text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Your Vision</span>
            </div>
            <ArrowRight size={16} className="text-[#7aa8cc] opacity-50" />
            <div className="flex items-center gap-2 group">
              <Settings size={18} className="text-[var(--primary-accent)] group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Our Process</span>
            </div>
            <ArrowRight size={16} className="text-[#7aa8cc] opacity-50" />
            <div className="flex items-center gap-2 group">
              <CheckCircle size={18} className="text-[var(--primary-accent)] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Real Results</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
