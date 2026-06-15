const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (review) {
            review.rating = req.body.rating || review.rating;
            review.reviewText = req.body.reviewText || review.reviewText;
            review.clientImage = req.body.clientImage || review.clientImage;
            review.clientName = req.body.clientName || review.clientName;
            review.clientRole = req.body.clientRole || review.clientRole;
            
            const updatedReview = await review.save();
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (review) {
            await Review.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, getReviewById, createReview, updateReview, deleteReview };
