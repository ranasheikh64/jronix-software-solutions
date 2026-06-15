const Career = require('../models/Career');

// @desc    Get career header section data
// @route   GET /api/career
const getCareerInfo = async (req, res) => {
    try {
        const career = await Career.findOne(); 
        if (!career) {
            return res.status(404).json({ message: 'Career section not found' });
        }
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new career section
// @route   POST /api/career
const createCareerInfo = async (req, res) => {
    try {
        const existingCareer = await Career.findOne();
        if (existingCareer) {
            return res.status(400).json({ message: 'Career section already exists. Please update it instead.' });
        }
        
        const career = new Career(req.body);
        const createdCareer = await career.save();
        res.status(201).json(createdCareer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update career section
// @route   PUT /api/career/:id
const updateCareerInfo = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        
        if (career) {
            career.badge = req.body.badge || career.badge;
            career.title = req.body.title || career.title;
            career.subtitle = req.body.subtitle || career.subtitle;
            career.perks = req.body.perks || career.perks;
            
            const updatedCareer = await career.save();
            res.status(200).json(updatedCareer);
        } else {
            res.status(404).json({ message: 'Career section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCareerInfo, createCareerInfo, updateCareerInfo };
