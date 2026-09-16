import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Target, Zap, Users, Globe2, Award, Github, Linkedin, Twitter, ChevronRight, Lightbulb, Cpu } from "lucide-react";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  target: Target,
  lightning: Zap,
  users: Users,
  globe: Globe2,
};

function TeamCard({ member, index }: { member: any; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const accentColors = ["var(--primary-accent)", "#a78bfa", "#34d399", "#f472b6"];
  const color = accentColors[index % accentColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer group"
      style={{ perspective: "1000px", height: 380 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          <div className="relative w-full h-[230px] overflow-hidden">
            <img
              src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a1120&color=3b82f6&size=300`}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(5,12,26,1) 100%)` }} />
            {/* Role badge */}
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${color}20`, border: `1px solid ${color}50`, color: color, fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}
            >
              {member.role}
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "rgba(5,12,26,0.95)", borderTop: `1px solid ${color}20` }}>
            <h4 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "20px", color: "#e8f4ff" }} className="mb-1">
              {member.name}
            </h4>
            <p className="text-xs mb-3" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {(member.description || member.bio || "").slice(0, 70)}{(member.description || member.bio || "").length > 70 ? "…" : ""}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.skills?.slice(0, 3).map((s: string) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${color}12`, border: `1px solid ${color}28`, color: color, fontFamily: "JetBrains Mono, monospace" }}>
                  {s}
                </span>
              ))}
              {member.skills?.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#7aa8cc", fontFamily: "JetBrains Mono, monospace" }}>
                  +{member.skills.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Left color bar */}
          <div className="absolute top-0 left-0 bottom-0 w-1" style={{ background: color, boxShadow: `2px 0 15px ${color}60` }} />

          {/* Hover hint */}
          <motion.div
            className="absolute bottom-3 right-4 text-xs"
            animate={{ opacity: flipped ? 0 : [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: color, fontFamily: "Inter, sans-serif" }}
          >
            hover for more ›
          </motion.div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, rgba(5,12,26,0.98) 0%, rgba(10,17,32,0.98) 100%)`,
            border: `1px solid ${color}40`,
            boxShadow: `0 20px 60px ${color}20, inset 0 0 30px ${color}08`
          }}
        >
          {/* Top accent */}
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

          <div className="flex-1 p-6 flex flex-col">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative shrink-0">
                <img
                  src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a1120&color=3b82f6&size=100`}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: `2px solid ${color}` }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: color, fontSize: "8px", color: "#fff", fontWeight: 700 }}
                >
                  ✓
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "18px", color: "#e8f4ff" }}>
                  {member.name}
                </h4>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${color}20`, color: color, fontFamily: "JetBrains Mono, monospace" }}
                >
                  {member.role}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#a8c4dd", fontFamily: "Inter, sans-serif" }}>
              {member.description || member.bio || "Passionate team member driving innovation at Jronix Software Solutions."}
            </p>

            {/* All Skills */}
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Expertise</p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills?.map((s: string) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${color}12`, border: `1px solid ${color}28`, color: color, fontFamily: "JetBrains Mono, monospace" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${color}20` }}>
              {[
                { icon: Github, link: member.socialLinks?.github, label: "GitHub" },
                { icon: Linkedin, link: member.socialLinks?.linkedin, label: "LinkedIn" },
                { icon: Twitter, link: member.socialLinks?.twitter, label: "Twitter" }
              ].filter(({ link }) => link && link !== '#').map(({ icon: Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}40`, color: color }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ValueCard({ v, i }: { v: any; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const Icon = iconMap[v.icon?.toLowerCase()] || Target;
  const colors = ["var(--primary-accent)", "#a78bfa", "#34d399", "#f472b6"];
  const color = colors[i % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-start p-3.5 sm:p-5 rounded-2xl transition-all duration-500 cursor-default group overflow-hidden"
      style={{
        background: hovered ? `linear-gradient(135deg, rgba(15,28,48,0.7) 0%, ${color}0a 100%)` : "rgba(10,22,40,0.5)",
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: hovered ? `0 12px 40px -10px ${color}25, inset 0 0 20px ${color}05` : "0 4px 20px -10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{ background: `radial-gradient(circle at 100% 0%, ${color}15 0%, transparent 70%)` }} 
      />

      <motion.div
        className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ 
          background: hovered ? `${color}15` : "rgba(255,255,255,0.03)", 
          border: `1px solid ${hovered ? color + "30" : "rgba(255,255,255,0.05)"}`
        }}
        animate={{ scale: hovered ? 1.08 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon size={18} className="sm:w-[22px] sm:h-[22px]" style={{ color: hovered ? color : "#8eaac2", transition: "color 0.3s ease" }} />
      </motion.div>
      <div className="relative z-10">
        <h4 
          style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, color: hovered ? "#ffffff" : "#e8f4ff", transition: "color 0.3s ease" }}
          className="text-[15px] sm:text-lg leading-tight"
        >
          {v.title || v.label}
        </h4>
        <p className="text-[11px] sm:text-sm mt-1 leading-relaxed" style={{ color: "#8eaac2", fontFamily: "Inter, sans-serif" }}>
          {v.description || v.desc}
        </p>
      </div>
      
      {/* Animated subtle corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"
           style={{ background: `radial-gradient(circle at top right, ${color}30, transparent 70%)` }} />
    </motion.div>
  );
}

export function About() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [journeyData, setJourneyData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [techData, setTechData] = useState<any>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Auto-play prevented", e));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, journeyRes, teamRes, techRes] = await Promise.all([
          apiClient.get('/about'),
          apiClient.get('/journey'),
          apiClient.get('/team'),
          apiClient.get('/tech'),
        ]);
        setAboutData(aboutRes.data);
        setJourneyData(journeyRes.data);
        setTeamData(teamRes.data);
        setTechData(techRes.data);
      } catch (error) {
        console.error("Error fetching about section data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="py-10 md:py-16 relative overflow-hidden">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,12,26,0.3) 0%, rgba(5,12,26,0.6) 50%, rgba(5,12,26,0.3) 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }} />
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary-accent)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              {aboutData?.badge || "Who We Are"}
            </span>
            <div className="h-[1px] w-12 opacity-60" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#e8f4ff", lineHeight: 1.05, letterSpacing: "-0.025em" }}
            dangerouslySetInnerHTML={{
              __html: aboutData?.title || `Built by Builders, <span style="background: linear-gradient(135deg, var(--primary-accent) 0%, #a78bfa 60%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 25px rgba(59,130,246,0.4));">For Builders</span>`
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
          >
            {aboutData?.subtitle || "We are a Dhaka-based software agency obsessed with craft, speed, and results."}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mx-auto mt-5 h-px w-36"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)", transformOrigin: "center" }}
          />
        </div>

        {/* ── Story + Values ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 md:mb-16">
          {/* Left — image with layered card feel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 380 }}>
              <video
                ref={videoRef}
                src={`${import.meta.env.BASE_URL}A_professional_D_logo_animati.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,12,26,0.5) 0%, transparent 60%, rgba(5,12,26,0.4) 100%)" }} />
              {/* Floating stat chips */}
              {aboutData?.imageStats?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-4 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(5,12,26,0.85)", border: "1px solid var(--primary-accent)", backdropFilter: "blur(12px)" }}
                >
                  <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--primary-accent)" }}>{aboutData.imageStats[0].value}</p>
                  <p className="text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{aboutData.imageStats[0].label}</p>
                </motion.div>
              )}
              {aboutData?.imageStats?.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 }}
                  className="absolute bottom-4 right-4 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(5,12,26,0.85)", border: "1px solid rgba(167,139,250,0.25)", backdropFilter: "blur(12px)" }}
                >
                  <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "24px", color: "#a78bfa" }}>{aboutData.imageStats[1].value}</p>
                  <p className="text-xs" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{aboutData.imageStats[1].label}</p>
                </motion.div>
              )}
              {/* Award badge */}
              {aboutData?.imageBadge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", backdropFilter: "blur(8px)" }}
                >
                  <Award size={14} style={{ color: "#fbbf24" }} />
                  <span className="text-xs" style={{ color: "#fbbf24", fontFamily: "JetBrains Mono, monospace" }}>{aboutData.imageBadge}</span>
                </motion.div>
              )}
            </div>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl pointer-events-none" style={{ border: "1px solid var(--primary-accent-glow)", zIndex: -1 }} />
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl pointer-events-none" style={{ border: "1px solid rgba(167,139,250,0.15)", zIndex: -1 }} />
          </motion.div>

          {/* Right — story + values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs mb-2" style={{ color: "var(--primary-accent)", fontFamily: "JetBrains Mono, monospace" }}>{aboutData?.storyTitle || "// our story"}</p>
            <p className="text-base leading-relaxed mb-3" style={{ color: "#c8dff0", fontFamily: "Inter, sans-serif" }}>
              {aboutData?.storyDescription || "Jronix was born in Dhaka with one purpose — to build digital products that genuinely move the needle. We partner with startups and enterprises to design, build, and launch apps, platforms, and AI systems that users love."}
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {aboutData?.mission || "Our mission: deliver world-class software with transparency, speed, and care. Every line of code we write is a commitment to your growth."}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {aboutData?.features?.map((v: any, i: number) => <ValueCard key={v.title} v={v} i={i} />)}
            </div>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 3.5vw, 2.5rem)", color: "#ffffff" }}
          >
            Our <span style={{ color: "#3b82f6" }}>Journey</span>
          </motion.h3>

          {/* Desktop & Tablet Timeline */}
          <div className="relative max-w-6xl mx-auto px-4 hidden md:block">
            {/* Glowing Horizontal Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[32px] left-0 right-0 h-[2px] bg-blue-500/20"
              style={{ boxShadow: "0 0 15px 2px rgba(59, 130, 246, 0.3)", transformOrigin: "left" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-70" />
            </motion.div>

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {journeyData.slice(0, 4).map((m, i) => {
                const icons = [Lightbulb, Users, Cpu, Globe2];
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    {/* Circle Node */}
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative mb-4"
                      style={{
                        background: "rgba(15, 23, 42, 0.85)",
                        border: "2px solid #3b82f6",
                        boxShadow: "0 0 25px 2px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.2)",
                        backdropFilter: "blur(12px)"
                      }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 35px 5px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.3)" }}
                    >
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px", color: "#ffffff" }}>{m.year}</span>
                    </motion.div>

                    {/* Vertical Connector */}
                    <div className="w-px h-6 bg-blue-500/40 mb-2 relative" style={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }} />

                    {/* Content Card */}
                    <div
                      className="w-full p-5 rounded-xl transition-colors duration-300 flex flex-col"
                      style={{
                        background: "rgba(15, 23, 42, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        backdropFilter: "blur(12px)",
                        minHeight: "140px"
                      }}
                    >
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <h4 className="font-semibold text-blue-400 text-sm leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                          {m.title || m.label}
                        </h4>
                        <Icon size={18} className="text-slate-400 shrink-0" strokeWidth={1.5} />
                      </div>
                      <p className="text-[13px] text-slate-300 leading-relaxed text-left" style={{ fontFamily: "Inter, sans-serif" }}>
                        {m.description || m.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden relative px-4 mt-4">
            <div className="absolute top-0 bottom-0 left-[39px] w-[2px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }} />
            <div className="space-y-8 relative z-10">
              {journeyData.slice(0, 4).map((m, i) => {
                const icons = [Lightbulb, Users, Cpu, Globe2];
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-5 relative"
                  >
                    <motion.div
                      className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center relative mt-1"
                      style={{
                        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.2))",
                        border: "2px solid rgba(59, 130, 246, 0.7)",
                        boxShadow: "0 0 20px 2px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.2)",
                        backdropFilter: "blur(8px)"
                      }}
                    >
                      <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8f4ff" }}>{m.year}</span>
                    </motion.div>
                    
                    <div
                      className="flex-1 p-5 rounded-2xl"
                      style={{ 
                        background: "linear-gradient(135deg, rgba(10, 20, 38, 0.7), rgba(15, 28, 50, 0.4))", 
                        border: "1px solid rgba(59, 130, 246, 0.15)",
                        boxShadow: "0 8px 32px -5px rgba(0,0,0,0.4)",
                        backdropFilter: "blur(12px)" 
                      }}
                    >
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <h4 className="font-semibold text-[17px] leading-tight" style={{ fontFamily: "Rajdhani, sans-serif", color: "#60a5fa" }}>
                          {m.title || m.label}
                        </h4>
                        <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <Icon size={14} />
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-300/90 leading-relaxed text-left" style={{ fontFamily: "Inter, sans-serif" }}>
                        {m.description || m.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[var(--primary-accent)] opacity-50"></div>
              <span className="inline-block py-1 px-4 rounded-full border border-[rgba(255,255,255,0.08)] text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.02)" }}>
                Meet The Team
              </span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[var(--primary-accent)] opacity-50"></div>
            </div>
            <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#e8f4ff", lineHeight: 1.2 }}>
              The <span style={{ background: "linear-gradient(90deg, var(--primary-accent), #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Minds</span> Behind Jronix
            </h3>
            <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Passionate visionaries who transform ideas into world-class digital products. Hover over a card to learn more.</p>
            <div className="mx-auto mt-4 h-px w-28" style={{ background: "linear-gradient(90deg, transparent, var(--primary-accent), #a78bfa, transparent)" }} />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamData.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div className="relative">
          {/* Marquee CSS */}
          <style>{`
            @keyframes marquee-ltr {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-rtl {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .marquee-ltr { animation: marquee-ltr 28s linear infinite; }
            .marquee-rtl { animation: marquee-rtl 22s linear infinite; }
            .marquee-track { display: flex; width: max-content; }
            .marquee-wrap {
              overflow: hidden;
              mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
            .marquee-track:hover .marquee-ltr,
            .marquee-track:hover .marquee-rtl {
              animation-play-state: paused;
            }
          `}</style>

          {/* Ambient background glow for Tech Stack */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[240px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none -z-10" />

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-10 opacity-50" style={{ background: "linear-gradient(to right, transparent, var(--primary-accent))" }}></div>
              <span className="inline-block py-1 px-4 rounded-full text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)" }}>
                {techData?.badge || "Technologies We Master"}
              </span>
              <div className="h-[1px] w-10 opacity-50" style={{ background: "linear-gradient(to left, transparent, var(--primary-accent))" }}></div>
            </div>
            <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#e8f4ff", lineHeight: 1.2 }}>
              {(() => {
                const title = techData?.title || "Our Tech Arsenal";
                if (title.toLowerCase().includes("tech arsenal")) {
                  const prefix = title.replace(/tech arsenal/i, "").trim();
                  return (
                    <>
                      {prefix ? `${prefix} ` : "Our "}
                      <span style={{ color: "var(--primary-accent)", textShadow: "0 0 25px rgba(59,130,246,0.5)" }}>Tech Arsenal</span>
                    </>
                  );
                }
                return (
                  <>
                    {title} <span style={{ color: "var(--primary-accent)", textShadow: "0 0 25px rgba(59,130,246,0.5)" }}>Tech Arsenal</span>
                  </>
                );
              })()}
            </h3>
            <p className="mt-3 text-xs sm:text-sm max-w-md mx-auto px-4" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              Battle-tested tools and technologies we use to build world-class digital products.
            </p>
          </motion.div>

          {/* Tech Cards Marquee — Left to Right */}
          {(() => {
            const techColors: Record<string, { color: string; emoji: string }> = {
              Flutter: { color: "#54c5f8", emoji: "🐦" },
              React: { color: "#61dafb", emoji: "⚛️" },
              "Next.js": { color: "#e8f4ff", emoji: "▲" },
              Python: { color: "#ffd43b", emoji: "🐍" },
              FastAPI: { color: "#009688", emoji: "⚡" },
              Firebase: { color: "#ffca28", emoji: "🔥" },
              WordPress: { color: "#21759b", emoji: "📝" },
              Figma: { color: "#f24e1e", emoji: "🎨" },
              AWS: { color: "#ff9900", emoji: "☁️" },
              Docker: { color: "#2496ed", emoji: "🐳" },
              PostgreSQL: { color: "#336791", emoji: "🐘" },
              MongoDB: { color: "#47a248", emoji: "🍃" },
              appstore: { color: "#a78bfa", emoji: "🍎" },
              "Google play store": { color: "#34d399", emoji: "▶️" },
            };
            const defaultColors = ["#54c5f8","#61dafb","#e8f4ff","#ffd43b","#009688","#ffca28","#21759b","#f24e1e","#ff9900","#2496ed","#336791","#47a248","#a78bfa","#34d399"];
            const technologies: string[] = techData?.technologies || ["Flutter","React","Next.js","Python","FastAPI","Firebase","WordPress","Figma","AWS","Docker","PostgreSQL","MongoDB","appstore","Google play store"];
            // Duplicate for seamless loop
            const doubled = [...technologies, ...technologies];

            const TechCard = ({ tech, i }: { tech: string; i: number }) => {
              const info = techColors[tech] || { color: defaultColors[i % defaultColors.length], emoji: "💡" };
              return (
                <div
                  className="group relative flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-2xl cursor-default text-center mx-1.5 sm:mx-2 shrink-0 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    width: 124,
                    background: "linear-gradient(145deg, rgba(12,22,40,0.85) 0%, rgba(6,13,26,0.92) 100%)",
                    border: `1px solid ${info.color}30`,
                    boxShadow: `0 8px 24px -6px ${info.color}18`,
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${info.color}25 0%, transparent 70%)` }}
                  />
                  <div 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl relative z-10 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${info.color}20, ${info.color}08)`, 
                      border: `1px solid ${info.color}40`,
                      boxShadow: `0 0 15px ${info.color}20` 
                    }}
                  >
                    {info.emoji}
                  </div>
                  <span className="text-xs font-semibold relative z-10 text-slate-200 group-hover:text-white transition-colors duration-300 leading-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {tech}
                  </span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 group-hover:w-3/4 rounded-full transition-all duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${info.color}, transparent)` }} />
                </div>
              );
            };

            return (
              <div className="marquee-wrap mb-4">
                <div className="marquee-track py-2">
                  <div className="marquee-ltr flex">
                    {doubled.map((tech, i) => <TechCard key={`tech-${i}`} tech={tech} i={i} />)}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Stats Marquee — Right to Left */}
          {(() => {
            const stats = [
              { label: "Technologies", value: `${techData?.technologies?.length || 14}+`, color: "var(--primary-accent)", emoji: "🚀" },
              { label: "Years Experience", value: "3+", color: "#a78bfa", emoji: "📅" },
              { label: "Projects Delivered", value: "50+", color: "#34d399", emoji: "✅" },
              { label: "Happy Clients", value: "30+", color: "#f472b6", emoji: "❤️" },
              { label: "Countries Served", value: "5+", color: "#ffca28", emoji: "🌍" },
              { label: "Team Members", value: "10+", color: "#61dafb", emoji: "👥" },
            ];
            const doubled = [...stats, ...stats];

            return (
              <div className="marquee-wrap mt-4 sm:mt-6">
                <div className="marquee-track py-2">
                  <div className="marquee-rtl flex">
                    {doubled.map((stat, i) => (
                      <div
                        key={`stat-${i}`}
                        className="group flex items-center gap-3.5 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl mx-1.5 sm:mx-2 shrink-0 cursor-default transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: "linear-gradient(145deg, rgba(12,22,40,0.85) 0%, rgba(6,13,26,0.92) 100%)",
                          border: `1px solid ${stat.color}35`,
                          boxShadow: `0 8px 24px -8px ${stat.color}20, inset 0 0 15px ${stat.color}05`,
                          backdropFilter: "blur(14px)",
                          minWidth: 175,
                        }}
                      >
                        <div 
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                          style={{
                            background: `${stat.color}15`,
                            border: `1px solid ${stat.color}35`
                          }}
                        >
                          {stat.emoji}
                        </div>
                        <div>
                          <div style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.55rem", color: stat.color, textShadow: `0 0 16px ${stat.color}50`, lineHeight: 1.1 }}>
                            {stat.value}
                          </div>
                          <div className="text-[11px] sm:text-xs mt-0.5 whitespace-nowrap" style={{ color: "#8eb2d1", fontFamily: "Inter, sans-serif" }}>{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
}
