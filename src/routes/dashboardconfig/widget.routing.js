const router = require("express").Router();
const widgetController = require("../../controllers/dashboardconfig/widget.controller");
const SettingsController = require("../../controllers/dashboardconfig/settings.controller");
const GraphController = require("../../controllers/dashboardconfig/graph.controller");
//Widget
router.get("", widgetController.GetWidgetsOfDashboard);
router.get("/:id", widgetController.GetOneWidget);
router.put("/:id",widgetController.CheckUpdateWidget, widgetController.UpdateWidget);
router.delete("/:id", widgetController.DeleteWidget);
router.post("", widgetController.CheckFieldsWidget, widgetController.CreateWidget);

//Widget settings
router.get("/:id/settings", SettingsController.GetSettings);
router.put("/:id/settings",SettingsController.InputSettings, SettingsController.UpdateSettings);

//Widget graphs.
router.get("/:id/graphs", GraphController.GetAll);
router.get("/:id/graphs/:graphId", GraphController.GetOne);
router.put("/:id/graphs/:graphId", GraphController.CheckInput, GraphController.Update);
router.delete("/:id/graphs/:graphId", GraphController.Delete);
router.post("/:id/graphs", GraphController.CheckInput, GraphController.Create);

//Widget poll.
router.get("/poll/:id", widgetController.Poll);

module.exports = router;
