const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    seat: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    stateOfResidence: {
        type: String,
        required: true,
    },
});

const bookingSchema = new mongoose.Schema({
    passengers: [passengerSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
