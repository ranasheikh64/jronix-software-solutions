const express = require('express');
const router = express.Router();
const { getAbout, createAbout, updateAbout, deleteAbout } = require('../controllers/aboutController');

router.route('/')
    .get(getAbout)
    .post(createAbout);

router.route('/:id')
    .put(updateAbout)
    .delete(deleteAbout);

module.exports = router;
