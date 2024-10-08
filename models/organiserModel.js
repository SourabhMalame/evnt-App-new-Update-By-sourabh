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
    },
    eventIds: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    coHosts: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    dignitaries: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    bankAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the model
const Organiser = mongoose.model('Organizer', organiserSchema);

module.exports = Organiser;
