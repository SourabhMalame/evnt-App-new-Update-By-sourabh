const express = require("express");
const organiserController = require("../controllers/organiserController");

const router = express.Router({ mergeParams: true });

router.route("/createOrganiser").post(organiserController.createOrganiser);

router.route("/updateOrganiser/:id").patch(organiserController.updateData);

router.patch('/addEventId', organiserController.addEventIdToOrganiser);

// Add follow and unfollow routes
router.patch('/follow', organiserController.followOrganiser);
router.patch('/unfollow', organiserController.unfollowOrganiser);


module.exports = router;