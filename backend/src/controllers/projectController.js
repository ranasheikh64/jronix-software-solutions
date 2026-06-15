const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
    try {
        // Optional: Filter by category (e.g., ?category=App)
        const filter = req.query.category && req.query.category !== 'All' 
            ? { category: req.query.category } 
            : {};
            
        const projects = await Project.find(filter);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project details
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (project) {
            project.category = req.body.category || project.category;
            project.typeBadge = req.body.typeBadge || project.typeBadge;
            project.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : project.isFeatured;
            project.image = req.body.image || project.image;
            project.title = req.body.title || project.title;
            project.description = req.body.description || project.description;
            project.stats = req.body.stats || project.stats;
            project.techStack = req.body.techStack || project.techStack;
            project.link = req.body.link || project.link;
            
            const updatedProject = await project.save();
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (project) {
            await Project.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
