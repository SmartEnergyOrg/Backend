const router = require("express").Router();
const DashboardController = require("../../controllers/dashboardconfig/dashboardconfig.controller");

router.get("", DashboardController.GetAllDashboards);
router.get("/:id", DashboardController.GetOneDashboard);
router.post("", DashboardController.CreateDashboard);
router.put("/:id", DashboardController.UpdatesDashboard);
router.delete("/:id", DashboardController.DeleteDashboard);

module.exports = router;