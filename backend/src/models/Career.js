const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    badge: { type: String, default: "Join Our Team" },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    perks: [{
        icon: String, // e.g., "wifi", "trending-up", "star", "heart"
        title: String,
        description: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
