const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    skills: {
        type: [String], // e.g., ["Flutter", "React", "Strategy"]
        default: []
    },
    socialLinks: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" }
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
