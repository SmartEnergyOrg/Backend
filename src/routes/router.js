const router = require("express").Router();

const dashboardConfigRoutes = require("./dashboard.routing");
const widgetConfigRoutes = require("./widget.routing");
const weatherRoutes = require("./weather.routing");

router.use("/dashboards", dashboardConfigRoutes);
router.use("/widgets", widgetConfigRoutes);
router.use("/weathers", weatherRoutes);

module.exports = router;
