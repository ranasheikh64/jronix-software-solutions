const Message = require('../models/Message');
const ContactInfo = require('../models/ContactInfo');
const sendEmail = require('../utils/sendEmail');

// ==========================================
// CONTACT INFO (Right side of the screen)
// ==========================================

// @desc    Get Contact Info
// @route   GET /api/contact/info
const getContactInfo = async (req, res) => {
    try {
        const info = await ContactInfo.findOne();
        if (!info) {
            return res.status(404).json({ message: 'Contact info not found' });
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Contact Info
// @route   PUT /api/contact/info
const updateContactInfo = async (req, res) => {
    try {
        let info = await ContactInfo.findOne();
        
        if (info) {
            info.email = req.body.email || info.email;
            info.whatsapp = req.body.whatsapp || info.whatsapp;
            info.location = req.body.location || info.location;
            info.businessHours = req.body.businessHours || info.businessHours;
            
            const updatedInfo = await info.save();
            res.status(200).json(updatedInfo);
        } else {
            // Create if doesn't exist
            info = new ContactInfo(req.body);
            const createdInfo = await info.save();
            res.status(201).json(createdInfo);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ==========================================
// MESSAGES (Left side form submission)
// ==========================================

// @desc    Get all messages (For Admin Dashboard)
// @route   GET /api/contact/messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single message
// @route   GET /api/contact/messages/:id
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit a new message (From website)
// @route   POST /api/contact/messages
const submitMessage = async (req, res) => {
    try {
        // 1. Save to database
        const message = new Message(req.body);
        const savedMessage = await message.save();

        // 2. Send Email Notification
        const emailHtml = `
            <h2>New Contact Form Submission - Jronix</h2>
            <p><strong>Name:</strong> ${savedMessage.name}</p>
            <p><strong>Email:</strong> ${savedMessage.email}</p>
            <p><strong>Phone:</strong> ${savedMessage.phone || 'N/A'}</p>
            <p><strong>Service Needed:</strong> ${savedMessage.service}</p>
            <p><strong>Budget:</strong> ${savedMessage.budget}</p>
            <h3>Project Details:</h3>
            <p>${savedMessage.projectDetails}</p>
        `;

        await sendEmail({
            subject: `New Lead: ${savedMessage.name} - ${savedMessage.service}`,
            html: emailHtml
        });

        res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update message status (For Admin e.g., mark as Read)
// @route   PUT /api/contact/messages/:id
const updateMessageStatus = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        
        if (message) {
            message.status = req.body.status || message.status;
            
            const updatedMessage = await message.save();
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/contact/messages/:id
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        
        if (message) {
            await Message.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Message deleted' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getContactInfo, updateContactInfo, 
    getMessages, getMessageById, submitMessage, updateMessageStatus, deleteMessage 
};
