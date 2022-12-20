const router = require("express").Router();

const dashboardConfigRoutes = require("./dashboardconfig/dashboard.routing");
const widgetConfigRoutes = require("./dashboardconfig/widget.routing");

router.use("/dashboards", dashboardConfigRoutes);
router.use("/widgetsconfig", widgetConfigRoutes);

module.exports = router;
