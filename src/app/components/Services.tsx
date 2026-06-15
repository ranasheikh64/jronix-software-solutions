import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "motion/react";
import { Smartphone, Globe, Server, Pen, Upload, Brain, Layout, ArrowRight, Zap } from "lucide-react";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  mobile: Smartphone,
  globe: Globe,
  server: Server,
  pen: Pen,
  upload: Upload,
  brain: Brain,
  layout: Layout,
  lightning: Zap
};

function TiltCard({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-12, 12]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Icon = iconMap[service.icon?.toLowerCase()] || Server;
  const HighlightIcon = iconMap[service.highlightIcon?.toLowerCase()] || Zap;
  
  const colors = ["#54c5f8", "#00aaff", "#00d4ff", "#a78bfa", "#34d399", "#f472b6", "#fb923c"];
  const color = colors[index % colors.length];
  const glow = `rgba(${parseInt(color.slice(1,3), 16)},${parseInt(color.slice(3,5), 16)},${parseInt(color.slice(5,7), 16)},0.15)`;

  // Stagger: alternate slide from left/right
  const xInitial = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInitial, y: 30 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        className="relative rounded-2xl p-6 cursor-pointer h-full"
        animate={{
          boxShadow: hovered
            ? `0 20px 60px ${glow}, 0 0 0 1px ${color}40`
            : `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,170,255,0.08)`,
          background: hovered
            ? `linear-gradient(135deg, ${glow} 0%, rgba(10,22,40,0.95) 60%)`
            : "linear-gradient(135deg, rgba(13,31,60,0.7), rgba(10,22,40,0.9))",
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Animated top border glow */}
        <motion.div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Icon with ring pulse */}
        <div className="relative mb-5">
          <motion.div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: `${color}18`, border: `1px solid ${color}35` }}
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Icon size={24} style={{ color: color }} />
          </motion.div>
        </div>

        {/* Tag */}
        <div className="mb-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: `${color}12`,
              border: `1px solid ${color}25`,
              color: color,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {service.tags?.join(" · ")}
          </span>
        </div>

        <h3
          className="mb-2"
          style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "19px", color: "#e8f4ff" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
        >
          {service.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="flex items-center gap-1.5 text-xs"
            style={{ color: color, fontFamily: "JetBrains Mono, monospace" }}
          >
            <HighlightIcon size={11} fill="currentColor" /> {service.highlightText}
          </span>
          <motion.div
            className="flex items-center gap-1 text-xs"
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
            style={{ color: color, fontFamily: "Inter, sans-serif" }}
          >
            Learn More <ArrowRight size={12} />
          </motion.div>
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
        setServicesData(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,120,200,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Subtle horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.15), transparent)", top: "30%" }}
        animate={{ top: ["20%", "80%", "20%"], opacity: [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5"
            style={{
              background: "rgba(0,170,255,0.08)",
              border: "1px solid rgba(0,170,255,0.2)",
              color: "#00aaff",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#00d4ff" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
            What We Do
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
              color: "#e8f4ff",
              lineHeight: 1.15,
            }}
          >
            Everything You Need to{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00aaff, #00d4ff, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ship &amp; Scale
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            Full-spectrum digital services — design, build, launch, and grow. One team, every skill.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-px w-32"
            style={{
              background: "linear-gradient(90deg, transparent, #00aaff, #00d4ff, transparent)",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.slice(0, 6).map((s, i) => (
            <TiltCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* 7th card — centered */}
        {servicesData.length > 6 && (
          <div className="mt-5 flex justify-center">
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <TiltCard service={servicesData[6]} index={6} />
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <button
            onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #0077cc, #00d4ff)",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 0 30px rgba(0,170,255,0.25)",
            }}
          >
            Start a Project
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            >
              <ArrowRight size={15} />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
