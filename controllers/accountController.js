const Account = require("../models/accountModel"); 
const crypto = require("crypto");
const jwt = require('jsonwebtoken');


// Create a new account
exports.createAccount = async (req, res) => {
    try {
        // Create a new account
        const newAccount = await Account.create(req.body);

        console.log(JSON.stringify(newAccount, null, 3));

        res.status(201).json({
            status: "success",
            data: {
                account: newAccount,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Verify account
exports.verifyAccount = async (req, res) => {
    try {
        const account = await Account.findOneAndUpdate(
            { email: req.params.email },
            { verified: true },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Login account

exports.loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the account by email and include the password field
        const account = await Account.findOne({ email }).select("+password");

        // 2. Check if the account exists and if the password is correct
        if (!account || !(await account.correctPassword(password, account.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password",
            });
        }

        // 3. Create a new JWT token
        const token = jwt.sign(
            { id: account._id, email: account.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set token expiration time
        );

        // 4. Update the account document with the new token
        account.token = token;
        await account.save();

        // 5. Respond with the token and user data
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                account,
            },
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const account = await Account.findOne({ email: req.body.email });
        if (!account) {
            return res.status(404).json({
                status: "fail",
                message: "No account found with that email",
            });
        }

        const resetToken = account.createPasswordResetToken();
        await account.save({ validateBeforeSave: false });

        // Send resetToken to user's email (implementation not shown)

        res.status(200).json({
            status: "success",
            message: "Token sent to email",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const account = await Account.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!account) {
            return res.status(400).json({
                status: "fail",
                message: "Token is invalid or has expired",
            });
        }

        account.password = req.body.password;
        account.passwordResetToken = undefined;
        account.passwordResetExpires = undefined;
        await account.save();

        res.status(200).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Update account
exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.accountId,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Like an event
exports.eventLiked = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.accountId,
            { $addToSet: { likedEvents: req.params.eventId } },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Get liked event IDs
exports.getAccountEventIds = async (req, res) => {
    try {
        const account = await Account.findById(req.params.accId).select("likedEvents");
        res.status(200).json({
            status: "success",
            data: {
                likedEvents: account.likedEvents,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Get account by email
exports.getAccountByEmail = async (req, res) => {
    try {
        const account = await Account.findOne({ email: req.params.email });
        res.status(200).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Controller to add an event ID to the eventBooked array of an account
exports.bookEvent = async (req, res) => {
    try {
        const { accountId, eventId, } = req.body;

        const updatedAccount = await Account.findByIdAndUpdate(
            accountId,
            { $push: { eventBooked: eventId } }, // Add the event ID to the array
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: {
                account: updatedAccount,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.followOrganiser = async (req, res) => {
    try {
        const userId = req.user.id;
        const organiserId = req.params.organiserId;

        const user = await Account.findByIdAndUpdate(
            userId,
            { $addToSet: { followingOrganisers: organiserId } },
            { new: true }
        );

        res.status(200).json({ status: "success", data: { user } });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// Create a booking for an account
exports.createBooking = async (req, res) => {
    try {
        const { userId, participants, totalAmount, eventId } = req.body;

        const account = await Account.findById(userId);

        if (!account) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        const newBooking = {
            participants,
            totalAmount,
            eventId,
            paymentStatus: "Pending", // default value
        };

        account.bookings.push(newBooking);
        await account.save();

        res.status(201).json({
            status: "success",
            data: {
                booking: newBooking,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.accountId);

        if (!account) {
            return res.status(404).json({
                status: "fail",
                message: "No account found with that ID",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Account deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};










