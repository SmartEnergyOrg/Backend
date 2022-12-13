const router = require("express").Router();

const dashboardRoutes = require("./powersources/powersources.routes");

router.use("/powersources", dashboardRoutes);

module.exports = router;
