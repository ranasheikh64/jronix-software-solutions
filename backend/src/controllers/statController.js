const Stat = require('../models/Stat');

// @desc    Get all stats
// @route   GET /api/stats
const getStats = async (req, res) => {
    try {
        const stats = await Stat.find();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single stat
// @route   GET /api/stats/:id
const getStatById = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        if (!stat) {
            return res.status(404).json({ message: 'Stat not found' });
        }
        res.status(200).json(stat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a stat
// @route   POST /api/stats
const createStat = async (req, res) => {
    try {
        const stat = new Stat(req.body);
        const createdStat = await stat.save();
        res.status(201).json(createdStat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a stat
// @route   PUT /api/stats/:id
const updateStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        
        if (stat) {
            stat.icon = req.body.icon || stat.icon;
            stat.value = req.body.value || stat.value;
            stat.label = req.body.label || stat.label;
            
            const updatedStat = await stat.save();
            res.status(200).json(updatedStat);
        } else {
            res.status(404).json({ message: 'Stat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a stat
// @route   DELETE /api/stats/:id
const deleteStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.id);
        
        if (stat) {
            await Stat.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Stat removed' });
        } else {
            res.status(404).json({ message: 'Stat not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStats, getStatById, createStat, updateStat, deleteStat };
