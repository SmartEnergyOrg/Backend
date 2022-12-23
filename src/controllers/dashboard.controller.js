const { DatabaseInstance } = require("../db/InstanceOfDatabase");
const { SqliteDataContext } = require("../db/sqllite.client");
const DashboardService = require("../services/dashboard.service");

// sqlite service
const database = DatabaseInstance();

// dependeny injection in service
const dashboardService = new DashboardService(database);

// get all dashboards
const GetAll = async (req, res) => {
  try {
    console.log("All dashboards started");

    const result = await dashboardService.GetAll();

    console.log("All dashboards ended");
    res.status(200).json({ message: "Everything is alright", result: result });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Retrieval of dashboard has failed", result: false });
  }
};

// get dashboard by id
const GetOne = async (req, res) => {
  try {
    const DashboardId = req.params.id;

    const result = await dashboardService.GetOne(DashboardId);

    if (!result) {
      throw new Error("Dashboard not found");
    }

    res.status(200).json({ message: "Everything is alright", result: result });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Dashboard search failed",
        result: false,
        errorMessage: error,
      });
  }
};

// update dashboard
const Update = async (req, res) => {
  try {
    const DashboardId = req.params.id;
    const DashboardBody = req.body;
    //const UserId = req.headers.UserId;

    const result = await dashboardService.Update(
      "",
      DashboardId,
      DashboardBody
    );

    res.status(200).json({ message: "Everything is alright", result: result });
  } catch (error) {
    res.status(400).json({ message: "Dashboard update failed", result: false });
  }
};

// create dashboard
const Create = async (req, res) => {
  try {
    const DashboardBody = req.body.UserId; // req.headers.UserId

    const result = await dashboardService.Create(DashboardBody);

    res.status(200).json({ message: "Everything is alright", result: result });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Dashboard creation failed",
        result: false,
        errorMessage: error,
      });
  }
};

// deletes dashboard
// except for the default dashboard
const Delete = async (req, res) => {
  try {
    const DashboardId = req.params.dashboardId;

    const result = await dashboardService.Delete(DashboardId);

    res.status(200).json({ message: "Everything is alright", result: result });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Dashboard deletion failed",
        result: false,
        errorMessage: error,
      });
  }
};

module.exports = {
  GetAll,
  GetOne,
  Create,
  Update,
  Delete,
};
