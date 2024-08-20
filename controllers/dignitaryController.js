const Dignitary = require('../models/dignitaryModel'); // Import Dignitary model
const Organiser = require("../models/organiserModel")
// Create Dignitary Entry
exports.createDignitary = async (req, res) => {
    try {
        const { name, position, organization, contactDetails, country, dateOfVisit, notes, organiserId } = req.body;

        // Create a new Dignitary document
        const newDignitary = new Dignitary({
            name,
            position,
            organization,
            contactDetails,
            country,
            dateOfVisit,
            notes
        });

        const savedDignitary = await newDignitary.save();

        // Update the Organiser to include the new Dignitary's ID
        await Organiser.findByIdAndUpdate(
            organiserId,
            { $push: { dignitaries: savedDignitary._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(201).json({
            status: 'success',
            message: 'Dignitary created and organiser updated successfully',
            data: savedDignitary
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all Dignitary Entries
exports.getAllDignitaries = async (req, res) => {
    try {
        const dignitaries = await Dignitary.find();
        res.status(200).json({
            status: 'success',
            results: dignitaries.length,
            data: dignitaries
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single Dignitary Entry by ID
exports.getDignitaryById = async (req, res) => {
    try {
        const { id } = req.params;
        const dignitary = await Dignitary.findById(id);

        if (!dignitary) {
            return res.status(404).json({
                status: 'fail',
                message: 'Dignitary entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: dignitary
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a Dignitary Entry by ID
exports.updateDignitary = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, organization, contactDetails, country, dateOfVisit, notes } = req.body;

        const updatedDignitary = await Dignitary.findByIdAndUpdate(
            id,
            { name, position, organization, contactDetails, country, dateOfVisit, notes },
            { new: true, runValidators: true }
        );

        if (!updatedDignitary) {
            return res.status(404).json({
                status: 'fail',
                message: 'Dignitary entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Dignitary entry updated successfully',
            data: updatedDignitary
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete a Dignitary Entry by ID
exports.deleteDignitary = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDignitary = await Dignitary.findByIdAndDelete(id);

        if (!deletedDignitary) {
            return res.status(404).json({
                status: 'fail',
                message: 'Dignitary entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Dignitary entry deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};






 

