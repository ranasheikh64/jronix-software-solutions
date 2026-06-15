import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/photo_2026-06-14_20-40-57.jpg";

const navLinks = ["Home", "Services", "Work", "About", "Blog", "Career", "Contact"];

export function Navbar({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
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
        background: scrolled ? "rgba(5, 12, 26, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,170,255,0.1)" : "none",
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
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="relative text-sm transition-colors duration-200 group"
              style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}
            >
              <span className="group-hover:text-white transition-colors">{link}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: "linear-gradient(90deg, #00aaff, #00d4ff)" }} />
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#7aa8cc" }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)", color: "#fff", fontFamily: "Inter, sans-serif" }}
          >
            Get a Quote
          </button>
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
            style={{ background: "rgba(5, 12, 26, 0.98)", borderBottom: "1px solid rgba(0,170,255,0.1)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left py-2 border-b text-sm transition-colors hover:text-white"
                  style={{ color: "#7aa8cc", borderColor: "rgba(0,170,255,0.1)", fontFamily: "Inter, sans-serif" }}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-5 py-2.5 rounded-lg text-sm text-center"
                style={{ background: "linear-gradient(135deg, #0077cc, #00d4ff)", color: "#fff" }}
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
