const mongoose = require('mongoose');
const Journey = require('./src/models/Journey');
require('dotenv').config();

const journeys = [
    {
        year: "2022",
        title: "Founded",
        description: "Jronix started with 2 developers and a dream."
    },
    {
        year: "2023",
        title: "First 10 Clients",
        description: "Expanded team to 6 and hit our first 10 client milestone."
    },
    {
        year: "2024",
        title: "AI Division",
        description: "Launched AI & ML service line, 30+ projects shipped."
    },
    {
        year: "2025",
        title: "Global Reach",
        description: "Now serving 15+ countries with 50+ completed projects."
    }
];

const seedJourney = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Journey.deleteMany({});
        console.log("Cleared existing journey data...");

        await Journey.insertMany(journeys);
        console.log("Journey data seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding journey data:", error);
        process.exit(1);
    }
};

seedJourney();
