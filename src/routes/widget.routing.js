const router = require("express").Router();

const widgetController = require("../controllers/widget.controller");
const GraphController = require("../controllers/graph.controller");

//Widget
router.get("", widgetController.GetAll);
router.get("/:id", widgetController.GetOne);
router.put("/:id",widgetController.validate, widgetController.Update);
router.delete("/:id", widgetController.Delete);
router.post("", widgetController.validate, widgetController.Create);

//Widget graphs.
router.get("/:id/graphs", GraphController.GetAll);
router.get("/:id/graphs/:graphId", GraphController.GetOne);
router.put("/:id/graphs/:graphId", GraphController.Validate, GraphController.Update);
router.delete("/:id/graphs/:graphId", GraphController.Delete);
router.post("/:id/graphs", GraphController.Validate, GraphController.Create);

//Widget poll.
router.get("/poll/:id", widgetController.Poll);

module.exports = router;
