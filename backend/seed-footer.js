const mongoose = require('mongoose');
const Footer = require('./src/models/Footer');
require('dotenv').config();

const footerData = {
    description: "Building digital products that matter — from Dhaka to the world.",
    socialLinks: [
        { platform: "github", url: "https://github.com", icon: "github-icon-url" },
        { platform: "twitter", url: "https://twitter.com", icon: "twitter-icon-url" },
        { platform: "linkedin", url: "https://linkedin.com", icon: "linkedin-icon-url" },
        { platform: "instagram", url: "https://instagram.com", icon: "instagram-icon-url" }
    ],
    quickLinks: [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Services", url: "/services" },
        { name: "Work", url: "/work" },
        { name: "Blog", url: "/blog" },
        { name: "Contact", url: "/contact" }
    ],
    servicesLinks: [
        { name: "App Development", url: "/services/app-development" },
        { name: "Web Development", url: "/services/web-development" },
        { name: "AI Development", url: "/services/ai-development" },
        { name: "UI/UX Design", url: "/services/ui-ux-design" },
        { name: "App Publishing", url: "/services/app-publishing" },
        { name: "WordPress", url: "/services/wordpress" }
    ],
    bottomLinks: [
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms of Service", url: "/terms-of-service" }
    ],
    copyrightText: "© 2025 Jronix. All rights reserved."
};

const seedFooter = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Footer.deleteMany({});
        const footer = new Footer(footerData);
        await footer.save();
        console.log("Footer data seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding footer data:", error);
        process.exit(1);
    }
};

seedFooter();
