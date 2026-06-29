const express = require('express');
const router = express.Router();
const { submitApplication, getApplications } = require('../controllers/jobApplicationController');

router.route('/')
    .post(submitApplication)
    .get(getApplications);

module.exports = router;
