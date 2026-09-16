import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Smartphone, Globe, Server, Pen, Upload, Brain, Layout, ArrowRight, Zap, Code, ExternalLink } from "lucide-react";
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
  code: Code,
};

const cardAccents = [
  { color: "#3b82f6", glow: "rgba(59,130,246,0.15)", gradient: "from-[#3b82f6]/10 to-transparent" },
  { color: "#a78bfa", glow: "rgba(167,139,250,0.15)", gradient: "from-[#a78bfa]/10 to-transparent" },
  { color: "#34d399", glow: "rgba(52,211,153,0.15)", gradient: "from-[#34d399]/10 to-transparent" },
  { color: "#f472b6", glow: "rgba(244,114,182,0.15)", gradient: "from-[#f472b6]/10 to-transparent" },
  { color: "#fbbf24", glow: "rgba(251,191,36,0.15)", gradient: "from-[#fbbf24]/10 to-transparent" },
  { color: "#22d3ee", glow: "rgba(34,211,238,0.15)", gradient: "from-[#22d3ee]/10 to-transparent" },
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon?.toLowerCase()] || Code;
  const HighlightIcon = iconMap[service.highlightIcon?.toLowerCase()] || Zap;
  const accent = cardAccents[index % cardAccents.length];

  return (
    <div
      className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-400"
      style={{
        width: 320,
        height: 340,
        background: hovered
          ? `linear-gradient(135deg, rgba(13,24,48,0.98) 0%, rgba(8,16,32,0.98) 100%)`
          : "rgba(8,18,36,0.7)",
        border: `1px solid ${hovered ? accent.color + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 20px 60px ${accent.glow}, 0 0 0 1px ${accent.color}30` : "0 4px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1.5px] rounded-full transition-all duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "opacity 0.3s, transform 0.4s",
          transformOrigin: "center",
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accent.color}12 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Content */}
      <div className="flex flex-col h-full p-7">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 shrink-0"
          style={{
            background: `${accent.color}12`,
            border: `1px solid ${hovered ? accent.color + "50" : accent.color + "25"}`,
            boxShadow: hovered ? `0 0 20px ${accent.color}25` : "none",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <Icon size={20} style={{ color: accent.color }} />
        </div>

        {/* Tags */}
        {service.tags?.length > 0 && (
          <div className="mb-3">
            <span className="text-[10px] tracking-wider uppercase font-bold" style={{ color: accent.color, fontFamily: "JetBrains Mono, monospace" }}>
              {service.tags.join(" · ")}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold mb-3 leading-snug" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#e8f4ff", letterSpacing: "-0.01em" }}>
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
          {service.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4" style={{ borderTop: `1px solid rgba(255,255,255,0.07)` }}>
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: hovered ? accent.color : "#4a6080", fontFamily: "JetBrains Mono, monospace", transition: "color 0.3s" }}>
            <HighlightIcon size={11} style={{ color: accent.color }} />
            {service.highlightText || "100% Satisfaction"}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs font-bold transition-all duration-300"
            style={{ color: hovered ? accent.color : "#4a6080", transform: hovered ? "translateX(3px)" : "none" }}
          >
            Learn More <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const defaultData = [
    { title: "App Publishing", description: "End-to-end iOS App Store and Google Play Store deployment, including ASO and compliance checks.", tags: ["APP STORE", "PLAY STORE"], icon: "upload", highlightIcon: "lightning", highlightText: "100% Approval Rate" },
    { title: "Flutter App Development", description: "Native-feeling, high-performance mobile apps built once and shipped to both stores — faster timelines, one shared codebase.", tags: ["IOS", "ANDROID"], icon: "mobile", highlightIcon: "lightning", highlightText: "Single Codebase" },
    { title: "WordPress Website Development", description: "Custom admin dashboards that sync straight to your live site — add a service, set its tags, and it appears instantly.", tags: ["WEBSITE", "WORDPRESS"], icon: "globe", highlightIcon: "lightning", highlightText: "Real-Time Sync" },
    { title: "UI/UX Design", description: "Pixel-perfect, conversion-focused interfaces built with Figma. From wireframes to polished design systems.", tags: ["FIGMA", "DESIGN"], icon: "pen", highlightIcon: "lightning", highlightText: "Premium Quality" },
    { title: "Backend & API Development", description: "Scalable REST & GraphQL APIs powered by Node.js, FastAPI or Django — secure, documented, and production-ready.", tags: ["API", "SERVER"], icon: "server", highlightIcon: "lightning", highlightText: "99.9% Uptime" },
    { title: "AI Integration", description: "Integrate OpenAI, Gemini, or custom ML models into your product — chatbots, recommendations, automation.", tags: ["AI", "ML"], icon: "brain", highlightIcon: "lightning", highlightText: "Cutting Edge" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get('/services');
        if (response.data && response.data.length > 0) {
          setServicesData(response.data);
        } else {
          setServicesData(defaultData);
        }
      } catch {
        setServicesData(defaultData);
      }
    };
    fetchServices();
  }, []);

  // Duplicate for seamless infinite loop
  const doubled = [...servicesData, ...servicesData];

  return (
    <section id="services" className="py-10 md:py-16 relative overflow-hidden">
      {/* Marquee CSS */}
      <style>{`
        @keyframes svc-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .svc-track { animation: svc-marquee 35s linear infinite; }
        .svc-track.paused { animation-play-state: paused; }
        .svc-wrapper {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 100%, rgba(167,139,250,0.05) 0%, transparent 60%)" }} />

      {/* Heading — full width center */}
      <div ref={headingRef} className="max-w-4xl mx-auto px-6 text-center mb-8 md:mb-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
            style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            What We Do
          </span>
          <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          <span style={{ color: "#e8f4ff" }}>Everything You Need to </span>
          <span style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #a78bfa 50%, #f472b6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(59,130,246,0.4))"
          }}>
            Ship & Scale
          </span>
        </motion.h2>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 mb-6 h-[2px] w-24 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #3b82f6, #a78bfa, transparent)", transformOrigin: "center" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22 }}
          className="text-base leading-relaxed max-w-xl mx-auto"
          style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
        >
          Full-spectrum digital services — design, build, launch, and grow. One team, every skill.
        </motion.p>
      </div>

      {/* Marquee — full bleed */}
      {servicesData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="svc-wrapper"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={trackRef} className={`svc-track flex gap-5 py-4 ${paused ? "paused" : ""}`} style={{ width: "max-content" }}>
            {doubled.map((s, i) => (
              <ServiceCard key={`${s.title}-${i}`} service={s} index={i % servicesData.length} />
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10 px-6"
      >
        <button
          onClick={() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
          className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 8px 30px rgba(59,130,246,0.35)",
          }}
        >
          Start a Project <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => { const el = document.getElementById("work"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
          className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-white/10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#7aa8cc",
            fontFamily: "Inter, sans-serif",
          }}
        >
          View Our Work <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>
    </section>
  );
}
