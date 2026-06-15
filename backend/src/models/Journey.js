const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    year: {
        type: String, // e.g., "2022"
        required: true
    },
    title: {
        type: String, // e.g., "Founded"
        required: true
    },
    description: {
        type: String, // e.g., "Jronix started with 2 developers and a dream."
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Journey', journeySchema);
