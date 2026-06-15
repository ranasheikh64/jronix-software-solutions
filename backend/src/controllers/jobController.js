const Job = require('../models/Job');

// @desc    Get all active jobs
// @route   GET /api/jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all jobs (including inactive - for admin)
// @route   GET /api/jobs/all
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
const createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const createdJob = await job.save();
        res.status(201).json(createdJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (job) {
            job.title = req.body.title || job.title;
            job.type = req.body.type || job.type;
            job.location = req.body.location || job.location;
            job.applyLink = req.body.applyLink || job.applyLink;
            job.isActive = req.body.isActive !== undefined ? req.body.isActive : job.isActive;
            
            const updatedJob = await job.save();
            res.status(200).json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (job) {
            await Job.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getJobs, getAllJobs, getJobById, createJob, updateJob, deleteJob };
