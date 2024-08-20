const Feedback = require('../models/feedback'); // Adjust the path as needed

// Controller function to handle feedback submission
exports.submitFeedback = async (req, res) => {
    try {
        const { userName, userEmail, feedback, rating } = req.body;

        // Create a new Feedback document
        const newFeedback = new Feedback({
            userName,
            userEmail,
            feedback,
            rating
        });

        // Save the feedback document to the database
        const savedFeedback = await newFeedback.save();

        // Respond with the saved feedback entry
        res.status(201).json({
            status: 'success',
            message: 'Feedback submitted successfully',
            data: savedFeedback
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Controller function to get all feedback
exports.getAllFeedback = async (req, res) => {
    try {
        // Fetch all feedback documents from the database
        const feedbacks = await Feedback.find();

        // Respond with the fetched feedback entries
        res.status(200).json({
            status: 'success',
            data: feedbacks
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Controller function to delete feedback by ID
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the feedback document by ID
        const deletedFeedback = await Feedback.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({
                status: 'fail',
                message: 'Feedback not found'
            });
        }

        // Respond with success message
        res.status(200).json({
            status: 'success',
            message: 'Feedback deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
