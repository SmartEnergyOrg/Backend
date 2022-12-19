const router = require("express").Router();

const powerSourcesRoutes = require("./powersources/powersources.routes");
const widgetRoutes = require("./widgets/widgets.routes");

router.use("/powersources", powerSourcesRoutes);
router.use("/widgets", widgetRoutes);
router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

module.exports = router;
