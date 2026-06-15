const mongoose = require('mongoose');
const Service = require('./src/models/Service');
require('dotenv').config();

const services = [
    {
        icon: "mobile", // Placeholder icon text
        tags: ["Flutter", "iOS", "Android"],
        title: "App Development",
        description: "Flutter, iOS & Android native apps built for scale, performance, and seamless UX across every device.",
        highlightIcon: "lightning",
        highlightText: "20+ Apps Shipped",
        link: "#"
    },
    {
        icon: "globe",
        tags: ["React", "Next.js", "TypeScript"],
        title: "Web Development",
        description: "Modern, responsive web platforms using React, Next.js and cutting-edge frameworks that load in milliseconds.",
        highlightIcon: "lightning",
        highlightText: "30+ Sites Launched",
        link: "#"
    },
    {
        icon: "server",
        tags: ["Python", "FastAPI", "AWS"],
        title: "Backend Development",
        description: "Robust APIs and microservices with Python, FastAPI, Node.js, and cloud infrastructure built to handle millions of requests.",
        highlightIcon: "lightning",
        highlightText: "99.9% Uptime",
        link: "#"
    },
    {
        icon: "pen",
        tags: ["Figma", "Design Systems"],
        title: "UI/UX & Figma Design",
        description: "Pixel-perfect designs, prototypes, and user interfaces crafted to provide intuitive and engaging experiences.",
        highlightIcon: "lightning",
        highlightText: "Award Winning UI",
        link: "#"
    },
    {
        icon: "upload",
        tags: ["App Store", "Play Store"],
        title: "App Publishing",
        description: "End-to-end iOS App Store and Google Play Store deployment, including ASO and compliance checks.",
        highlightIcon: "lightning",
        highlightText: "100% Approval Rate",
        link: "#"
    },
    {
        icon: "brain",
        tags: ["LLM", "Python", "OpenAI"],
        title: "AI Development",
        description: "Custom AI models, LLM integrations, and intelligent automation systems to give your business a competitive edge.",
        highlightIcon: "lightning",
        highlightText: "Smart Solutions",
        link: "#"
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Service.deleteMany({}); // Clear existing
        console.log("Cleared existing services...");

        await Service.insertMany(services);
        console.log("Services seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
};

seedServices();
