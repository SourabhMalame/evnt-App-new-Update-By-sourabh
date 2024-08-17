const mongoose = require('mongoose');

const dignitarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    contactDetails: {
        email: String,
        phone: String,
    },
    country: {
        type: String,
        required: true
    },
    dateOfVisit: {
        type: Date,
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

const Dignitary = mongoose.model('Dignitary', dignitarySchema);

module.exports = Dignitary;
