const express = require('express');
const router = express.Router();
const { getFooter, createFooter, updateFooter, deleteFooter } = require('../controllers/footerController');

router.route('/')
    .get(getFooter)
    .post(createFooter);

router.route('/:id')
    .put(updateFooter)
    .delete(deleteFooter);

module.exports = router;
