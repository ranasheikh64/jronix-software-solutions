const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Subscribed', 'Unsubscribed'],
        default: 'Subscribed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);
