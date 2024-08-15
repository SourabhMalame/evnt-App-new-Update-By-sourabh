const express = require("express");
const contactFormController = require("../controllers/contactFormController");

const router = express.Router({ mergeParams: true });

// Contact form related routes
router.route("/submitContactForm").post(contactFormController.createContactFormEntry);
router.route("/getContactForms").get(contactFormController.getAllContactFormEntries);
router.route("/getContactForm/:id").get(contactFormController.getContactFormEntryById);
router.route("/updateContactForm/:id").patch(contactFormController.updateContactFormEntry);
router.route("/deleteContactForm/:id").delete(contactFormController.deleteContactFormEntry);

module.exports = router;
