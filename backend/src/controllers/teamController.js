const Team = require('../models/Team');

// @desc    Get all team members
// @route   GET /api/team
const getTeamMembers = async (req, res) => {
    try {
        const team = await Team.find();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single team member
// @route   GET /api/team/:id
const getTeamMemberById = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a team member
// @route   POST /api/team
const createTeamMember = async (req, res) => {
    try {
        const member = new Team(req.body);
        const createdMember = await member.save();
        res.status(201).json(createdMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
const updateTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        
        if (member) {
            member.name = req.body.name || member.name;
            member.role = req.body.role || member.role;
            member.description = req.body.description || member.description;
            member.image = req.body.image || member.image;
            member.skills = req.body.skills || member.skills;
            
            // Handle social links update if provided
            if (req.body.socialLinks) {
                member.socialLinks.github = req.body.socialLinks.github !== undefined ? req.body.socialLinks.github : member.socialLinks.github;
                member.socialLinks.linkedin = req.body.socialLinks.linkedin !== undefined ? req.body.socialLinks.linkedin : member.socialLinks.linkedin;
                member.socialLinks.twitter = req.body.socialLinks.twitter !== undefined ? req.body.socialLinks.twitter : member.socialLinks.twitter;
            }
            
            const updatedMember = await member.save();
            res.status(200).json(updatedMember);
        } else {
            res.status(404).json({ message: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
const deleteTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        
        if (member) {
            await Team.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Team member removed' });
        } else {
            res.status(404).json({ message: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember };
