const router = require("express").Router();

const dashboardConfigRoutes = require("./dashboard.routing");
const widgetConfigRoutes = require("./widget.routing");

router.use("/dashboards", dashboardConfigRoutes);
router.use("/widgets", widgetConfigRoutes);

module.exports = router;
