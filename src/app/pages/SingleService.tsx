import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, Pencil, Code2,
  FlaskConical, Rocket, HeartHandshake, Smartphone, Globe, Server,
  Pen, Upload, Brain, Layout, Zap, Code, MessageSquare, Star, Clock, Shield
} from "lucide-react";
import centerLogo from "../../imports/image.png";

// ── helpers ─────────────────────────────────────────────────────────────────
export function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const iconMap: Record<string, any> = {
  mobile: Smartphone, globe: Globe, server: Server, pen: Pen,
  upload: Upload, brain: Brain, layout: Layout, lightning: Zap, code: Code,
};

const accentPalette = [
  "#3b82f6", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#22d3ee",
];

// ── Per-service static data ──────────────────────────────────────────────────
const serviceDetails: Record<string, {
  tagline: string;
  longDescription: string;
  features: { icon: any; title: string; desc: string }[];
  process: { icon: any; step: string; title: string; desc: string }[];
  techStack: string[];
  faqs: { q: string; a: string }[];
  whyUs: { title: string; desc: string }[];
}> = {
  "flutter-app-development": {
    tagline: "One codebase. Two stores. Infinite possibilities.",
    longDescription:
      "We craft beautiful, high-performance Flutter mobile apps that feel native on both iOS and Android. From architecture planning to Play Store / App Store submission — we handle every stage with precision, so you can focus on your vision.",
    features: [
      { icon: Smartphone, title: "Cross-Platform", desc: "Build once, ship to iOS & Android with pixel-perfect fidelity." },
      { icon: Zap, title: "Blazing Fast", desc: "60fps animations and native-speed performance out of the box." },
      { icon: Shield, title: "Secure & Scalable", desc: "Clean architecture with full state management for growth." },
      { icon: Code2, title: "Clean Code", desc: "SOLID principles, comprehensive tests, easy to maintain." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "Discovery & Scoping", desc: "We map out your users, core features, and tech requirements in a structured kickoff session." },
      { icon: Pencil, step: "02", title: "UI/UX Wireframing", desc: "Figma prototypes — from low-fi sketches to pixel-perfect, interactive mockups." },
      { icon: Code2, step: "03", title: "Flutter Development", desc: "Feature-by-feature sprints, daily builds, and continuous client demos." },
      { icon: FlaskConical, step: "04", title: "QA & Testing", desc: "Unit, widget, and integration tests across multiple real devices." },
      { icon: Rocket, step: "05", title: "Store Submission", desc: "ASO-optimized listing, screenshots, privacy policy, and compliance review." },
      { icon: HeartHandshake, step: "06", title: "Post-Launch Support", desc: "Bug fixes, feature updates, and performance monitoring after go-live." },
    ],
    techStack: ["Flutter", "Dart", "Firebase", "Supabase", "GetX / Riverpod", "REST / GraphQL", "Figma"],
    whyUs: [
      { title: "3+ Years Flutter Expertise", desc: "We've shipped 20+ Flutter apps across industries." },
      { title: "Full-Cycle Delivery", desc: "From wireframe to live app — zero handoff chaos." },
      { title: "App Store Approved", desc: "100% approval rate on first submission." },
    ],
    faqs: [
      { q: "How long does a Flutter app take?", a: "A typical MVP takes 6–10 weeks depending on complexity. We'll give you a precise timeline after scoping." },
      { q: "Will my app work on both iOS and Android?", a: "Yes — Flutter compiles to native ARM code for both platforms from a single codebase." },
      { q: "Can you update my existing Flutter app?", a: "Absolutely. We can audit, refactor, and extend any existing Flutter project." },
    ],
  },

  "wordpress-website-development": {
    tagline: "Beautiful websites. Powerful CMS. Zero friction.",
    longDescription:
      "We build custom WordPress sites that are fast, secure, and easy for your team to manage. From landing pages to full e-commerce platforms — designed to rank on Google and convert visitors into customers.",
    features: [
      { icon: Globe, title: "Custom Themes", desc: "Pixel-perfect designs built from scratch, not bloated templates." },
      { icon: Zap, title: "SEO Optimized", desc: "Structured data, Core Web Vitals, and on-page SEO baked in." },
      { icon: Shield, title: "Secure & Updated", desc: "Hardened WordPress setup with regular security patches." },
      { icon: Layout, title: "Easy CMS", desc: "Your team can update content without touching a single line of code." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "Goal & Audience Analysis", desc: "We define your business goals, target audience, and conversion objectives." },
      { icon: Pencil, step: "02", title: "Sitemap & Wireframes", desc: "Page hierarchy and layout mockups before any code is written." },
      { icon: Code2, step: "03", title: "Theme Development", desc: "Custom theme development with ACF, Gutenberg blocks, and performance tuning." },
      { icon: FlaskConical, step: "04", title: "Content & QA", desc: "Content migration, cross-browser testing, and accessibility checks." },
      { icon: Rocket, step: "05", title: "Launch & Go-Live", desc: "DNS setup, SSL, staging-to-production migration, and speed optimization." },
      { icon: HeartHandshake, step: "06", title: "Ongoing Maintenance", desc: "Plugin updates, backups, uptime monitoring, and content edits." },
    ],
    techStack: ["WordPress", "PHP", "ACF Pro", "WooCommerce", "Elementor / Gutenberg", "MySQL", "Cloudflare"],
    whyUs: [
      { title: "Custom, Not Cookie-Cutter", desc: "Every site is hand-coded for your brand — no page builder bloat." },
      { title: "Speed First", desc: "Average 95+ PageSpeed score on all our WordPress builds." },
      { title: "SEO Ready from Day 1", desc: "Yoast, structured data, and sitemaps configured on launch." },
    ],
    faqs: [
      { q: "Can you migrate my existing website to WordPress?", a: "Yes — we handle content migration, URL mapping, and SEO preservation." },
      { q: "Will I be able to edit the site myself?", a: "Absolutely. We train you on the CMS and leave you with full editorial control." },
      { q: "Do you build WooCommerce stores?", a: "Yes — product catalog, payment gateways, shipping, and inventory management." },
    ],
  },

  "app-publishing": {
    tagline: "Your app, live in stores — guaranteed approval.",
    longDescription:
      "Navigating App Store and Google Play policies is complex and time-consuming. We handle the entire submission pipeline: ASO, screenshots, compliance review, and monitoring — so your app launches fast and stays live.",
    features: [
      { icon: Upload, title: "End-to-End Submission", desc: "We manage every step from build signing to final approval." },
      { icon: Star, title: "ASO Optimization", desc: "Keyword research, title, description, and screenshots tuned for discovery." },
      { icon: Shield, title: "Compliance Review", desc: "Privacy policy, data safety form, age ratings — handled correctly." },
      { icon: Clock, title: "Fast Turnaround", desc: "Average store submission completed within 48 hours." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "App Audit", desc: "We review your app against current App Store and Play Store guidelines." },
      { icon: Pencil, step: "02", title: "Store Listing Creation", desc: "Crafting compelling titles, descriptions, and keyword strategies for maximum discoverability." },
      { icon: Code2, step: "03", title: "Build & Signing", desc: "Release build generation, code signing, and certificate management." },
      { icon: FlaskConical, step: "04", title: "Compliance Check", desc: "Privacy policy, data safety form, permissions review, and policy compliance." },
      { icon: Rocket, step: "05", title: "Submission", desc: "Submitting to both stores, monitoring review status, and resolving any rejections." },
      { icon: HeartHandshake, step: "06", title: "Post-Approval Monitoring", desc: "We watch for review responses, rating dips, and update your listing as needed." },
    ],
    techStack: ["Apple Developer Portal", "Google Play Console", "Fastlane", "Firebase App Distribution", "ASO Tools"],
    whyUs: [
      { title: "100% Approval Rate", desc: "Never had a final rejection — we know the rules inside out." },
      { title: "Dual-Platform Experts", desc: "We handle iOS and Android simultaneously." },
      { title: "Rejection Resolution", desc: "If your app was rejected elsewhere, we can fix and resubmit it." },
    ],
    faqs: [
      { q: "My app was rejected — can you help?", a: "Yes. We analyze the rejection reason, fix the issue, and resubmit with a detailed resolution message." },
      { q: "Do I need a developer account?", a: "You need your own accounts, but we can guide you through setup or manage under your credentials." },
      { q: "How long does review take?", a: "Apple averages 1–3 days; Google averages a few hours to 3 days. We'll keep you updated throughout." },
    ],
  },

  "backend-api-development": {
    tagline: "Robust APIs that scale with your ambition.",
    longDescription:
      "We architect and build production-ready REST and GraphQL APIs. Whether you need a microservice for a mobile app, a real-time WebSocket server, or a complete backend system — we deliver secure, documented, and battle-tested solutions.",
    features: [
      { icon: Server, title: "Scalable Architecture", desc: "Microservices or monolith — designed to handle your traffic peaks." },
      { icon: Shield, title: "Security First", desc: "JWT, OAuth2, rate limiting, and full OWASP compliance." },
      { icon: Code2, title: "Full Documentation", desc: "Swagger/OpenAPI docs shipped with every endpoint." },
      { icon: Zap, title: "99.9% Uptime", desc: "Built with redundancy, health checks, and auto-recovery." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "Requirements & Schema Design", desc: "Data modeling, API contract design, and tech stack selection." },
      { icon: Pencil, step: "02", title: "Architecture Planning", desc: "System design diagrams, service boundaries, and deployment strategy." },
      { icon: Code2, step: "03", title: "API Development", desc: "Sprint-based development with daily deployments to staging." },
      { icon: FlaskConical, step: "04", title: "Testing & Security Audit", desc: "Unit tests, integration tests, load testing, and penetration review." },
      { icon: Rocket, step: "05", title: "Deployment", desc: "CI/CD pipeline, containerization (Docker), and cloud deployment." },
      { icon: HeartHandshake, step: "06", title: "Monitoring & Support", desc: "Real-time error tracking, performance metrics, and on-call support." },
    ],
    techStack: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS / GCP", "Swagger"],
    whyUs: [
      { title: "Clean Architecture", desc: "Layered design that's easy to onboard new devs and extend." },
      { title: "Developer-Friendly Docs", desc: "Every API ships with Postman collections and Swagger UI." },
      { title: "DevOps Included", desc: "CI/CD, Docker, and cloud setup — not just the code." },
    ],
    faqs: [
      { q: "Can you integrate with my existing frontend?", a: "Yes — we design APIs around your frontend's needs and provide an integration guide." },
      { q: "Do you offer real-time features like WebSockets?", a: "Yes — chat, notifications, live dashboards, and event-driven systems are in our wheelhouse." },
      { q: "Can you take over an existing backend?", a: "Absolutely. We start with a codebase audit and create a refactoring + extension plan." },
    ],
  },

  "ui-ux-design": {
    tagline: "Designs users love. Interfaces that convert.",
    longDescription:
      "We create pixel-perfect, research-driven digital experiences. From early wireframes to polished design systems — every pixel has a purpose. We bridge the gap between beautiful and functional.",
    features: [
      { icon: Pen, title: "User Research", desc: "Persona mapping, user flows, and competitive analysis before sketching a pixel." },
      { icon: Layout, title: "Design Systems", desc: "Scalable component libraries that keep your product consistent." },
      { icon: Smartphone, title: "Responsive Design", desc: "Every design works flawlessly from 320px to 4K screens." },
      { icon: Zap, title: "Prototype & Test", desc: "Interactive Figma prototypes for usability testing before development." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "Discovery & Research", desc: "User interviews, persona creation, and competitor UX analysis." },
      { icon: Pencil, step: "02", title: "Information Architecture", desc: "Sitemaps, user flows, and low-fidelity wireframes." },
      { icon: Code2, step: "03", title: "Visual Design", desc: "High-fidelity mockups with your brand identity — color, type, motion." },
      { icon: FlaskConical, step: "04", title: "Prototyping & Testing", desc: "Clickable Figma prototypes validated with real users." },
      { icon: Rocket, step: "05", title: "Developer Handoff", desc: "Annotated specs, asset exports, and Figma Dev Mode access." },
      { icon: HeartHandshake, step: "06", title: "Design QA", desc: "We review the live implementation to ensure pixel-perfect accuracy." },
    ],
    techStack: ["Figma", "FigJam", "Principle", "Lottie", "Adobe Illustrator", "Maze (user testing)"],
    whyUs: [
      { title: "Design + Dev Alignment", desc: "We design with developers in mind — no impossible gradients or missing states." },
      { title: "Brand Consistency", desc: "Every screen follows your design system for a cohesive experience." },
      { title: "Conversion Focused", desc: "Beautiful isn't enough — we optimize for clicks, sign-ups, and revenue." },
    ],
    faqs: [
      { q: "Do you handle both mobile and web design?", a: "Yes — we design for all platforms: iOS, Android, web, and desktop apps." },
      { q: "Can you work with our existing brand identity?", a: "Absolutely. We extend your brand into the digital product with consistency." },
      { q: "What if we need design changes after handoff?", a: "We offer revision rounds and post-handoff design support packages." },
    ],
  },

  "ai-integration": {
    tagline: "Make your product smarter with AI.",
    longDescription:
      "We integrate cutting-edge AI and ML capabilities into your existing or new products. From GPT-powered chatbots to recommendation engines and custom ML pipelines — we make AI practical, fast to deploy, and genuinely useful.",
    features: [
      { icon: Brain, title: "LLM Integration", desc: "OpenAI, Gemini, Claude — we pick the right model for your use case." },
      { icon: MessageSquare, title: "Chatbots & Assistants", desc: "Intelligent, context-aware bots that actually understand your users." },
      { icon: Zap, title: "Automation Pipelines", desc: "AI-driven workflows that reduce manual work and speed up operations." },
      { icon: Code2, title: "Custom ML Models", desc: "Fine-tuned or trained-from-scratch models for your specific domain." },
    ],
    process: [
      { icon: Lightbulb, step: "01", title: "Use Case Definition", desc: "We identify which problems AI can solve and map the expected ROI." },
      { icon: Pencil, step: "02", title: "Data Assessment", desc: "Reviewing your data quality, volume, and labeling requirements." },
      { icon: Code2, step: "03", title: "Model Selection & Prompting", desc: "Choosing LLMs or ML models, crafting prompts or training pipelines." },
      { icon: FlaskConical, step: "04", title: "Integration & Testing", desc: "API wiring, accuracy benchmarking, edge-case stress testing." },
      { icon: Rocket, step: "05", title: "Deployment", desc: "Productionizing the AI service with monitoring, rate limits, and fallbacks." },
      { icon: HeartHandshake, step: "06", title: "Iteration & Improvement", desc: "Continuous model improvement based on real-world feedback." },
    ],
    techStack: ["OpenAI API", "Google Gemini", "LangChain", "Pinecone", "Python", "FastAPI", "Hugging Face", "AWS Bedrock"],
    whyUs: [
      { title: "Practical AI, Not Hype", desc: "We deploy AI that creates real business value — not demos." },
      { title: "End-to-End Ownership", desc: "From data prep to production deployment — we own the whole pipeline." },
      { title: "Model Agnostic", desc: "We use the best model for your task, not just the most popular one." },
    ],
    faqs: [
      { q: "Do I need a lot of data to use AI?", a: "Not always. Modern LLMs work well with minimal data using prompt engineering and RAG techniques." },
      { q: "How much does AI integration cost?", a: "It depends heavily on the complexity. We'll assess your use case and provide a fixed-price proposal." },
      { q: "Can you add AI to my existing app?", a: "Yes — we integrate AI as a service layer into your existing tech stack with minimal disruption." },
    ],
  },
};

