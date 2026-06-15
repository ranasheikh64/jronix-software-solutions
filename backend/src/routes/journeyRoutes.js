const express = require('express');
const router = express.Router();
const { getJourneys, getJourneyById, createJourney, updateJourney, deleteJourney } = require('../controllers/journeyController');

router.route('/')
    .get(getJourneys)
    .post(createJourney);

router.route('/:id')
    .get(getJourneyById)
    .put(updateJourney)
    .delete(deleteJourney);

module.exports = router;
