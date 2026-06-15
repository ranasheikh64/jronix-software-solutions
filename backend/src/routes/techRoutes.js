const express = require('express');
const router = express.Router();
const { getTech, createTech, updateTech } = require('../controllers/techController');

router.route('/')
    .get(getTech)
    .post(createTech);

router.route('/:id')
    .put(updateTech);

module.exports = router;
