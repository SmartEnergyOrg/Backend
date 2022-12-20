const router = require("express").Router();

const dashboardConfigRoutes = require("./dashboardconfig/dashboard.routing");
const widgetRoutes = require("./widgets/widgets.routes");
const widgetConfigRoutes = require("./dashboardconfig/widget.routing");

router.use("/widgets", widgetRoutes);
router.use("/dashboards", dashboardConfigRoutes);
router.use("/widgetsconfig", widgetConfigRoutes);

module.exports = router;
