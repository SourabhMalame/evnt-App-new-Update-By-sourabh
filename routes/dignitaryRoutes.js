const express = require("express");
const dignitaryController = require("../controllers/dignitaryController");

const router = express.Router({ mergeParams: true });

// Dignitary related routes
router.route("/createDignitary").post(dignitaryController.createDignitary);
router.route("/getDignitaries").get(dignitaryController.getAllDignitaries);
router.route("/getDignitary/:id").get(dignitaryController.getDignitaryById);
router.route("/updateDignitary/:id").patch(dignitaryController.updateDignitary);
router.route("/deleteDignitary/:id").delete(dignitaryController.deleteDignitary);

module.exports = router;
