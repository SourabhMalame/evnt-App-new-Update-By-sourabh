const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',  // Optional reference to an Organizer
    },
    subject: {
        type: String,  // Subject is optional
    },
    description: {
        type: String,  // Description is optional
    },
    image: {
        type: String,  // Optional path to an image
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the creation date
    },
    reminderDate: {
        type: Date,  // Optional reminder date
    }
});

module.exports = mongoose.model('Reminder', reminderSchema);
