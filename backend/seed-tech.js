const mongoose = require('mongoose');
const Tech = require('./src/models/Tech');
require('dotenv').config();

const techData = {
    badge: "// technologies we master",
    title: "Our Tech Arsenal",
    technologies: [
        "Flutter",
        "React",
        "Next.js",
        "Python",
        "FastAPI",
        "Firebase",
        "WordPress",
        "Figma",
        "AWS",
        "Docker",
        "PostgreSQL",
        "MongoDB"
    ]
};

const seedTech = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Tech.deleteMany({});
        console.log("Cleared existing tech data...");

        const tech = new Tech(techData);
        await tech.save();
        console.log("Tech data seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding tech data:", error);
        process.exit(1);
    }
};

seedTech();
