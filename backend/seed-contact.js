const mongoose = require('mongoose');
const ContactInfo = require('./src/models/ContactInfo');
const Message = require('./src/models/Message');
require('dotenv').config();

const contactInfoData = {
    email: "hello@jronix.com",
    whatsapp: "+880 1700-000000",
    location: "Dhaka, Bangladesh",
    businessHours: "Sat - Thu, 9am - 8pm BST"
};

const dummyMessage = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+123456789",
    service: "Web Development",
    budget: "$2,000 - $5,000",
    projectDetails: "This is a dummy test message from the seed script to check the dashboard."
};

const seedContact = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        // Seed Contact Info
        await ContactInfo.deleteMany({});
        const info = new ContactInfo(contactInfoData);
        await info.save();
        console.log("Contact info seeded successfully!");

        // Seed Dummy Message
        await Message.deleteMany({});
        const message = new Message(dummyMessage);
        await message.save();
        console.log("Dummy message seeded successfully!");

        process.exit();
    } catch (error) {
        console.error("Error seeding contact data:", error);
        process.exit(1);
    }
};

seedContact();
