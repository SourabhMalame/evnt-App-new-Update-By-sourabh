const ContactForm = require('../models/contactForm'); // Import ContactForm model

// Create Contact Form Entry
exports.createContactFormEntry = async (req, res) => {
    try {
        const { name, email, phoneNumber, organizer, subject, description } = req.body;

        // Validation for required fields
        if (!name || !email || !phoneNumber || !organizer || !subject || !description) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required',
            });
        }

        // Step 1: Create a new contact form entry
        const newContactFormEntry = new ContactForm({
            name,
            email,
            phoneNumber,
            organizer,
            subject,
            description,
            attachImage: req.file ? req.file.path : null // Handle file upload if any
        });

        // Save the contact form entry to the database
        const savedContactFormEntry = await newContactFormEntry.save();

        // Respond with the saved contact form entry
        res.status(201).json({
            status: 'success',
            message: 'Contact form submitted successfully',
            data: {
                contactFormEntry: savedContactFormEntry
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all Contact Form Entries
exports.getAllContactFormEntries = async (req, res) => {
    try {
        const contactFormEntries = await ContactForm.find();
        res.status(200).json({
            status: 'success',
            results: contactFormEntries.length,
            data: contactFormEntries
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single Contact Form Entry by ID
exports.getContactFormEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const contactFormEntry = await ContactForm.findById(id);

        if (!contactFormEntry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contact form entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: contactFormEntry
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a Contact Form Entry by ID
exports.updateContactFormEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, organizer, subject, description } = req.body;

        const updatedContactFormEntry = await ContactForm.findByIdAndUpdate(
            id,
            { name, email, phoneNumber, organizer, subject, description },
            { new: true, runValidators: true }
        );

        if (!updatedContactFormEntry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contact form entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact form entry updated successfully',
            data: updatedContactFormEntry
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete a Contact Form Entry by ID
exports.deleteContactFormEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContactFormEntry = await ContactForm.findByIdAndDelete(id);

        if (!deletedContactFormEntry) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contact form entry not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Contact form entry deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
