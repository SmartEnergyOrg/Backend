const router = require("express").Router();

const DashboardController = require("../controllers/dashboard.controller");

router.get("", DashboardController.GetAll);
router.get("/:id", DashboardController.GetOne);
router.post("", DashboardController.Create);
router.put("/:id", DashboardController.Update);
router.delete("/:id", DashboardController.Delete);

module.exports = router;
