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
//Verwijdert het dashboard.
//Behalve als er maar 1 dashboard overblijft.
const DeleteDashboard = async (req, res)=>{


    const DashboardId = req.params.dashboardId;

    const result = dashboardService.DeleteDashboard(DashboardId);

    res.status(200).json({message: "Everything is alright", result: result});
}


module.exports = {GetAllDashboards, DeleteDashboard};