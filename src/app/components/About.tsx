import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "motion/react";
import { Target, Zap, Users, Globe2, Award, Github, Linkedin, Twitter, ChevronRight } from "lucide-react";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  target: Target,
  lightning: Zap,
  users: Users,
  globe: Globe2,
};

function TeamCard({ member, index }: { member: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-60, 60], [8, -8]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-60, 60], [-8, 8]), { stiffness: 280, damping: 28 });
  
  const colors = ["#00aaff", "#a78bfa", "#34d399", "#f472b6"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left - r.width / 2);
          my.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        animate={{
          boxShadow: hovered
            ? `0 20px 60px ${member.color}30, 0 0 0 1px ${member.color}45`
            : "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,170,255,0.07)",
        }}
        style2={{ background: "rgba(8,18,36,0.8)", backdropFilter: "blur(16px)" } as React.CSSProperties}
      >
        {/* Photo area */}
        <div className="relative overflow-hidden" style={{ height: 220 }}>
          <motion.img
            src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format"}
            alt={member.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Gradient */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, rgba(8,18,36,0.95) 100%)` }} />

          {/* Hover social overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-3"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: `${color}18`, backdropFilter: "blur(2px)" }}
          >
            {[
              { icon: Github, link: member.socialLinks?.github }, 
              { icon: Linkedin, link: member.socialLinks?.linkedin }, 
              { icon: Twitter, link: member.socialLinks?.twitter }
            ].map(({icon: Icon, link}, i) => link && link !== '#' ? (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2, delay: i * 0.06 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(5,12,26,0.7)", border: `1px solid ${color}50`, color: color }}
              >
                <Icon size={14} />
              </motion.a>
            ) : null)}
          </motion.div>

          {/* Name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "18px", color: "#e8f4ff" }}>{member.name}</p>
            <p className="text-xs" style={{ color: color, fontFamily: "JetBrains Mono, monospace" }}>{member.role}</p>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4" style={{ background: "rgba(8,18,36,0.9)" }}>
          <p className="text-xs mb-3" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{member.description || member.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {member.skills?.map((s: string) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded" style={{ background: `${color}12`, border: `1px solid ${color}28`, color: color, fontFamily: "JetBrains Mono, monospace" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`, transformOrigin: "center" }}
        />
      </motion.div>
    </motion.div>
  );
}

function ValueCard({ v, i }: { v: any; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  
  const Icon = iconMap[v.icon?.toLowerCase()] || Target;
  const colors = ["#00aaff", "#a78bfa", "#34d399", "#f472b6"];
  const color = colors[i % colors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex gap-4 items-start p-5 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: hovered ? `${color}0e` : "rgba(10,22,40,0.5)",
        border: `1px solid ${hovered ? color + "35" : "rgba(0,170,255,0.08)"}`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 8px 32px ${color}18` : "none",
      }}
    >
      <motion.div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Icon size={20} style={{ color: color }} />
      </motion.div>
      <div>
        <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "16px", color: "#e8f4ff" }}>{v.title || v.label}</p>
        <p className="text-sm mt-0.5" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{v.description || v.desc}</p>
      </div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-3 right-3"
          style={{ color: color }}
        >
          <ChevronRight size={14} />
        </motion.div>
      )}
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
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle section overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(5,12,26,0.3) 0%, rgba(5,12,26,0.6) 50%, rgba(5,12,26,0.3) 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-5"
            style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.2)", color: "#00aaff", fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}
          >
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4ff" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} />
            {aboutData?.badge || "Who We Are"}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: "#e8f4ff", lineHeight: 1.15 }}
            dangerouslySetInnerHTML={{
              __html: aboutData?.title || `Built by Builders, <span style="background: linear-gradient(90deg, #00aaff, #00d4ff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">For Builders</span>`
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
            style={{ background: "linear-gradient(90deg, transparent, #00aaff, #a78bfa, transparent)", transformOrigin: "center" }}
          />
        </div>

        {/* ── Story + Values ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          {/* Left — image with layered card feel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ height: 380 }}>
              <img
                src={aboutData?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&auto=format"}
                alt="Jronix team collaborating"
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
                  style={{ background: "rgba(5,12,26,0.85)", border: "1px solid rgba(0,170,255,0.25)", backdropFilter: "blur(12px)" }}
                >
                  <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "24px", color: "#00d4ff" }}>{aboutData.imageStats[0].value}</p>
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
            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl pointer-events-none" style={{ border: "1px solid rgba(0,170,255,0.15)", zIndex: -1 }} />
            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl pointer-events-none" style={{ border: "1px solid rgba(167,139,250,0.15)", zIndex: -1 }} />
          </motion.div>

          {/* Right — story + values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs mb-2" style={{ color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>{aboutData?.storyTitle || "// our story"}</p>
            <p className="text-base leading-relaxed mb-3" style={{ color: "#c8dff0", fontFamily: "Inter, sans-serif" }}>
              {aboutData?.storyDescription || "Jronix was born in Dhaka with one purpose — to build digital products that genuinely move the needle. We partner with startups and enterprises to design, build, and launch apps, platforms, and AI systems that users love."}
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {aboutData?.mission || "Our mission: deliver world-class software with transparency, speed, and care. Every line of code we write is a commitment to your growth."}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {aboutData?.features?.map((v: any, i: number) => <ValueCard key={v.title} v={v} i={i} />)}
            </div>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#e8f4ff" }}
          >
            Our <span style={{ background: "linear-gradient(90deg, #00aaff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span>
          </motion.h3>
          <div className="relative">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 left-0 right-0 h-px hidden lg:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.3), rgba(167,139,250,0.3), transparent)", transformOrigin: "left" }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {journeyData.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center group cursor-default"
                >
                  {/* Dot */}
                  <motion.div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10"
                    style={{ background: "linear-gradient(135deg, rgba(0,119,204,0.3), rgba(0,212,255,0.2))", border: "1px solid rgba(0,170,255,0.35)", backdropFilter: "blur(8px)" }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 800, fontSize: "13px", color: "#00d4ff" }}>{m.year}</span>
                    <motion.div className="absolute inset-0 rounded-full" initial={{ scale: 1, opacity: 0.4 }} whileHover={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.5 }} style={{ border: "1px solid rgba(0,170,255,0.5)" }} />
                  </motion.div>
                  <p style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "15px", color: "#e8f4ff" }}>{m.title || m.label}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{m.description || m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#e8f4ff" }}>
              The <span style={{ background: "linear-gradient(90deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Minds</span> Behind Jronix
            </h3>
            <p className="mt-2 text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Passionate people who turn ideas into products.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teamData.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(8,18,36,0.6)", border: "1px solid rgba(0,170,255,0.1)", backdropFilter: "blur(16px)" }}
        >
          <p className="text-xs mb-2" style={{ color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>{techData?.badge || "// technologies we master"}</p>
          <h3 className="mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#e8f4ff" }}>{techData?.title || "Our Tech Arsenal"}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techData?.technologies?.map((tech: string, i: number) => {
              const colors = ["#54c5f8", "#61dafb", "#e8f4ff", "#ffd43b", "#009688", "#ffca28", "#21759b", "#f24e1e", "#ff9900", "#2496ed", "#336791", "#47a248"];
              const color = colors[i % colors.length];
              return (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.12, y: -3 }}
                className="px-4 py-2 rounded-xl text-sm cursor-default"
                style={{ background: `${color}10`, border: `1px solid ${color}28`, color: color, fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}
              >
                {tech}
              </motion.span>
            )})}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
