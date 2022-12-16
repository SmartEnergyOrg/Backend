const router = require("express").Router();

const powerSourcesRoutes = require("./powersources/powersources.routes");

router.use("/powersources", powerSourcesRoutes);

module.exports = router;
