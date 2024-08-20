const Dignitary = require('../models/dignitaryModel'); // Import Dignitary model

// Create Dignitary Entry
exports.createDignitary = async (req, res) => {
    try {
        const { name, position, organization, contactDetails, country, dateOfVisit, notes } = req.body;

        // Validation for required fields
        if (!name || !position || !organization || !country) {
            return res.status(400).json({
                status: 'fail',
                message: 'Name, position, organization, and country are required fields',
            });
        }

        // Step 1: Create a new dignitary entry
        const newDignitaryEntry = new Dignitary({
            name,
            position,
            organization,
            contactDetails,
            country,
            dateOfVisit,
            notes,
        });

        // Save the dignitary entry to the database
        const savedDignitaryEntry = await newDignitaryEntry.save();

        // Respond with the saved dignitary entry
        res.status(201).json({
            status: 'success',
            message: 'Dignitary entry created successfully',
            data: {
                dignitary: savedDignitaryEntry
            }
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






 

