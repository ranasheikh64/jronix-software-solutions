const JobApplication = require('../models/JobApplication');

// @desc    Submit a new job application
// @route   POST /api/applications
const submitApplication = async (req, res) => {
    try {
        const application = new JobApplication(req.body);
        const savedApp = await application.save();
        res.status(201).json({ message: "Application submitted successfully!", application: savedApp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all job applications
// @route   GET /api/applications
const getApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitApplication, getApplications };
