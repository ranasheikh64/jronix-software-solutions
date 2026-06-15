const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    badge: { type: String, default: "Who We Are" },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    
    // Left side image and stats
    image: { type: String, required: true },
    imageBadge: { type: String }, // e.g., "Top Agency 2025"
    imageStats: [{
        value: String, // e.g., "50+"
        label: String  // e.g., "Projects Delivered"
    }],
    
    // Right side text and features
    storyTitle: { type: String, default: "// our story" },
    storyDescription: { type: String, required: true },
    mission: { type: String, required: true },
    
    // The 4 feature cards
    features: [{
        icon: String, // e.g., "target", "lightning"
        title: String,
        description: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
