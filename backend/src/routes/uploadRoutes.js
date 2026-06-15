const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/cloudinary');

// @desc    Upload single image to Cloudinary
// @route   POST /api/upload
// @access  Public (Should be protected in production)
router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }
        
        // Return the URL and public_id from Cloudinary
        res.status(200).json({
            message: 'Image uploaded successfully',
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all uploaded images from Cloudinary folder (Optional Admin tool)
// @route   GET /api/upload
router.get('/', async (req, res) => {
    try {
        // Fetch max 50 images from the specific folder
        const { resources } = await cloudinary.search
            .expression('folder:jronix_portfolio')
            .sort_by('created_at', 'desc')
            .max_results(50)
            .execute();
            
        const images = resources.map(file => ({
            url: file.secure_url,
            public_id: file.public_id,
            format: file.format,
            created_at: file.created_at
        }));
        
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
