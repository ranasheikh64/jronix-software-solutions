import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {  Play, Smartphone, Globe, Brain, Pen, Flame, Zap, Cloud, Container } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";
import heroBgImg from "../../imports/hero_bg_new.png";
import apiClient from "../../api/client";

const techIcons = [
  { name: "Flutter", color: "#54c5f8" },
  { name: "React", color: "#61dafb" },
  { name: "Python", color: "#ffd43b" },
  { name: "Figma", color: "#f24e1e" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Next.js", color: "#e8f4ff" },
  { name: "FastAPI", color: "#009688" },
];


export function Hero() {
  const [heroData, setHeroData] = useState<any>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await apiClient.get('/hero');
        setHeroData(response.data);
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchHeroData();
  }, []);

  const typewriterWords = (heroData?.titles?.length > 0) ? heroData.titles.map((t: string) => t.replace(/^We Build /i, '')) : ["Digital Products", "Mobile Apps", "Web Platforms", "AI Solutions"];

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    if (!word) return;

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % typewriterWords.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, typewriterWords]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative lg:min-h-screen lg:flex lg:items-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-[#020617]/75" />

      <div className="max-w-7xl mx-auto px-6 pt-28 sm:pt-32 pb-8 md:pb-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs mb-4 sm:mb-6" style={{ background: "var(--primary-accent-glow)", border: "1px solid var(--primary-accent)", color: "#fff", fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(8px)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary-accent)" }} />
              {heroData?.badge || "Software Solutions"}
            </div>

            <h1 style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.8vw, 3.55rem)", lineHeight: 1.15, color: "#e8f4ff" }}>
              {heroData?.title || "We Build"}
              <br />
              <span style={{ background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {displayed}
                <span className="animate-pulse" style={{ WebkitTextFillColor: "var(--primary-accent)" }}>|</span>
              </span>
              <br />{heroData?.subtitle || "That Matter"}
            </h1>

            <p className="mt-3.5 sm:mt-6 text-[13px] sm:text-[15px] leading-relaxed max-w-lg" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {heroData?.description || "From idea to launch — we craft high-performance apps, platforms, and AI systems that drive real business impact."}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 mt-5 sm:mt-8">
              <button
                onClick={() => scrollTo(heroData?.primaryButtonLink || "work")}
                className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--primary-gradient)", color: "#fff", fontFamily: "Inter, sans-serif" }}
              >
                {heroData?.primaryButtonText || "View Our Work"}
              </button>
              <button
                onClick={() => scrollTo(heroData?.secondaryButtonLink || "contact")}
                className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-white/5"
                style={{ border: "1px solid var(--primary-accent)", color: "var(--primary-accent)", fontFamily: "Inter, sans-serif", backdropFilter: "blur(8px)" }}
              >
                <Play size={13} fill="currentColor" /> {heroData?.secondaryButtonText || "Talk to Us"}
              </button>
            </div>

            <div className="mt-6 sm:mt-12">
              {/* <p className="text-xs mb-3" style={{ color: "#7aa8cc", fontFamily: "JetBrains Mono, monospace" }}>// tech we use</p> */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techIcons.map((t) => (
                  <span
                    key={t.name}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs transition-all duration-200 hover:scale-105"
                    style={{ background: "var(--primary-accent)", border: "1px solid var(--primary-accent)", color: "#fff", fontFamily: "JetBrains Mono, monospace", backdropFilter: "blur(6px)" }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>   {/* Tech stack */}

          </motion.div>

          {/* Right: Logo orbital */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[440px] h-[440px] flex items-center justify-center">
              <motion.div className="absolute inset-0 rounded-full" style={{ border: "2px dashed var(--primary-accent)" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }} />
              <motion.div className="absolute inset-12 rounded-full" style={{ border: "2px solid var(--primary-accent)" }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }} />
              <motion.div className="absolute inset-20 rounded-full" style={{ border: "2px dashed rgba(0,212,255,0.25)" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} />

              <motion.div
                className="relative z-10 rounded-full overflow-hidden"
                style={{ width: 180, height: 180, border: "2px solid var(--primary-accent)", backdropFilter: "blur(20px)", background: "rgba(1,5,21,0.5)" }}
                animate={{ boxShadow: ["0 0 40px var(--primary-accent)", "0 0 80px rgba(0,212,255,0.35)", "0 0 40px var(--primary-accent)"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <ImageWithFallback src={logoImg} alt="Jronix Software Solutions" className="w-full h-full object-contain" />
              </motion.div>

              {/* Outer orbit — clockwise, text always upright */}
              {[
                { label: "Flutter", color: "#54c5f8", Icon: Smartphone },
                { label: "React", color: "#61dafb", Icon: Globe },
                { label: "Python", color: "#ffd43b", Icon: Brain },
                { label: "Figma", color: "#f24e1e", Icon: Pen },
                { label: "Firebase", color: "#ffca28", Icon: Flame },
              ].map((tech, i, arr) => {
                const startDeg = (i / arr.length) * 360;
                const STEPS = 72;
                const duration = 80;
                const cx = 220, cy = 220, r = 205;
                const xs = Array.from({ length: STEPS + 1 }, (_, s) => {
                  const deg = startDeg + (s / STEPS) * 360;
                  return cx + r * Math.cos((deg * Math.PI) / 180);
                });
                const ys = Array.from({ length: STEPS + 1 }, (_, s) => {
                  const deg = startDeg + (s / STEPS) * 360;
                  return cy + r * Math.sin((deg * Math.PI) / 180);
                });
                return (
                  <motion.div
                    key={tech.label}
                    className="absolute"
                    style={{ left: 0, top: 0 }}
                    animate={{ x: xs, y: ys }}
                    transition={{ repeat: Infinity, duration, ease: "linear" }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs"
                      style={{
                        transform: "translate(-50%, -50%)",
                        background: `${tech.color}30`,
                        border: `1.5px solid ${tech.color}cc`,
                        color: tech.color,
                        fontFamily: "JetBrains Mono, monospace",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        boxShadow: `0 0 14px ${tech.color}70, inset 0 0 8px ${tech.color}15`,
                        backdropFilter: "blur(8px)",
                        textShadow: `0 0 8px ${tech.color}90`,
                      }}
                    >
                      <tech.Icon size={11} />
                      {tech.label}
                    </div>
                  </motion.div>
                );
              })}

              {/* Inner orbit — counter-clockwise, text always upright */}
              {[
                { label: "Next.js", color: "#e8f4ff", Icon: Zap },
                { label: "FastAPI", color: "#009688", Icon: Zap },
                { label: "AWS", color: "#ff9900", Icon: Cloud },
                { label: "Docker", color: "#2496ed", Icon: Container },
              ].map((tech, i, arr) => {
                const startDeg = (i / arr.length) * 360 + 45;
                const STEPS = 72;
                const duration = 60;
                const cx = 220, cy = 220, r = 145;
                const xs = Array.from({ length: STEPS + 1 }, (_, s) => {
                  const deg = startDeg - (s / STEPS) * 360; // counter-clockwise
                  return cx + r * Math.cos((deg * Math.PI) / 180);
                });
                const ys = Array.from({ length: STEPS + 1 }, (_, s) => {
                  const deg = startDeg - (s / STEPS) * 360;
                  return cy + r * Math.sin((deg * Math.PI) / 180);
                });
                return (
                  <motion.div
                    key={tech.label}
                    className="absolute"
                    style={{ left: 0, top: 0 }}
                    animate={{ x: xs, y: ys }}
                    transition={{ repeat: Infinity, duration, ease: "linear" }}
                  >
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{
                        transform: "translate(-50%, -50%)",
                        background: `${tech.color}28`,
                        border: `1.5px solid ${tech.color}bb`,
                        color: tech.color,
                        fontFamily: "JetBrains Mono, monospace",
                        whiteSpace: "nowrap",
                        fontSize: "10px",
                        fontWeight: 700,
                        boxShadow: `0 0 12px ${tech.color}65, inset 0 0 6px ${tech.color}12`,
                        backdropFilter: "blur(8px)",
                        textShadow: `0 0 6px ${tech.color}80`,
                      }}
                    >
                      <tech.Icon size={10} />
                      {tech.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hidden sm:flex absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button
          onClick={() => scrollTo("services")}
          className="group flex flex-col items-center gap-3 focus:outline-none"
        >
          <div 
            className="w-[22px] h-[36px] rounded-full flex justify-center p-1 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            style={{ border: "2px solid rgba(122,168,204,0.3)", backgroundColor: "rgba(5,12,26,0.5)", backdropFilter: "blur(4px)" }}
          >
            <motion.div 
              className="w-1 h-1.5 rounded-full"
              style={{ background: "var(--primary-accent)" }}
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          <span 
            className="text-[9px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 group-hover:text-white" 
            style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}
          >
            Scroll
          </span>
        </button>
      </motion.div>
    </section>
  );
}
