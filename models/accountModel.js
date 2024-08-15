const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const participantsSchema = new mongoose.Schema({
    name: String,
    seat: String,
    gender: String,
    age: Number,
    stateOfResidence: String,
});

const bookingSchema = new mongoose.Schema({
    participants: [participantsSchema],
    totalAmount: Number,
    paymentStatus: {
        type: String,
        default: 'Pending',
    },
    eventId: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
    },
});

const accountSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    likedEvents: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Event",
        },
    ],
    verified: {
        type: Boolean,
        default: false,
    },
    organiserId: {
        type: mongoose.Schema.ObjectId,
        ref: "Organiser",
    },
    bookings: [bookingSchema],
    followingOrganisers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Organiser",
        },
    ],
});

accountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

accountSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

accountSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;











