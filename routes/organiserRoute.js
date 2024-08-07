const express = require("express");
const organiserController = require("../controllers/organiserController");

const router = express.Router({ mergeParams: true });

// Create a new organiser
router.post('/organisers', organiserController.createOrganiser);

// Update organiser data
router.put('/organisers/:id', organiserController.updateData);

// Add a single event ID to an organiser
router.post('/organisers/addEvent', organiserController.addEventIdToOrganiser);

// Follow an organiser
router.post('/organisers/follow', organiserController.followOrganiser);

// Unfollow an organiser
router.post('/organisers/unfollow', organiserController.unfollowOrganiser);

// Get all organisers
router.get('/organisers', organiserController.getAllOrganisers);

// Get a single organiser by ID
router.get('/organisers/:id', organiserController.getOrganiserById);

// Delete an organiser by ID
router.delete('/organisers/:id', organiserController.deleteOrganiser);


router.get("/followers/:organiserId", organiserController.getFollowers);


module.exports = router;