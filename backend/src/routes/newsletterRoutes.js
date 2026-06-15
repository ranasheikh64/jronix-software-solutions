const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers, deleteSubscriber } = require('../controllers/newsletterController');

router.route('/')
    .get(getSubscribers);

router.route('/subscribe')
    .post(subscribe);

router.route('/:id')
    .delete(deleteSubscriber);

module.exports = router;
