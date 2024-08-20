const CoHost = require('../models/cohostModel'); // Import CoHost model
const Organiser = require("../models/organiserModel")

// Create Co-Host Entry
exports.createCoHost = async (req, res) => {
    try {
        const { name, email, phoneNumber, organization, events, organiserId } = req.body;

        // Create a new CoHost document
        const newCoHost = new CoHost({
            name,
            email,
            phoneNumber,
            organization,
            events
        });

        const savedCoHost = await newCoHost.save();

        // Update the Organiser to include the new CoHost's ID
        await Organiser.findByIdAndUpdate(
            organiserId,
            { $push: { coHosts: savedCoHost._id } },
            { new: true, useFindAndModify: false }
        );

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
        const { coHostId, organizerId } = req.body;

        // Find and delete the CoHost
        const deletedCoHost = await CoHost.findByIdAndDelete(coHostId);

        if (!deletedCoHost) {
            return res.status(404).json({
                status: 'fail',
                message: 'CoHost not found'
            });
        }

        // Update the Organizer to remove the CoHost's ID
        await Organizer.findByIdAndUpdate(
            organizerId,
            { $pull: { coHosts: coHostId } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json({
            status: 'success',
            message: 'CoHost deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

