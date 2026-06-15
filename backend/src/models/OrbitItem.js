const mongoose = require('mongoose');

const orbitItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String, 
        required: false
    },
    orbitLevel: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('OrbitItem', orbitItemSchema);
