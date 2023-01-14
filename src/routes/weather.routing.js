const router = require("express").Router();
const weatherController = require("../controllers/weather.controller");

router.get("", weatherController.GetOne);
router.put("", weatherController.Validate, weatherController.Update);

module.exports = router;