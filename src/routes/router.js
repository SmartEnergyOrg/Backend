const router = require("express").Router();

const dashboardRoutes = require("./powersources/powersources.routes");
const dashboardConfigRoutes = require("./dashboardconfig/dashboard.routing");
const widgetConfigRoutes = require("./dashboardconfig/widget.routing");

router.use("/solar", dashboardRoutes);
router.use("/dashboards", dashboardConfigRoutes);
router.use("/widgets", widgetConfigRoutes);
module.exports = router;
