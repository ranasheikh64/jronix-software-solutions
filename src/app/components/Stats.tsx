import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle, Users, Smartphone, Calendar } from "lucide-react";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  "check-circle": CheckCircle,
  users: Users,
  smartphone: Smartphone,
  calendar: Calendar,
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    if(target <= 0) {
        setCount(target);
        return;
    }
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  const [statsData, setStatsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/stats');
        setStatsData(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (statsData.length === 0) return null;

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              By The Numbers
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
          >
            <span style={{ color: "#e8f4ff" }}>Delivering </span>
            <span style={{ background: "linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 25px rgba(59,130,246,0.4))" }}>
              Impact
            </span>
            <span style={{ color: "#e8f4ff" }}> at Scale</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 h-[2px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />
        </div>

        <div className="relative z-10 w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <motion.div
            key={`stats-${statsData.length}`}
            className="flex gap-6 lg:gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: statsData.length * 8, // Adjust speed
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* We duplicate the stats array 4 times to ensure it overflows the screen for seamless loop */}
            {[...statsData, ...statsData, ...statsData, ...statsData].map((stat, index) => {
              const Icon = iconMap[stat.icon?.toLowerCase()] || CheckCircle;
              const colors = ["var(--primary-accent)", "var(--primary-accent)", "#a78bfa", "#34d399", "#f43f5e"];
              const i = index % statsData.length;
              const color = colors[i % colors.length];
              
              const valueStr = stat.value || "0";
              const numMatch = valueStr.match(/\d+/);
              const target = numMatch ? parseInt(numMatch[0]) : 0;
              const suffix = valueStr.replace(/\d+/g, "");

              return (
                <div
                  key={`${stat.label}-${index}`}
                  className="w-[280px] flex-shrink-0 flex flex-col items-center text-center p-8 rounded-3xl relative overflow-hidden group cursor-default"
                style={{
                  background: "rgba(10, 25, 50, 0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
                }}
              >
                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)` }} 
                />

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={28} style={{ color: color }} />
                </div>
                
                <div className="relative z-10" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#ffffff", lineHeight: 1 }}>
                  <CountUp target={target} suffix={suffix} />
                </div>
                
                <p className="mt-4 text-sm md:text-base font-medium relative z-10" style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif" }}>
                  {stat.label}
                </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>

  );
}
