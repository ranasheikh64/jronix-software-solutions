const About = require('../models/About');

// @desc    Get about section data
// @route   GET /api/about
const getAbout = async (req, res) => {
    try {
        const about = await About.findOne(); 
        if (!about) {
            return res.status(404).json({ message: 'About section not found' });
        }
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new about section
// @route   POST /api/about
const createAbout = async (req, res) => {
    try {
        const existingAbout = await About.findOne();
        if (existingAbout) {
            return res.status(400).json({ message: 'About section already exists. Please update it instead.' });
        }
        
        const about = new About(req.body);
        const createdAbout = await about.save();
        res.status(201).json(createdAbout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update about section
// @route   PUT /api/about/:id
const updateAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        
        if (about) {
            about.badge = req.body.badge || about.badge;
            about.title = req.body.title || about.title;
            about.subtitle = req.body.subtitle || about.subtitle;
            about.image = req.body.image || about.image;
            about.imageBadge = req.body.imageBadge !== undefined ? req.body.imageBadge : about.imageBadge;
            about.imageStats = req.body.imageStats || about.imageStats;
            about.storyTitle = req.body.storyTitle || about.storyTitle;
            about.storyDescription = req.body.storyDescription || about.storyDescription;
            about.mission = req.body.mission || about.mission;
            about.features = req.body.features || about.features;
            
            const updatedAbout = await about.save();
            res.status(200).json(updatedAbout);
        } else {
            res.status(404).json({ message: 'About section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete about section
// @route   DELETE /api/about/:id
const deleteAbout = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        
        if (about) {
            await About.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'About section removed' });
        } else {
            res.status(404).json({ message: 'About section not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAbout, createAbout, updateAbout, deleteAbout };
