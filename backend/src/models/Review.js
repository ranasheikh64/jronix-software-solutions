const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    clientImage: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientRole: {
        type: String, // e.g., "Product Manager, Nexus Dubai"
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
