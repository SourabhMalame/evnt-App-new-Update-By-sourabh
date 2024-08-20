const Profile = require('../models/profileModel'); // Adjust the path as needed

// Create a new profile
exports.createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json({ status: 'success', data: profile });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({ status: 'success', data: profiles });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Get a profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ status: 'fail', message: 'Profile not found' });
        }
        res.status(200).json({ status: 'success', data: profile });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Update a profile by ID
exports.updateProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!profile) {
            return res.status(404).json({ status: 'fail', message: 'Profile not found' });
        }
        res.status(200).json({ status: 'success', data: profile });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete a profile by ID
exports.deleteProfileById = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ status: 'fail', message: 'Profile not found' });
        }
        res.status(204).json({ status: 'success', message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};






