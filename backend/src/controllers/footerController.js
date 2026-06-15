const Footer = require('../models/Footer');

// @desc    Get footer data
// @route   GET /api/footer
const getFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne();
        if (!footer) {
            return res.status(404).json({ message: 'Footer data not found' });
        }
        res.status(200).json(footer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create footer data (Only once)
// @route   POST /api/footer
const createFooter = async (req, res) => {
    try {
        const existingFooter = await Footer.findOne();
        if (existingFooter) {
            return res.status(400).json({ message: 'Footer already exists. Use PUT to update.' });
        }
        
        const footer = new Footer(req.body);
        const createdFooter = await footer.save();
        res.status(201).json(createdFooter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update footer data
// @route   PUT /api/footer/:id
const updateFooter = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);
        
        if (footer) {
            footer.description = req.body.description || footer.description;
            footer.socialLinks = req.body.socialLinks || footer.socialLinks;
            footer.quickLinks = req.body.quickLinks || footer.quickLinks;
            footer.servicesLinks = req.body.servicesLinks || footer.servicesLinks;
            footer.bottomLinks = req.body.bottomLinks || footer.bottomLinks;
            footer.copyrightText = req.body.copyrightText || footer.copyrightText;
            
            const updatedFooter = await footer.save();
            res.status(200).json(updatedFooter);
        } else {
            res.status(404).json({ message: 'Footer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete footer data (Reset)
// @route   DELETE /api/footer/:id
const deleteFooter = async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);
        
        if (footer) {
            await Footer.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Footer removed' });
        } else {
            res.status(404).json({ message: 'Footer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFooter, createFooter, updateFooter, deleteFooter };
