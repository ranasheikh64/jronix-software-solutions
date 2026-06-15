const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        
        const existingSub = await Newsletter.findOne({ email });
        if (existingSub) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const subscriber = new Newsletter({ email });
        await subscriber.save();
        
        res.status(201).json({ message: 'Successfully subscribed to newsletter', subscriber });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all subscribers (Admin)
// @route   GET /api/newsletter
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Newsletter.findById(req.params.id);
        
        if (subscriber) {
            await Newsletter.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Subscriber removed' });
        } else {
            res.status(404).json({ message: 'Subscriber not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { subscribe, getSubscribers, deleteSubscriber };
