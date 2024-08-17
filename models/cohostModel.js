const mongoose = require('mongoose');

const coHostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Co-host name is required']
    },
    email: {
        type: String,
        required: [true, 'Co-host email is required'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Co-host phone number is required']
    },
    organization: {
        type: String,
        required: [true, 'Organization is required']
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event' // Assuming you have an Event model
    }]
}, {
    timestamps: true
});

const CoHost = mongoose.model('CoHost', coHostSchema);

module.exports = CoHost;
