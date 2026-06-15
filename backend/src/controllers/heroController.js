const Hero = require('../models/Hero');

// @desc    Get hero section data
// @route   GET /api/hero
const getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne(); // Typically only one hero section exists
        if (!hero) {
            return res.status(404).json({ message: 'Hero section not found' });
        }
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new hero section
// @route   POST /api/hero
const createHero = async (req, res) => {
    try {
        const existingHero = await Hero.findOne();
        if (existingHero) {
            return res.status(400).json({ message: 'Hero section already exists. Please update it instead.' });
        }
        
        const hero = new Hero(req.body);
        const createdHero = await hero.save();
        res.status(201).json(createdHero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update hero section
// @route   PUT /api/hero/:id
const updateHero = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        
        if (hero) {
            hero.badge = req.body.badge || hero.badge;
            hero.titles = req.body.titles || hero.titles;
            hero.subtitle = req.body.subtitle || hero.subtitle;
            hero.techStack = req.body.techStack || hero.techStack;
            
            const updatedHero = await hero.save();
            res.status(200).json(updatedHero);
        } else {
            res.status(404).json({ message: 'Hero section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete hero section
// @route   DELETE /api/hero/:id
const deleteHero = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        
        if (hero) {
            await Hero.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Hero section removed' });
        } else {
            res.status(404).json({ message: 'Hero section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHero, createHero, updateHero, deleteHero };
