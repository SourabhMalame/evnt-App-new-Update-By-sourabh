const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

// account related routes
router.route("/newAccount").post(accountController.createAccount);
router.route("/verifyAccount/:email").post(accountController.verifyAccount);
router.route("/loginAccount").post(accountController.loginAccount);
router.route("/forgotPassword").post(accountController.forgotPassword);
router.route("/resetPassword/:token").patch(accountController.resetPassword);
router.route("/updateAccount/:accountId").patch(accountController.updateAccount);
router.route("/getAccountByMail/:email").get(accountController.getAccountByEmail);

//event related routes
router.route("/likedEvent/:eventId/:accountId").patch(accountController.eventLiked);
router.route("/getlikedEventIds/:accId").get(accountController.getAccountEventIds);

// booking related routes
router.route("/booking").patch(accountController.createBooking);


module.exports = router;
