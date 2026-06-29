const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true // e.g., "App", "Web", "AI", "Design" (for filtering)
    },
    typeBadge: { 
        type: String, 
        required: true // e.g., "Flutter App", "Web Platform"
    },
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    image: { 
        type: String, 
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
    stats: {
        users: { type: String }, // e.g., "12k+"
        rating: { type: String }, // e.g., "4.9"
        year: { type: String }    // e.g., "2024"
    },
    techStack: { 
        type: [String], // e.g., ["Flutter", "Firebase", "Node.js"]
        default: []
    },
    link: { 
        type: String, 
        default: "#" 
    },
    githubLink: { 
        type: String, 
        default: "#" 
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
