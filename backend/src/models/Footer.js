const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    socialLinks: [{
        platform: String, // e.g., "github", "twitter", "linkedin", "instagram"
        url: String,
        icon: String
    }],
    quickLinks: [{
        name: String, // e.g., "Home", "About"
        url: String
    }],
    servicesLinks: [{
        name: String, // e.g., "App Development"
        url: String
    }],
    bottomLinks: [{
        name: String, // e.g., "Privacy Policy", "Terms of Service"
        url: String
    }],
    copyrightText: {
        type: String,
        default: "© 2025 Jronix. All rights reserved."
    }
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
