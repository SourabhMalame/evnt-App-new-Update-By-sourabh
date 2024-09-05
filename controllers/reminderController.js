const Reminder = require('../models/reminderModel');

// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
        const { organizer, subject, description, reminderDate } = req.body;

        // Handle file upload if there is an image
        let imagePath = '';
        if (req.file) {
            imagePath = req.file.path;  // Assuming you're using multer for file upload
        }

        const newReminder = new Reminder({
            organizer,
            subject,
            description,
            image: imagePath,
            reminderDate,
        });

        await newReminder.save();

        res.status(201).json({ message: 'Reminder created successfully!', reminder: newReminder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reminder', error });
    }
};

// Get all reminders
exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find().populate('organizer');  // Populate organizer details
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reminders', error });
    }
};

// Get a single reminder
exports.getReminderById = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id).populate('organizer');
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reminder', error });
    }
};

// Update reminder
exports.updateReminder = async (req, res) => {
    try {
        const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Reminder updated successfully!', reminder: updatedReminder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reminder', error });
    }
};

// Delete reminder
exports.deleteReminder = async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Reminder deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reminder', error });
    }
};