// Fallback for unknown slugs
const defaultDetail = {
  tagline: "World-class software. Delivered on time.",
  longDescription:
    "Jronix - Software Solutions delivers premium digital products built with the latest technologies and best practices. Our team of expert engineers and designers brings your vision to life — on time, on budget, and beyond expectations.",
  features: [
    { icon: Zap, title: "Fast Delivery", desc: "Sprint-based workflow with daily builds and continuous client demos." },
    { icon: Shield, title: "High Quality", desc: "Code reviews, automated tests, and QA at every stage." },
    { icon: HeartHandshake, title: "Dedicated Support", desc: "We're with you from kickoff to post-launch growth." },
    { icon: Star, title: "Client First", desc: "Transparent communication and on-time delivery — always." },
  ],
  process: [
    { icon: Lightbulb, step: "01", title: "Discovery", desc: "Understanding your goals, users, and success metrics." },
    { icon: Pencil, step: "02", title: "Design", desc: "Wireframes, prototypes, and visual design." },
    { icon: Code2, step: "03", title: "Development", desc: "Agile sprints with daily demos and continuous integration." },
    { icon: FlaskConical, step: "04", title: "Testing", desc: "Comprehensive QA across all target platforms and devices." },
    { icon: Rocket, step: "05", title: "Launch", desc: "Smooth deployment with zero-downtime strategies." },
    { icon: HeartHandshake, step: "06", title: "Support", desc: "Ongoing maintenance, monitoring, and feature iterations." },
  ],
  techStack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
  whyUs: [
    { title: "Expert Team", desc: "Senior engineers with 3–8 years of hands-on experience." },
    { title: "Transparent Process", desc: "Daily updates, weekly reports, and full project visibility." },
    { title: "On-Time Delivery", desc: "We've never missed a committed launch date." },
  ],
  faqs: [
    { q: "How do I get started?", a: "Reach out via our contact form and we'll schedule a free 30-minute discovery call." },
    { q: "What is your pricing model?", a: "We offer fixed-price projects and dedicated team engagements. We'll recommend the best fit after scoping." },
    { q: "Do you sign NDAs?", a: "Absolutely — all projects are covered by a mutual NDA before any discussion of details." },
  ],
};

