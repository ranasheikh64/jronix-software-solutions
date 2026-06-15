const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: "Software Solutions"
    },
    titles: [{
        type: String,
        required: true
    }],
    subtitle: {
        type: String,
        required: true
    },
    techStack: [{
        name: String,
        link: { type: String, default: "#" }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
