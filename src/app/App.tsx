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
import { ProcessSection } from "./components/ProcessSection";
import { SingleBlog } from "./pages/SingleBlog";
import { SingleProject } from "./pages/SingleProject";
import { AllProjects } from "./pages/AllProjects";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsConditions } from "./pages/TermsConditions";
import { AllPositions } from "./pages/AllPositions";
import { SectionPage } from "./pages/SectionPage";
import { SingleService } from "./pages/SingleService";

const Home = () => (
  <>
    <Hero />
    <About />
    <Portfolio />
    <Services />
    <ProcessSection />
    <Stats />
    <Testimonials />
    <Career />
    <Blog />
    <Contact />
  </>
);

export default function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", position: "relative" }}>
      
      {/* Global Seamless Background Gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{
          background: "radial-gradient(ellipse at top center, rgba(30, 58, 138, 0.02) 0%, transparent 60%), radial-gradient(circle at center, rgba(15, 23, 42, 0.2) 0%, #020617 100%)"
        }} 
      />

      {/* Fixed Navbar at Root Level */}
      <Navbar />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<SectionPage title="About Us"><About /></SectionPage>} />
          <Route path="/services" element={<SectionPage title="Services"><Services /></SectionPage>} />
          <Route path="/portfolio" element={<SectionPage title="Portfolio"><Portfolio /></SectionPage>} />
          <Route path="/career" element={<SectionPage title="Career"><Career /></SectionPage>} />
          <Route path="/blog" element={<SectionPage title="Blog"><Blog /></SectionPage>} />
          <Route path="/contact" element={<SectionPage title="Contact Us"><Contact /></SectionPage>} />
          
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/terms-of-service" element={<TermsConditions />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/project/:id" element={<SingleProject />} />
          <Route path="/open-positions" element={<AllPositions />} />
          <Route path="/service/:slug" element={<SingleService />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
