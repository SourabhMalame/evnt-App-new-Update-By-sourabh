const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/booking', bookingController.createBooking);

// Get all bookings
router.get('/bookings', bookingController.getAllBookings);

// Get a single booking by ID
router.get('/bookings/:id', bookingController.getBookingById);

// Update a booking by ID
router.put('/bookings/:id', bookingController.updateBooking);

// Delete a booking by ID
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
