import { Github, Twitter, Linkedin, Instagram, ArrowUp, Send, Facebook, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";
import footerBg from "../../imports/footer_bg.png";
import apiClient from "../../api/client";

const iconMap: Record<string, any> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerData, setFooterData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [footerRes, servicesRes] = await Promise.all([
          apiClient.get('/footer'),
          apiClient.get('/services')
        ]);
        setFooterData(footerRes.data);
        setServicesData(servicesRes.data);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const description = footerData?.description || "Building digital products that matter. We transform ideas into scalable, beautiful, and high-performance software.";
  
  const socialLinks = footerData?.socialLinks || [
    { platform: "github", url: "#" },
    { platform: "twitter", url: "#" },
    { platform: "linkedin", url: "#" },
    { platform: "instagram", url: "#" }
  ];
  
  const quickLinks = footerData?.quickLinks?.length > 0 
    ? footerData.quickLinks 
    : ["Home", "About", "Services", "Work", "Blog", "Contact"].map(name => ({ name }));

  const serviceLinks = servicesData?.length > 0
    ? servicesData.slice(0, 6).map((s: any) => ({ name: s.title, url: "#" }))
    : footerData?.servicesLinks?.length > 0 ? footerData.servicesLinks : ["App Development", "Web Development", "AI Integration", "UI/UX Design", "Backend Systems"].map(name => ({ name }));

  const bottomLinks = footerData?.bottomLinks?.length > 0 
    ? footerData.bottomLinks 
    : ["Privacy Policy", "Terms of Service", "Cookie Policy"].map(name => ({ name }));
    
  const copyrightText = footerData?.copyrightText || `© ${new Date().getFullYear()} Jronix Software Solutions. All rights reserved.`;

  return (
    <footer className="relative bg-[#020a16] border-t border-[rgba(59,130,246,0.1)] overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Gradients */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-accent)] to-transparent opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-[0.04] rounded-full blur-[120px] bg-gradient-to-b from-[#3b82f6] to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <ImageWithFallback src={logoImg} alt="Jronix logo" className="w-12 h-12 object-contain rounded-xl relative z-10" />
                <div className="absolute inset-0 bg-[var(--primary-accent)] opacity-40 blur-md rounded-full -z-10" />
              </div>
              <div>
                <span className="block font-bold text-2xl leading-none" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>Jronix</span>
                <span className="block text-[10px] tracking-widest font-semibold uppercase mt-0.5" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>Software Solutions</span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              {description}
            </p>
            
            <div className="flex gap-3 mt-auto">
              {socialLinks?.map((link: any, i: number) => {
                const Icon = iconMap[link.platform?.toLowerCase()] || Github;
                return (
                  <motion.a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300" 
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#e8f4ff" }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold mb-6" style={{ color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}>Company</h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks?.map((link: any) => {
                const linkName = typeof link === 'string' ? link : link.name || "";
                return (
                  <li key={linkName || link}>
                    <button
                      onClick={() => {
                        if (!linkName) return;
                        const el = document.getElementById(linkName.toLowerCase());
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm transition-all duration-200 hover:translate-x-1"
                      style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#7aa8cc"}
                    >
                      {linkName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services Column (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold mb-6" style={{ color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}>Services</h4>
            <ul className="flex flex-col gap-3.5">
              {serviceLinks?.map((s: any) => {
                const sName = typeof s === 'string' ? s : s.name || "";
                return (
                  <li key={sName || s} className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span 
                      className="text-sm transition-colors duration-200 group-hover:text-white -ml-3 group-hover:ml-0" 
                      style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}
                    >
                      {sName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter Column (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold mb-6" style={{ color: "#e8f4ff", fontFamily: "Inter, sans-serif" }}>Newsletter</h4>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              Subscribe to get the latest design news, articles, and resources delivered straight to your inbox.
            </p>
            
            {subscribed ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#34d399]/20">
                  <span className="text-[#34d399]">✓</span>
                </div>
                <p className="text-sm font-medium" style={{ color: "#34d399", fontFamily: "Inter, sans-serif" }}>Subscribed successfully!</p>
              </motion.div>
            ) : (
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{ 
                    background: "rgba(13,31,60,0.4)", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    color: "#e8f4ff", 
                    fontFamily: "Inter, sans-serif" 
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-10 rounded-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#fff" }}
                >
                  <Send size={14} />
                </button>
              </div>
            )}
            
            {/* Contact quick info */}
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs" style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}>
                <Mail size={12} style={{ color: "var(--primary-accent)" }} /> hello@jronix.com
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#5a8aaa", fontFamily: "Inter, sans-serif" }}>
                <MapPin size={12} style={{ color: "var(--primary-accent)" }} /> Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-xs" style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}>
            {copyrightText}
          </p>
          
          <div className="flex gap-6">
            {bottomLinks?.map((link: any) => {
              const linkName = typeof link === 'string' ? link : link.name || "";
              const handleClick = () => {
                if (link.url && link.url !== "#") {
                  if (link.url.startsWith('/')) navigate(link.url);
                  else window.open(link.url, '_blank');
                } else {
                  if (linkName?.toLowerCase().includes("privacy")) navigate("/privacy-policy");
                  else if (linkName?.toLowerCase().includes("terms")) navigate("/terms-conditions");
                }
              };
              return (
                <button
                  key={linkName || link}
                  onClick={handleClick}
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: "#4a6080", fontFamily: "Inter, sans-serif" }}
                >
                  {linkName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Back to top FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full flex items-center justify-center z-40 transition-all duration-300 hover:-translate-y-1"
        style={{ 
          background: "rgba(13,31,60,0.8)", 
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(59,130,246,0.3)", 
          color: "var(--primary-accent)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.1)" 
        }}
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
