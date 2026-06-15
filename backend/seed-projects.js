const mongoose = require('mongoose');
const Project = require('./src/models/Project');
require('dotenv').config();

const projects = [
    {
        category: "App",
        typeBadge: "Flutter App",
        isFeatured: true,
        image: "https://via.placeholder.com/600x400.png?text=MediTrack", 
        title: "MediTrack Health App",
        description: "Patient management system with appointment scheduling and telemedicine. 4.9★ on Play Store.",
        stats: {
            users: "12k+",
            rating: "4.9",
            year: "2024"
        },
        techStack: ["Flutter", "Firebase", "Node.js"]
    },
    {
        category: "Web",
        typeBadge: "Web Platform",
        isFeatured: false,
        image: "https://via.placeholder.com/600x400.png?text=ShopFlow",
        title: "ShopFlow E-Commerce",
        description: "Full-featured online store with inventory management, analytics dashboard and Stripe checkout.",
        stats: {
            users: "8k+",
            rating: "4.8",
            year: "2024"
        },
        techStack: ["React", "Next.js", "Stripe"]
    },
    {
        category: "AI",
        typeBadge: "AI Platform",
        isFeatured: true,
        image: "https://via.placeholder.com/600x400.png?text=SentimentAI",
        title: "SentimentAI Analytics",
        description: "Real-time sentiment analysis for brand monitoring. Processes 1M+ data points daily.",
        stats: {
            users: "500+",
            rating: "5.0",
            year: "2025"
        },
        techStack: ["Python", "FastAPI", "OpenAI"]
    }
];

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Project.deleteMany({});
        console.log("Cleared existing projects...");

        await Project.insertMany(projects);
        console.log("Projects seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding projects:", error);
        process.exit(1);
    }
};

seedProjects();
