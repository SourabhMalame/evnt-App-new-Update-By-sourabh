// routes/profileRoutes.js
const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Profile related routes
router.route('/').post(profileController.createProfile) // Create a new profile
    .get(profileController.getAllProfiles); // Get all profiles

router.route('/:id').get(profileController.getProfileById) // Get a profile by ID
    .patch(profileController.updateProfileById) // Update a profile by ID
    .delete(profileController.deleteProfileById); // Delete a profile by ID

module.exports = router;
