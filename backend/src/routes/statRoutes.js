const express = require('express');
const router = express.Router();
const { getStats, getStatById, createStat, updateStat, deleteStat } = require('../controllers/statController');

router.route('/')
    .get(getStats)
    .post(createStat);

router.route('/:id')
    .get(getStatById)
    .put(updateStat)
    .delete(deleteStat);

module.exports = router;
