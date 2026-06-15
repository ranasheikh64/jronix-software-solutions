const Journey = require('../models/Journey');

// @desc    Get all journey milestones
// @route   GET /api/journey
const getJourneys = async (req, res) => {
    try {
        // Sort by year ascending
        const journeys = await Journey.find().sort({ year: 1 });
        res.status(200).json(journeys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single journey milestone
// @route   GET /api/journey/:id
const getJourneyById = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        if (!journey) {
            return res.status(404).json({ message: 'Journey milestone not found' });
        }
        res.status(200).json(journey);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a journey milestone
// @route   POST /api/journey
const createJourney = async (req, res) => {
    try {
        const journey = new Journey(req.body);
        const createdJourney = await journey.save();
        res.status(201).json(createdJourney);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a journey milestone
// @route   PUT /api/journey/:id
const updateJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        
        if (journey) {
            journey.year = req.body.year || journey.year;
            journey.title = req.body.title || journey.title;
            journey.description = req.body.description || journey.description;
            
            const updatedJourney = await journey.save();
            res.status(200).json(updatedJourney);
        } else {
            res.status(404).json({ message: 'Journey milestone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a journey milestone
// @route   DELETE /api/journey/:id
const deleteJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        
        if (journey) {
            await Journey.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Journey milestone removed' });
        } else {
            res.status(404).json({ message: 'Journey milestone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getJourneys, getJourneyById, createJourney, updateJourney, deleteJourney };
