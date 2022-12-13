const router = require("express").Router();

const dashboardRoutes = require("./dashboard/dashboard.routes");

router.use("/dashboard", dashboardRoutes);

module.exports = router;
