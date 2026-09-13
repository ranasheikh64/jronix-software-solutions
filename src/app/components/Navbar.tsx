import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";

const navLinks = ["Home", "About", "Work", "Services", "Career", "Blog", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 12, 26, 0.65)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(59, 130, 246, 0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.2)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
          <ImageWithFallback
            src={logoImg}
            alt="Jronix Software Solutions logo"
            className="w-10 h-10 object-contain rounded-full"
          />
          <span style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "22px", color: "#e8f4ff", letterSpacing: "0.05em" }}>
            Jronix
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-[rgba(255,255,255,0.02)] p-1.5 rounded-full border border-[rgba(255,255,255,0.05)]">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="relative text-sm px-4 py-2 rounded-full transition-all duration-300 group hover:bg-[rgba(59,130,246,0.1)]"
              style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
            >
              <span className="group-hover:text-white transition-colors relative z-10">{link}</span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "inset 0 0 10px rgba(59,130,246,0.2)" }} />
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.4)", "0 0 0px rgba(59,130,246,0)"] }}
            transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
            onClick={() => scrollTo("contact")}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", fontFamily: "Inter, sans-serif" }}
          >
            <span className="relative z-10">Get a Quote</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)" }} />
          </motion.button>
          <button className="lg:hidden p-2" style={{ color: "#7aa8cc" }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "rgba(5, 12, 26, 0.98)", borderBottom: "1px solid var(--primary-accent-glow)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left py-2 border-b text-sm transition-colors hover:text-white"
                  style={{ color: "#7aa8cc", borderColor: "var(--primary-accent-glow)", fontFamily: "Inter, sans-serif" }}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-5 py-2.5 rounded-lg text-sm text-center"
                style={{ background: "var(--primary-gradient)", color: "#fff" }}
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
