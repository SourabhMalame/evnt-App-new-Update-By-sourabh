const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

// Unprotected route
router.route("/newAccount").post(accountController.createAccount);

// Apply `protect` middleware to all routes that need protection

// Account-related routes (protected)
router.route("/loginAccount").post(accountController.loginAccount);
router.route("/verifyAccount/:email").post(accountController.verifyAccount);
router.route("/forgotPassword").post(accountController.forgotPassword);
router.route("/resetPassword/:token").patch(accountController.resetPassword);
router.route("/updateAccount/:accountId").patch(accountController.updateAccount);
router.route("/getAccountByMail/:email").get(accountController.getAccountByEmail);

// Event-related routes (protected)
router.route("/likedEvent/:eventId/:accountId").patch(accountController.eventLiked);
router.route("/getlikedEventIds/:accId").get(accountController.getAccountEventIds);

// Booking-related routes (protected)
router.route("/booking").patch(accountController.createBooking);

// Route for deleting an account (protected)
router.delete('/account/:accountId', accountController.deleteAccount);

module.exports = router;
