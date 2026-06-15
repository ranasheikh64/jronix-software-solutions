const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    location: { type: String, required: true },
    businessHours: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
