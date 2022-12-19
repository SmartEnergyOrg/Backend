const router = require("express").Router();
const DashboardController = require("../../controllers/dashboardconfig/dashboardconfig.controller");

router.get("", DashboardController.GetAllDashboards);
router.delete("/:id", DashboardController.DeleteDashboard);

module.exports = router;