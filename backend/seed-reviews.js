const mongoose = require('mongoose');
const Review = require('./src/models/Review');
require('dotenv').config();

const reviews = [
    {
        rating: 5,
        reviewText: "Jronix transformed our entire digital presence. The Flutter app they built has 4.9 stars on the Play Store. Exceptional team, exceptional output.",
        clientImage: "https://via.placeholder.com/150",
        clientName: "James Thornton GB",
        clientRole: "CTO, HealthPlus UK"
    },
    {
        rating: 5,
        reviewText: "Working with Jronix on our AI analytics platform was a game-changer. Delivered on time, on budget, and quality exceeded every expectation.",
        clientImage: "https://via.placeholder.com/150",
        clientName: "Sarah Al-Mansoori AE",
        clientRole: "Product Manager, Nexus Dubai"
    },
    {
        rating: 5,
        reviewText: "They redesigned our entire e-commerce platform from scratch. Conversion rate jumped 40% within the first month. Highly recommended!",
        clientImage: "https://via.placeholder.com/150",
        clientName: "Tobias Müller DE",
        clientRole: "Founder, ShopNord Germany"
    },
    {
        rating: 5,
        reviewText: "Professional, responsive, and incredibly talented. Our logistics dashboard was delivered ahead of schedule and handles millions of data points flawlessly.",
        clientImage: "https://via.placeholder.com/150",
        clientName: "Priya Nair IN",
        clientRole: "VP Engineering, LogiTech India"
    }
];

const seedReviews = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await Review.deleteMany({});
        console.log("Cleared existing reviews...");

        await Review.insertMany(reviews);
        console.log("Reviews seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding reviews:", error);
        process.exit(1);
    }
};

seedReviews();
