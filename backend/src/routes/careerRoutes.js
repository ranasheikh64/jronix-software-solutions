const express = require('express');
const router = express.Router();
const { getCareerInfo, createCareerInfo, updateCareerInfo } = require('../controllers/careerController');

router.route('/')
    .get(getCareerInfo)
    .post(createCareerInfo);

router.route('/:id')
    .put(updateCareerInfo);

module.exports = router;
