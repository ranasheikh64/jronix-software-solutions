const OrbitItem = require('../models/OrbitItem');

// @desc    Get all orbit items
// @route   GET /api/orbit
const getOrbitItems = async (req, res) => {
    try {
        const items = await OrbitItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single orbit item
// @route   GET /api/orbit/:id
const getOrbitItemById = async (req, res) => {
    try {
        const item = await OrbitItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Orbit item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an orbit item
// @route   POST /api/orbit
const createOrbitItem = async (req, res) => {
    try {
        const item = new OrbitItem(req.body);
        const createdItem = await item.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an orbit item
// @route   PUT /api/orbit/:id
const updateOrbitItem = async (req, res) => {
    try {
        const item = await OrbitItem.findById(req.params.id);
        
        if (item) {
            item.name = req.body.name || item.name;
            item.icon = req.body.icon || item.icon;
            item.orbitLevel = req.body.orbitLevel || item.orbitLevel;
            
            const updatedItem = await item.save();
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: 'Orbit item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an orbit item
// @route   DELETE /api/orbit/:id
const deleteOrbitItem = async (req, res) => {
    try {
        const item = await OrbitItem.findById(req.params.id);
        
        if (item) {
            await OrbitItem.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Orbit item removed' });
        } else {
            res.status(404).json({ message: 'Orbit item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrbitItems, getOrbitItemById, createOrbitItem, updateOrbitItem, deleteOrbitItem };
