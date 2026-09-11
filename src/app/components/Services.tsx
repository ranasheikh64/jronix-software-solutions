import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "motion/react";
import { Smartphone, Globe, Server, Pen, Upload, Brain, Layout, ArrowRight, Zap, Code } from "lucide-react";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  mobile: Smartphone,
  globe: Globe,
  server: Server,
  pen: Pen,
  upload: Upload,
  brain: Brain,
  layout: Layout,
  lightning: Zap,
  code: Code
};

function TiltCard({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const Icon = iconMap[service.icon?.toLowerCase()] || Code;
  const HighlightIcon = iconMap[service.highlightIcon?.toLowerCase()] || Zap;
  
  // Use primary accent blue for everything to match the theme
  const color = "#3b82f6";
  const glow = `rgba(59, 130, 246, 0.15)`;

  const xInitial = index % 2 === 0 ? -40 : 40;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInitial, y: 30 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ y: -8 }}
        className="relative rounded-[24px] cursor-pointer h-full flex flex-col overflow-hidden"
        animate={{
          boxShadow: hovered
            ? `0 20px 60px ${glow}, 0 0 0 1px ${color}50`
            : `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
          background: hovered
            ? `linear-gradient(135deg, rgba(13,31,60,0.95), rgba(7,13,25,0.98))`
            : `linear-gradient(135deg, rgba(10,15,28,0.9), rgba(5,8,15,0.95))`
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated top border glow line */}
        <motion.div
          className="absolute top-0 left-10 right-10 h-[1.5px] rounded-full z-10"
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10">
          
          {/* Icon */}
          <div className="mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `rgba(59,130,246,0.1)`, border: `1px solid rgba(59,130,246,0.3)` }}
              animate={{ scale: hovered ? 1.05 : 1, borderColor: hovered ? 'rgba(59,130,246,0.6)' : 'rgba(59,130,246,0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={20} style={{ color: color }} />
            </motion.div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <span
              className="text-[10px] tracking-wider uppercase font-bold"
              style={{
                color: color,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {service.tags?.join(" · ")}
            </span>
          </div>

          <h3
            className="mb-3"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "#ffffff", letterSpacing: "-0.01em" }}
          >
            {service.title}
          </h3>
          
          <p
            className="text-sm leading-relaxed mb-8 flex-grow line-clamp-3"
            style={{ color: "#8a9bb3", fontFamily: "Inter, sans-serif" }}
          >
            {service.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
            <span
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: "#7aa8cc", fontFamily: "JetBrains Mono, monospace" }}
            >
              <HighlightIcon size={12} style={{ color: color }} /> 
              {service.highlightText || "100% Satisfaction"}
            </span>
            <motion.div
              className="flex items-center gap-1.5 text-xs font-semibold"
              animate={{ x: hovered ? 4 : 0, color: hovered ? "#ffffff" : color }}
              style={{ color: color, fontFamily: "Inter, sans-serif" }}
            >
              Learn More <ArrowRight size={14} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get('/services');
        // Ensure we always have valid data to map over even if API is malformed
        const defaultData = [
          {
            title: "App Publishing",
            description: "End-to-end iOS App Store and Google Play Store deployment, including ASO and compliance checks.",
            tags: ["APP STORE", "PLAY STORE"],
            icon: "upload",
            highlightIcon: "lightning",
            highlightText: "100% Approval Rate"
          },
          {
            title: "Flutter App Development",
            description: "Native-feeling, high-performance mobile apps built once and shipped to both stores — faster timelines, one shared codebase, consistent design across platforms.",
            tags: ["IOS", "ANDROID", "ONE CODEBASE"],
            icon: "mobile",
            highlightIcon: "lightning",
            highlightText: "Single Codebase"
          },
          {
            title: "WordPress Website Development",
            description: "Custom admin dashboards that sync straight to your live site — add a service, set its tags, and it appears on your website instantly, no redeploy needed.",
            tags: ["WEBSITE", "WORDPRESS"],
            icon: "globe",
            highlightIcon: "lightning",
            highlightText: "Real-Time Sync"
          }
        ];
        if (response.data && response.data.length > 0) {
          setServicesData(response.data);
        } else {
          setServicesData(defaultData);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6"
            style={{
              background: "rgba(10,20,40,0.8)",
              border: "1px solid rgba(255,255,255,0.05)",
              color: "var(--primary-accent)",
              fontFamily: "JetBrains Mono, monospace",
              backdropFilter: "blur(12px)"
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--primary-accent)" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            What We Do
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "35px",
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}
          >
            Everything You Need to{" "}
            <span
              style={{
                color: "#60a5fa", // Lighter blue for the highlight exactly as in the screenshot
              }}
            >
              Ship &amp; Scale
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "#8a9bb3", fontFamily: "Inter, sans-serif" }}
          >
            Full-spectrum digital services — design, build, launch, and grow. One team, every skill.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.slice(0, 6).map((s, i) => (
            <TiltCard key={s.title || i} service={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-20"
        >
          <button
            onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--primary-accent)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 0 40px rgba(59,130,246,0.3)",
            }}
          >
            Start a Project <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
