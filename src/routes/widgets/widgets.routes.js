const router = require("express").Router();
const widgetController = require("../../controllers/widgets/widget.controller");

router.get("/pollWidget/:id", widgetController.pollWidget);

module.exports = router;
