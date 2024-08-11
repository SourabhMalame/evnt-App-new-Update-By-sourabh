const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    dateandtime: {
        type: String,  // You might want to use a more structured format like Date
        // required: true,
    },
    ticketprice: {
        type: Number,
        // required: true,
    },
    imageurl: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    link: {
        type: String,
        // required: true,
    },
    things_to_carry: {
        type: [String],  // Array of strings
        default: [],
    },
    food_arrangements: {
        type: [String],  // Array of strings, multiple strings allowed
        default: [],
    },
    utilities: {
        type: [String],  // Array of strings
        default: [],
    },
    bookedBy: [
        {
            firstName: String,
            lastName: String,
            email: String,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            bookingDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    howToReach: {
        type: String,
        default: '',
    },
    organizerUrl: {
        type: String,
        required: true,
    },
    Hashtags: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    toShowEvent: {
        type: Boolean,
        default: true,
    },
});

// Create an index for efficient querying
eventSchema.index({ location: 1, title: 1 });

// Create and export the model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
