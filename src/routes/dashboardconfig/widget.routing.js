const router = require("express").Router();
const widgetController = require("../../controllers/dashboardconfig/widget.controller");
const SettingsController = require("../../controllers/dashboardconfig/settings.controller");
const GraphController = require("../../controllers/dashboardconfig/graph.controller");
//Widget
router.get("", widgetController.GetWidgetsOfDashboard);
router.get("/:id", widgetController.GetOneWidget);
router.put("/:id", widgetController.UpdateWidget);
router.delete("/:id", widgetController.DeleteWidget);
router.post("", widgetController.CheckFieldsWidget, widgetController.CreateWidget);

//Widget settings
router.get("/:id/settings", SettingsController.GetSettings);
router.put("/:id/settings", SettingsController.UpdateSettings);

//Widget graphs.
router.get("/:id/widgets", GraphController.GetAll);
router.get("/:id/widgets/:graphId", GraphController.GetOne);
router.put("/:id/widgets/:graphId", GraphController.Update);
router.delete("/:id/widgets/:graphId", GraphController.Delete);
router.post("/:id/widgets", GraphController.Create);

//Widget poll.
router.get("/poll/:id", widgetController.Poll);

module.exports = router;
