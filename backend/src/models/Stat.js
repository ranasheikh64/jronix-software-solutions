const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    icon: {
        type: String, // icon class or image url
        required: false
    },
    value: {
        type: String, // e.g., "50+"
        required: true
    },
    label: {
        type: String, // e.g., "Projects Completed"
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);
