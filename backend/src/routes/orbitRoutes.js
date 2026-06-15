const express = require('express');
const router = express.Router();
const { getOrbitItems, getOrbitItemById, createOrbitItem, updateOrbitItem, deleteOrbitItem } = require('../controllers/orbitController');

router.route('/')
    .get(getOrbitItems)
    .post(createOrbitItem);

router.route('/:id')
    .get(getOrbitItemById)
    .put(updateOrbitItem)
    .delete(deleteOrbitItem);

module.exports = router;
