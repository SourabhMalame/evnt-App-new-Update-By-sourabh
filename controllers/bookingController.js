const Booking = require('../models/userBooking');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { passengers, totalAmount, AccountId } = req.body;

        // Create a new booking document
        const newBooking = new Booking({
            passengers,
            totalAmount,
            AccountId
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();

        // Respond with the saved booking
        res.status(201).json({
            status: 'success',
            message: 'Booking created successfully',
            data: savedBooking
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                status: 'fail',
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { passengers, totalAmount, paymentStatus } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { passengers, totalAmount, paymentStatus },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                status: 'fail',
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({
                status: 'fail',
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
