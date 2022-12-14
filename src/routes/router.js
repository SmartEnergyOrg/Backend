const router = require("express").Router();

const dashboardRoutes = require("./powersources/powersources.routes");

router.use("/solar", dashboardRoutes);

module.exports = router;
