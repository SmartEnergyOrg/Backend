const router = require("express").Router();
const widgetController = require("../../controllers/dashboardconfig/widget.controller");

//Widget
router.get("", widgetController.GetWidgetsOfDashboard);
router.get("/:id", widgetController.GetOneWidget);
router.put("/:id", widgetController.UpdateWidget);
router.delete("/:id", widgetController.DeleteWidget);
router.post("", widgetController.CreateWidget);

//Widget settings

//Widget graphs.

module.exports = router;