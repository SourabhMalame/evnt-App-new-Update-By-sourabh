// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // Required fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // Optional fields
    blog: { type: String },
    cellPhone: { type: String },
    company: { type: String },
    homePhone: { type: String },
    image: { type: String },
    jobTitle: { type: String },
    prefix: { type: String },
    suffix: { type: String },
    website: { type: String },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
