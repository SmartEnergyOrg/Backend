const router = require("express").Router();
const widgetController = require("../../controllers/widgets/widget.controller");

router.get("/poll/:id", widgetController.poll);

module.exports = router;
