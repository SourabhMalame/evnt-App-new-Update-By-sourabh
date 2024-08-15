const Booking = require('../models/userBooking');
const Event = require('../models/eventModel'); // Import Event model

// Create Booking
exports.createBooking = async (req, res) => {
    try {
        const { participants, totalAmount, AccountId, eventId } = req.body;

        if (!Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Participants should be an array and cannot be empty',
            });
        }

        // Step 1: Create a new booking document
        const newBooking = new Booking({
            participants,
            totalAmount,
            AccountId,
            eventId
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();

        // Step 2: Prepare the booking details to update the event
        const bookingDate = new Date();
        const bookingsToUpdate = participants.map(participant => ({
            firstName: participant.firstName,
            lastName: participant.lastName,
            email: participant.email,
            bookingDate
        }));

        // Update the bookedBy field in the Event model
        await Event.findOneAndUpdate(
            { _id: eventId },
            {
                $push: {
                    bookedBy: {
                        $each: bookingsToUpdate
                    }
                }
            },
            { new: true, useFindAndModify: false } // Return the updated document
        );

        // Respond with the saved booking
        res.status(201).json({
            status: 'success',
            message: 'Booking created successfully',
            data: {
                booking: savedBooking,
                bookingsAddedToEvent: bookingsToUpdate
            }
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








