import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await apiClient.get('/footer');
        setFooterData(response.data);
      } catch (error) {
        console.error("Failed to fetch footer:", error);
      }
    };
    fetchFooter();
  }, []);

  const description = footerData?.description || "Building digital products that matter — from Dhaka to the world.";
  const socialLinks = footerData?.socialLinks || [
    { platform: "github", url: "#" },
    { platform: "twitter", url: "#" },
    { platform: "linkedin", url: "#" },
    { platform: "instagram", url: "#" }
  ];
  const quickLinks = footerData?.quickLinks || ["Home", "About", "Services", "Work", "Blog", "Contact"].map(name => ({ name }));
  const serviceLinks = footerData?.servicesLinks || ["App Development", "Web Development", "AI Development", "UI/UX Design", "App Publishing", "WordPress"].map(name => ({ name }));
  const bottomLinks = footerData?.bottomLinks || ["Privacy Policy", "Terms of Service"].map(name => ({ name }));
  const copyrightText = footerData?.copyrightText || "© 2025 Jronix. All rights reserved.";

  return (
    <footer style={{ background: "#020a16", borderTop: "1px solid rgba(0,170,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ImageWithFallback
                src={logoImg}
                alt="Jronix logo"
                className="w-9 h-9 object-contain rounded-full"
              />
              <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "20px", color: "#e8f4ff" }}>Jronix</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}>
              {description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link: any, i: number) => {
                const Icon = iconMap[link.platform?.toLowerCase()] || Github;
                return (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ background: "rgba(0,170,255,0.08)", border: "1px solid rgba(0,170,255,0.15)", color: "#7aa8cc" }}>
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>Quick Links</p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link: any) => (
                <li key={link.name || link}>
                  <button
                    onClick={() => { const el = document.getElementById((link.name || link).toLowerCase()); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}
                  >
                    {link.name || link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>Services</p>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((s: any) => (
                <li key={s.name || s}>
                  <span className="text-sm" style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}>{s.name || s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <p className="text-xs mb-4 uppercase tracking-widest" style={{ color: "#00aaff", fontFamily: "JetBrains Mono, monospace" }}>Newsletter</p>
            <p className="text-sm mb-4" style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}>Get insights on tech, AI, and our latest work.</p>
            {subscribed ? (
              <p className="text-sm" style={{ color: "#34d399", fontFamily: "Inter, sans-serif" }}>Thanks for subscribing!</p>
            ) : (
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-l-lg text-sm outline-none w-full"
                  style={{ background: "#0d1f3c", border: "1px solid rgba(0,170,255,0.15)", borderRight: "none", color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="px-3 py-2.5 rounded-r-lg"
                  style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)", color: "#fff" }}
                >
                  <Send size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8" style={{ borderTop: "1px solid rgba(0,170,255,0.07)" }}>
          <p className="text-xs" style={{ color: "#3a6080", fontFamily: "Inter, sans-serif" }}>
            {copyrightText}
          </p>
          <div className="flex gap-4">
            {bottomLinks.map((link: any) => (
              <span key={link.name || link} className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: "#3a6080", fontFamily: "Inter, sans-serif" }}>{link.name || link}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 w-10 h-10 rounded-full flex items-center justify-center z-40 transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(0,170,255,0.15)", border: "1px solid rgba(0,170,255,0.3)", color: "#00aaff" }}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
