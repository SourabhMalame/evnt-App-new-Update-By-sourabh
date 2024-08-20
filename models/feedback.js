const mongoose = require('mongoose');

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true
    },
    userEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
