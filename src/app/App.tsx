import { useState } from "react";
import { Routes, Route } from "react-router";
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
import { SingleBlog } from "./pages/SingleBlog";
import { SingleProject } from "./pages/SingleProject";
import { AllProjects } from "./pages/AllProjects";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsConditions } from "./pages/TermsConditions";

const Home = () => (
  <>
    <Hero />
    <Services />
    <Stats />
    <Portfolio />
    <About />
    <Testimonials />
    <Career />
    <Blog />
    <Contact />
  </>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#010515", overflowX: "hidden", position: "relative" }}>

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/project/:id" element={<SingleProject />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
