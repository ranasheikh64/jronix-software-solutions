import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Career } from "./components/Career";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PlexusBackground } from "./components/PlexusBackground";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#010515", overflowX: "hidden", position: "relative" }}>

      {/* ── 3D Plexus constellation — fixed, whole site, 80% opacity ── */}
      <PlexusBackground />

      {/* ── Dark vignette so text stays readable over the plexus ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(1,5,21,0.45) 100%)",
        }}
      />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <About />
        <Testimonials />
        <Career />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
