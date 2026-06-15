const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a service
// @route   POST /api/services
const createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a service
// @route   PUT /api/services/:id
const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (service) {
            service.icon = req.body.icon || service.icon;
            service.tags = req.body.tags || service.tags;
            service.title = req.body.title || service.title;
            service.description = req.body.description || service.description;
            service.highlightIcon = req.body.highlightIcon || service.highlightIcon;
            service.highlightText = req.body.highlightText || service.highlightText;
            service.link = req.body.link || service.link;
            
            const updatedService = await service.save();
            res.status(200).json(updatedService);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (service) {
            await Service.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
