const express = require('express');
const coHostController = require("../controllers/cohostController");

const router = express.Router({ mergeParams: true });

// Co-Host related routes
router.route('/createCoHost').post(coHostController.createCoHost);
router.route('/getCoHosts').get(coHostController.getAllCoHosts);
router.route('/getCoHost/:id').get(coHostController.getCoHostById);
router.route('/updateCoHost/:id').patch(coHostController.updateCoHost);
router.route('/deleteCoHost/:id').delete(coHostController.deleteCoHost);

module.exports = router;
