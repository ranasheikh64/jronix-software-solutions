const mongoose = require('mongoose');
const Career = require('./src/models/Career');
const Job = require('./src/models/Job');
require('dotenv').config();

const careerData = {
    badge: "Join Our Team",
    title: "Build the Future With Us",
    subtitle: "We're always looking for talented people who love building things that matter.",
    perks: [
        {
            icon: "wifi",
            title: "Remote Friendly",
            description: "Work from anywhere in the world."
        },
        {
            icon: "trending-up",
            title: "Growth Opportunities",
            description: "Mentorship, courses, and career paths."
        },
        {
            icon: "star",
            title: "Exciting Projects",
            description: "Real-world products that ship globally."
        },
        {
            icon: "heart",
            title: "Collaborative Culture",
            description: "A team that lifts each other up."
        }
    ]
};

const jobsData = [
    {
        title: "Flutter Developer",
        type: "Full-time",
        location: "Remote",
        applyLink: "#"
    },
    {
        title: "React Frontend Engineer",
        type: "Full-time",
        location: "Dhaka / Remote",
        applyLink: "#"
    },
    {
        title: "UI/UX Designer",
        type: "Part-time",
        location: "Remote",
        applyLink: "#"
    }
];

const seedCareers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        // Seed Career Header
        await Career.deleteMany({});
        const career = new Career(careerData);
        await career.save();
        console.log("Career header seeded successfully!");

        // Seed Jobs
        await Job.deleteMany({});
        await Job.insertMany(jobsData);
        console.log("Jobs seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding careers data:", error);
        process.exit(1);
    }
};

seedCareers();
