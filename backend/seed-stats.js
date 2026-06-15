const mongoose = require('mongoose');
const Stat = require('./src/models/Stat');
require('dotenv').config();

const stats = [
    {
        icon: "check-circle",
        value: "50+",
        label: "Projects Completed"
    },
    {
        icon: "users",
        value: "30+",
        label: "Happy Clients"
    },
    {
        icon: "smartphone",
        value: "20+",
        label: "Apps Published"
    },
    {
        icon: "calendar",
        value: "3+",
        label: "Years of Experience"
    }
];

const seedStats = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Stat.deleteMany({});
        console.log("Cleared existing stats...");

        await Stat.insertMany(stats);
        console.log("Stats seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding stats:", error);
        process.exit(1);
    }
};

seedStats();