// ── Component ────────────────────────────────────────────────────────────────
export function SingleService() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const defaultServices = [
      { title: "App Publishing", icon: "upload", tags: ["APP STORE", "PLAY STORE"], highlightText: "100% Approval Rate" },
      { title: "Flutter App Development", icon: "mobile", tags: ["IOS", "ANDROID"], highlightText: "Single Codebase" },
      { title: "WordPress Website Development", icon: "globe", tags: ["WEBSITE", "WORDPRESS"], highlightText: "Real-Time Sync" },
      { title: "UI/UX Design", icon: "pen", tags: ["FIGMA", "DESIGN"], highlightText: "Premium Quality" },
      { title: "Backend & API Development", icon: "server", tags: ["API", "SERVER"], highlightText: "99.9% Uptime" },
      { title: "AI Integration", icon: "brain", tags: ["AI", "ML"], highlightText: "Cutting Edge" },
    ];
    const found = defaultServices.find(s => toSlug(s.title) === slug);
    setService(found || { title: slug?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), icon: "code" });
  }, [slug]);

  if (!service) return null;

  const detail = (slug && serviceDetails[slug]) ? serviceDetails[slug] : defaultDetail;
  const Icon = iconMap[service.icon?.toLowerCase()] || Code;
  const accentIdx = Object.keys(serviceDetails).indexOf(slug || "");
  const accent = accentPalette[accentIdx % accentPalette.length] || "#3b82f6";

  return (
    <div className="min-h-screen pt-24" style={{ background: "#020617" }}>

      {/* ── HERO ── */}
      <section className="relative py-16 md:py-24 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: `radial-gradient(ellipse, ${accent}18 0%, transparent 70%)`, borderRadius: "50%" }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              <ArrowLeft size={15} /> Back to Services
            </Link>
          </motion.div>

          {/* Tags */}
          {service.tags?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-wrap gap-2 mb-5">
              {service.tags.map((tag: string) => (
                <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}35`, fontFamily: "JetBrains Mono, monospace" }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "#e8f4ff", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {service.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-3 text-lg md:text-xl font-medium" style={{ color: accent, fontFamily: "Inter, sans-serif" }}>
            {detail.tagline}
          </motion.p>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "#8fb8d8", fontFamily: "Inter, sans-serif" }}>
            {detail.longDescription}
          </motion.p>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="flex flex-wrap gap-4 mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105" style={{ background: `linear-gradient(135deg, ${accent}, #6366f1)`, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 8px 30px ${accent}40` }}>
              Start This Project <ArrowRight size={15} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:bg-white/10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 text-2xl md:text-3xl font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
            What's <span style={{ color: accent }}>Included</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {detail.features.map((f, i) => {
              const FIcon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300 cursor-default" style={{ background: "rgba(10,20,40,0.6)", border: `1px solid ${accent}20`, backdropFilter: "blur(12px)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                    <FIcon size={18} style={{ color: accent }} />
                  </div>
                  <h3 className="font-bold mb-2 text-base" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS: IDEA TO REALITY (CIRCULAR ORBIT DESIGN) ── */}
      <section className="py-16 px-6 relative overflow-hidden bg-[#030914]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${accent}10 0%, transparent 70%)` }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-4" style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}30`, fontFamily: "Inter, sans-serif" }}>
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
              From <span style={{ color: accent }}>Idea</span> to Reality
            </h2>
            <p className="mt-3 max-w-lg mx-auto text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
              A proven circular workflow surrounding our core expertise to bring your vision to life.
            </p>
          </motion.div>

          {/* ── DESKTOP CIRCULAR ORBIT LAYOUT (lg and above) ── */}
          <div className="hidden lg:flex items-center justify-between relative min-h-[640px] px-4">

            {/* Central Logo & Orbital Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
              {/* Outer Large Dashed Orbit Ring */}
              <div className="absolute w-[560px] h-[560px] xl:w-[620px] xl:h-[620px] rounded-full border border-dashed opacity-25 animate-[spin_40s_linear_infinite]" style={{ borderColor: accent }} />

              {/* Inner Glowing Spinning Ring with Particles */}
              <div className="absolute w-[320px] h-[320px] xl:w-[360px] xl:h-[360px] rounded-full border opacity-40 animate-[spin_15s_linear_infinite]" style={{ borderColor: accent, boxShadow: `0 0 30px ${accent}20` }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full shadow-[0_0_12px_#fff]" style={{ background: accent }} />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 -mb-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
              </div>

              {/* Central Glowing Orb with Company Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-44 h-44 xl:w-52 xl:h-52 z-30 pointer-events-auto"
              >
                <div className="w-full h-full rounded-full p-2 relative flex items-center justify-center bg-gradient-to-br from-[#081224] to-[#020612] border-2 shadow-2xl backdrop-blur-xl" style={{ borderColor: accent, boxShadow: `0 0 50px ${accent}40, inset 0 0 30px ${accent}25` }}>
                  <div className="absolute inset-2 rounded-full bg-[#020617] -z-10" />
                  <img
                    src={centerLogo}
                    alt="Jronix Center Logo"
                    className="w-full h-full object-contain rounded-full p-3 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Left Arc Cards (Steps 01, 02, 03) */}
            <div className="w-[340px] xl:w-[380px] flex flex-col justify-between h-[580px] z-30 relative">
              {detail.process.slice(0, 3).map((step, i) => {
                const SIcon = step.icon;
                // Indent middle card further out to follow circular arc path
                const arcOffset = i === 1 ? "translate-x-0" : "translate-x-8";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`relative group ${arcOffset} transition-transform duration-300`}
                  >
                    {/* SVG Connector to Center */}
                    <div className="absolute left-full top-1/2 w-[60px] xl:w-[90px] h-[2px] pointer-events-none z-0 overflow-visible">
                      <div className="w-full h-full relative">
                        <div className="absolute left-0 top-0 w-full h-[1px] opacity-40" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_8px_#fff]" style={{ background: accent }} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl relative overflow-hidden" style={{ background: "rgba(8, 16, 32, 0.85)", borderColor: `${accent}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}>
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}>
                          <SIcon size={18} style={{ color: accent }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ color: accent, background: `${accent}15` }}>
                              {step.step}
                            </span>
                            <h3 className="font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Arc Cards (Steps 04, 05, 06) */}
            <div className="w-[340px] xl:w-[380px] flex flex-col justify-between h-[580px] z-30 relative">
              {detail.process.slice(3, 6).map((step, i) => {
                const SIcon = step.icon;
                // Indent middle card further out to follow circular arc path
                const arcOffset = i === 1 ? "translate-x-0" : "-translate-x-8";
                return (
                  <motion.div
                    key={i + 3}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 3) * 0.12 }}
                    className={`relative group ${arcOffset} transition-transform duration-300`}
                  >
                    {/* SVG Connector to Center */}
                    <div className="absolute right-full top-1/2 w-[60px] xl:w-[90px] h-[2px] pointer-events-none z-0 overflow-visible">
                      <div className="w-full h-full relative">
                        <div className="absolute right-0 top-0 w-full h-[1px] opacity-40" style={{ background: `linear-gradient(to left, ${accent}, transparent)` }} />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_8px_#fff]" style={{ background: accent }} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl relative overflow-hidden" style={{ background: "rgba(8, 16, 32, 0.85)", borderColor: `${accent}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}>
                      <div className="absolute right-0 top-0 bottom-0 w-1" style={{ background: accent }} />
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${accent}18`, border: `1px solid ${accent}40` }}>
                          <SIcon size={18} style={{ color: accent }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded" style={{ color: accent, background: `${accent}15` }}>
                              {step.step}
                            </span>
                            <h3 className="font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* ── MOBILE / TABLET LAYOUT (lg:hidden) ── */}
          <div className="lg:hidden flex flex-col items-center gap-6 relative">
            {/* Mobile Central Orb */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-36 h-36 my-4 z-20"
            >
              <div className="w-full h-full rounded-full p-2 flex items-center justify-center bg-gradient-to-br from-[#081224] to-[#020612] border-2 shadow-xl" style={{ borderColor: accent, boxShadow: `0 0 30px ${accent}35` }}>
                <img
                  src={centerLogo}
                  alt="Jronix Center Logo"
                  className="w-full h-full object-contain rounded-full p-2"
                />
              </div>
            </motion.div>

            {/* Process Step List */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {detail.process.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden"
                    style={{ background: "rgba(8, 16, 32, 0.85)", borderColor: `${accent}25` }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                        <SIcon size={16} style={{ color: accent }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded" style={{ color: accent, background: `${accent}15` }}>
                            {step.step}
                          </span>
                          <h3 className="font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 text-2xl md:text-3xl font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
            Tech <span style={{ color: accent }}>Stack</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
            {detail.techStack.map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default" style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent, fontFamily: "JetBrains Mono, monospace" }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 text-2xl md:text-3xl font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
            Why <span style={{ color: accent }}>Jronix</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {detail.whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-6 rounded-2xl" style={{ background: "rgba(10,20,40,0.6)", border: `1px solid ${accent}20` }}>
                <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: accent }} />
                <div>
                  <h3 className="font-bold mb-1" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff", fontSize: "1rem" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 text-2xl md:text-3xl font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
            Frequently Asked <span style={{ color: accent }}>Questions</span>
          </motion.h2>
          <div className="flex flex-col gap-4">
            {detail.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl" style={{ background: "rgba(10,20,40,0.6)", border: `1px solid rgba(255,255,255,0.07)` }}>
                <h3 className="font-bold mb-2 text-base flex items-start gap-2" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
                  <span style={{ color: accent, fontFamily: "JetBrains Mono, monospace", fontSize: "12px", marginTop: "3px" }}>Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed ml-5" style={{ color: "#7aa8cc", fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center p-10 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}12 0%, rgba(10,20,40,0.8) 100%)`, border: `1px solid ${accent}30` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}15 0%, transparent 60%)` }} />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}>
              <Icon size={24} style={{ color: accent }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e8f4ff" }}>
              Ready to build your {service.title}?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#8fb8d8", fontFamily: "Inter, sans-serif" }}>
              Let's talk about your project. We'll reply within 24 hours with a clear plan.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105" style={{ background: `linear-gradient(135deg, ${accent}, #6366f1)`, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 8px 30px ${accent}40` }}>
              Get a Free Quote <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
