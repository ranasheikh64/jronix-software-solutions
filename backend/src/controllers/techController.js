const Tech = require('../models/Tech');

// @desc    Get tech arsenal section data
// @route   GET /api/tech
const getTech = async (req, res) => {
    try {
        const tech = await Tech.findOne(); 
        if (!tech) {
            return res.status(404).json({ message: 'Tech Arsenal section not found' });
        }
        res.status(200).json(tech);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new tech arsenal section
// @route   POST /api/tech
const createTech = async (req, res) => {
    try {
        const existingTech = await Tech.findOne();
        if (existingTech) {
            return res.status(400).json({ message: 'Tech Arsenal section already exists. Please update it instead.' });
        }
        
        const tech = new Tech(req.body);
        const createdTech = await tech.save();
        res.status(201).json(createdTech);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update tech arsenal section
// @route   PUT /api/tech/:id
const updateTech = async (req, res) => {
    try {
        const tech = await Tech.findById(req.params.id);
        
        if (tech) {
            tech.badge = req.body.badge || tech.badge;
            tech.title = req.body.title || tech.title;
            tech.technologies = req.body.technologies || tech.technologies;
            
            const updatedTech = await tech.save();
            res.status(200).json(updatedTech);
        } else {
            res.status(404).json({ message: 'Tech Arsenal section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTech, createTech, updateTech };
