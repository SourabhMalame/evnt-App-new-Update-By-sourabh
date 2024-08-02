const mongoose = require('mongoose');

// Define the organiser schema
const organiserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    socialLinks: {
        facebook: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    eventIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create an index for efficient querying
// organiserSchema.index({ name: 1, email: 1 });

// Create and export the model
const Organiser = mongoose.model('Organiser', organiserSchema);

module.exports = Organiser;
