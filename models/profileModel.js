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

    // Address fields
    billingAddress: {
        address: { type: String },
        address2: { type: String },
        city: { type: String },
        country: { type: String },
        zipPostalCode: { type: String },
        state: { type: String },
    },
    shippingAddress: {
        address: { type: String },
        address2: { type: String },
        city: { type: String },
        country: { type: String },
        zipPostalCode: { type: String },
        state: { type: String },
    },
    workAddress: {
        address: { type: String },
        address2: { type: String },
        city: { type: String },
        country: { type: String },
        zipPostalCode: { type: String },
        state: { type: String },
    },
    homeAddress: {  // Added home address section
        address: { type: String },
        address2: { type: String },
        city: { type: String },
        country: { type: String },
        zipPostalCode: { type: String },
        state: { type: String },
    },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
