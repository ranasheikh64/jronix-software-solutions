const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String, // e.g., "Flutter Developer"
        required: true
    },
    type: {
        type: String, // e.g., "Full-time", "Part-time", "Contract"
        required: true
    },
    location: {
        type: String, // e.g., "Remote", "Dhaka / Remote"
        required: true
    },
    applyLink: {
        type: String, // Link to application form or email
        default: "#"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
