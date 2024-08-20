const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Adjust the path as needed

// Route to submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Route to get all feedback
router.get('/all', feedbackController.getAllFeedback);

// Route to delete feedback by ID
router.delete('/delete/:id', feedbackController.deleteFeedback);

module.exports = router;
