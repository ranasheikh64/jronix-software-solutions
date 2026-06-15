const mongoose = require('mongoose');
const About = require('./src/models/About');
require('dotenv').config();

const aboutData = {
    badge: "Who We Are",
    title: "Built by Builders, For Builders",
    subtitle: "We are a Dhaka-based software agency obsessed with craft, speed, and results.",
    image: "https://via.placeholder.com/800x600.png?text=Team+Working",
    imageBadge: "Top Agency 2025",
    imageStats: [
        { value: "50+", label: "Projects Delivered" },
        { value: "15+", label: "Countries Served" }
    ],
    storyTitle: "// our story",
    storyDescription: "Jronix was born in Dhaka with one purpose — to build digital products that genuinely move the needle. We partner with startups and enterprises to design, build, and launch apps, platforms, and AI systems that users love.",
    mission: "Our mission: deliver world-class software with transparency, speed, and care. Every line of code we write is a commitment to your growth.",
    features: [
        {
            icon: "target",
            title: "Mission-Driven",
            description: "We align every line of code with your business goals."
        },
        {
            icon: "lightning",
            title: "Quality First",
            description: "Clean code, tested systems, pixel-perfect interfaces."
        },
        {
            icon: "users",
            title: "Client-Centric",
            description: "Your success is our only benchmark on every project."
        },
        {
            icon: "globe",
            title: "Global Mindset",
            description: "Serving clients across 15+ countries worldwide."
        }
    ]
};

const seedAbout = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await About.deleteMany({});
        console.log("Cleared existing about data...");

        const about = new About(aboutData);
        await about.save();
        console.log("About section seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding about section:", error);
        process.exit(1);
    }
};

seedAbout();
