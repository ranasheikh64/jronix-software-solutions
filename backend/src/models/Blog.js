const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    category: {
        type: String, // e.g., "Flutter", "AI", "Design"
        required: true
    },
    image: {
        type: String, // Cloudinary URL
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    authorImage: {
        type: String, // Can be Cloudinary URL or placeholder
        default: "https://via.placeholder.com/150"
    },
    readTime: {
        type: String, // e.g., "6 min read"
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
