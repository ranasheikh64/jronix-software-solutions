const express = require('express');
const router = express.Router();
const { 
    getContactInfo, 
    updateContactInfo, 
    getMessages, 
    getMessageById, 
    submitMessage, 
    updateMessageStatus, 
    deleteMessage 
} = require('../controllers/contactController');

// Contact Info Routes
router.route('/info')
    .get(getContactInfo)
    .put(updateContactInfo)
    .post(updateContactInfo); // Allow post for first time setup

// Message Routes
router.route('/messages')
    .get(getMessages)
    .post(submitMessage);

router.route('/messages/:id')
    .get(getMessageById)
    .put(updateMessageStatus)
    .delete(deleteMessage);

module.exports = router;
