const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    service: {
        type: String,
        default: "Other"
    },
    budget: {
        type: String,
        default: "Not specified"
    },
    projectDetails: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Replied'],
        default: 'Unread'
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
