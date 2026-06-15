const mongoose = require('mongoose');
const Blog = require('./src/models/Blog');
require('dotenv').config();

const blogs = [
    {
        category: "Flutter",
        image: "https://via.placeholder.com/600x400.png?text=Flutter+Dashboard",
        title: "Why Flutter is the Future of Cross-Platform Development in 2025",
        description: "Flutter 3.x has matured into the most capable cross-platform framework. Here's why we recommend it for every new...",
        authorName: "Arif Rahman",
        authorImage: "https://via.placeholder.com/150",
        readTime: "6 min read"
    },
    {
        category: "AI",
        image: "https://via.placeholder.com/600x400.png?text=AI+Brain",
        title: "Integrating GPT-4o into Your Product — A Practical Guide",
        description: "AI is no longer optional. We walk you through adding intelligent features to your existing app with minimal...",
        authorName: "Nadia Islam",
        authorImage: "https://via.placeholder.com/150",
        readTime: "8 min read"
    },
    {
        category: "Design",
        image: "https://via.placeholder.com/600x400.png?text=Design+Systems",
        title: "Design Systems That Scale: Lessons from 50+ Projects",
        description: "After shipping 50+ digital products, these are the design system principles we swear by to ship consistent, beautiful...",
        authorName: "Nadia Islam",
        authorImage: "https://via.placeholder.com/150",
        readTime: "5 min read"
    }
];

const seedBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Blog.deleteMany({});
        console.log("Cleared existing blogs...");

        await Blog.insertMany(blogs);
        console.log("Blogs seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding blogs:", error);
        process.exit(1);
    }
};

seedBlogs();
