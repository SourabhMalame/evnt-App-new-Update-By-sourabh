const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, 'An event must have a title'],
        trim: true,
    },
    description: {
        type: String,
        // required: [true, 'An event must have a description'],
    },
    date: {
        type: Date,
        // required: [true, 'An event must have a date'],
    },
    location: {
        type: String,
        // required: [true, 'An event must have a location'],
    },
    price: {
        type: Number,
        // required: [true, 'An event must have a price'],
    },
    type: {
        type: String,
        enum: ['Workshop', 'Conference', 'Seminar', 'Webinar', 'Other'],
        // required: [true, 'An event must have a type'],
    },
    eventId: {
        type: String,
        unique: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create an index for efficient querying
eventSchema.index({ location: 1, title: 1 });

// Create and export the model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
