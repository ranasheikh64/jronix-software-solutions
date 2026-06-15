const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: "// technologies we master"
    },
    title: {
        type: String,
        default: "Our Tech Arsenal"
    },
    technologies: {
        type: [String], // e.g., ["Flutter", "React", "Next.js", ...]
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Tech', techSchema);
