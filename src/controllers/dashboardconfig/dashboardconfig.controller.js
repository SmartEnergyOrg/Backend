const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("../../services/dashboardconfig/dashboardConfig.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");

//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");

//Dependeny injectie in service.
const dashboardService = new DashboardConfigService(database);

//Dependency injectie binnen widgetservice.
const widgetService = new WidgetSettingsService(database);

//Haalt dashboards op.
const GetAllDashboards = async (req, res)=>{
    console.log("All dashboards started");

    //Gets all dashboards.
    const result = await dashboardService.GetDashboards();
    console.log("All dashboards ended");
    res.status(200).json({message: "Everything is alright", result: result});
}

//Gets a dashboard based on id
const GetOneDashboard = async (req, res)=>{
    const DashboardId = req.params.dashboardId;

    const result = await dashboardService.GetOneDashboard(DashboardId);

    res.status(200).json({message: "Everything is alright", result: result});
}

//Updates dashboard
const UpdatesDashboard = async (req, res)=>{
    const DashboardId = req.params.dashboardId;
    const DashboardBody = req.body;

    const result = await dashboardService.UpdateDashboard("", DashboardId, DashboardBody);

    res.status(200).json({message: "Everything is alright", result: result});
}

const CreateDashboard = async (req, res)=>{
    const DashboardBody = req.body.UserId; // req.headers.UserId

    const result = await dashboardService.CreateDashboard(DashboardBody);

    res.status(200).json({message: "Everything is alright", result: result});
}

//Deletes dashboard
//Except for the default dashboard.
const DeleteDashboard = async (req, res)=>{


    const DashboardId = req.params.dashboardId;

    const result = await dashboardService.DeleteDashboard(DashboardId);

    res.status(200).json({message: "Everything is alright", result: result});
}


module.exports = {GetAllDashboards, DeleteDashboard, GetOneDashboard, UpdatesDashboard, CreateDashboard};