const mongoose = require('mongoose');
const Team = require('./src/models/Team');
require('dotenv').config();

const teamMembers = [
    {
        name: "Arif Rahman",
        role: "CEO & Lead Developer",
        description: "10+ years building scalable products.",
        image: "https://via.placeholder.com/400x500.png?text=Arif+Rahman",
        skills: ["Flutter", "React", "Strategy"],
        socialLinks: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        name: "Nadia Islam",
        role: "UI/UX Lead Designer",
        description: "Award-winning designer, Figma expert.",
        image: "https://via.placeholder.com/400x500.png?text=Nadia+Islam",
        skills: ["Figma", "Design Systems", "Branding"],
        socialLinks: { github: "#", linkedin: "#", twitter: "#" }
    },
    {
        name: "Rakib Hassan",
        role: "Backend Engineer",
        description: "APIs, cloud infra & database architect.",
        image: "https://via.placeholder.com/400x500.png?text=Rakib+Hassan",
        skills: ["Python", "FastAPI", "AWS"],
        socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
    },
    {
        name: "Sumaiya Akter",
        role: "Flutter Developer",
        description: "Cross-platform specialist, 20+ apps shipped.",
        image: "https://via.placeholder.com/400x500.png?text=Sumaiya+Akter",
        skills: ["Flutter", "Dart", "Firebase"],
        socialLinks: { github: "#", linkedin: "#", twitter: "#" }
    }
];

const seedTeam = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Team.deleteMany({});
        console.log("Cleared existing team data...");

        await Team.insertMany(teamMembers);
        console.log("Team data seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding team data:", error);
        process.exit(1);
    }
};

seedTeam();
