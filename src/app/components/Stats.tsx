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

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative" style={{ paddingLeft: 50, paddingRight: 50 }}>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(10, 25, 50, 0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,170,255,0.18)",
            boxShadow: "0 8px 48px rgba(0,120,200,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {statsData.map((stat, i) => {
            const Icon = iconMap[stat.icon?.toLowerCase()] || CheckCircle;
            const colors = ["#00aaff", "#00d4ff", "#a78bfa", "#34d399"];
            const color = colors[i % colors.length];
            
            // Extract number and suffix from string like "50+"
            const valueStr = stat.value || "0";
            const numMatch = valueStr.match(/\d+/);
            const target = numMatch ? parseInt(numMatch[0]) : 0;
            const suffix = valueStr.replace(/\d+/g, "");

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center py-12 px-6 relative"
              >
                {i < statsData.length - 1 && (
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-px hidden lg:block" style={{ background: "linear-gradient(180deg, transparent, rgba(0,170,255,0.2), transparent)" }} />
                )}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={24} style={{ color: color }} />
                </div>
                <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#e8f4ff", lineHeight: 1 }}>
                  <CountUp target={target} suffix={suffix} />
                </div>
                <p className="mt-2 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

  );
}
