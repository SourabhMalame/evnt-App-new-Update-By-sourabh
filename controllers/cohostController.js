const CoHost = require('../models/cohostModel'); // Import CoHost model

// Create Co-Host Entry
exports.createCoHost = async (req, res) => {
    try {
        const { name, email, phoneNumber, organization, events } = req.body;

        // Validation for required fields
        if (!name || !email || !phoneNumber || !organization) {
            return res.status(400).json({
                status: 'fail',
                message: 'Name, email, phone number, and organization are required fields',
            });
        }

        const newCoHost = new CoHost({
            name,
            email,
            phoneNumber,
            organization,
            events
        });

        const savedCoHost = await newCoHost.save();
        res.status(201).json({
            status: 'success',
            data: savedCoHost
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all Co-Hosts
exports.getAllCoHosts = async (req, res) => {
    try {
        const coHosts = await CoHost.find().populate('events');
        res.status(200).json({
            status: 'success',
            results: coHosts.length,
            data: coHosts
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single Co-Host by ID
exports.getCoHostById = async (req, res) => {
    try {
        const { id } = req.params;
        const coHost = await CoHost.findById(id).populate('events');

        if (!coHost) {
            return res.status(404).json({
                status: 'fail',
                message: 'Co-Host not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: coHost
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a Co-Host by ID
exports.updateCoHost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, organization, events } = req.body;

        const updatedCoHost = await CoHost.findByIdAndUpdate(
            id,
            { name, email, phoneNumber, organization, events },
            { new: true, runValidators: true }
        );

        if (!updatedCoHost) {
            return res.status(404).json({
                status: 'fail',
                message: 'Co-Host not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: updatedCoHost
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete a Co-Host by ID
exports.deleteCoHost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCoHost = await CoHost.findByIdAndDelete(id);

        if (!deletedCoHost) {
            return res.status(404).json({
                status: 'fail',
                message: 'Co-Host not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Co-Host deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
