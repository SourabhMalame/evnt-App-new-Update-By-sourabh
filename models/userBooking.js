const mongoose = require('mongoose');

// Define the participant schema
const participantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },

});

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    participants: [participantSchema],  // Array of participant objects
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',  // Reference to the Event model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
