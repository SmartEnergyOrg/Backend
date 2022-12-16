const router = require("express").Router();
const solarController = require("../../controllers/powersources/solar.controller");

router.get("/solar", solarController.getCompleteTimeline);
router.get("/wind", windController.getCompleteTimeline);
router.get("/battery", batteryController.getCompleteTimeline);
router.get("/nuclear", nuclearController.getCompleteTimeline);

module.exports = router;
