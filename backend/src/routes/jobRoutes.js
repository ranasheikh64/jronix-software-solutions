const express = require('express');
const router = express.Router();
const { getJobs, getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

router.route('/')
    .get(getJobs)
    .post(createJob);

router.route('/all')
    .get(getAllJobs);

router.route('/:id')
    .get(getJobById)
    .put(updateJob)
    .delete(deleteJob);

module.exports = router;
