const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    icon: {
        type: String, // icon class or image url
        required: false
    },
    tags: {
        type: [String], // Array of tags, e.g., ["Flutter", "iOS", "Android"]
        default: []
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlightIcon: {
        type: String, // e.g., lightning bolt icon
        required: false
    },
    highlightText: {
        type: String, // e.g., "20+ Apps Shipped"
        required: false
    },
    link: {
        type: String,
        default: "#"
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
