const express = require("express");
const organiserController = require("../controllers/organiserController");

const router = express.Router({ mergeParams: true });

router.route("/createOrganiser").post(organiserController.createOrganiser);

router.route("/updateOrganiser/:id").patch(organiserController.updateData);

router.patch('/addEventId', organiserController.addEventIdToOrganiser);


module.exports = router;