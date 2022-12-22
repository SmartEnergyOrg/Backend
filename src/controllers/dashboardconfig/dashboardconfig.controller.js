const { InstanceOfDB } = require("../../db/databaseInstance");
const DashboardConfigService = require("../../services/dashboardconfig/dashboardConfig.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");

//Database sqlite3;
const database = InstanceOfDB();

//Dependeny injectie in service.
const dashboardService = new DashboardConfigService(database);

//Dependency injectie binnen widgetservice.
const widgetService = new WidgetSettingsService(database);

//Haalt dashboards op.
const GetAllDashboards = async (req, res)=>{
    try {
        console.log("All dashboards started");

        //Gets all dashboards.
        const result = await dashboardService.GetDashboards();
        console.log("All dashboards ended");
        res.status(200).json({message: "Everything is alright", result: result});        
    } catch (error) {
        res.status(400).json({message: "Retrieval of dashboard has failed", result: false });
    }

}

//Gets a dashboard based on id
const GetOneDashboard = async (req, res)=>{
    try {
        const DashboardId = req.params.id;

        const result = await dashboardService.GetOneDashboard(DashboardId);

        if(!result){
            throw new Error('Dashboard not found');
        }

        res.status(200).json({message: "Everything is alright", result: result});
    } catch (error) {
        res.status(400).json({message: "Dashboard search failed", result: false, errorMessage: error });
    }
    
}

//Updates dashboard
const UpdatesDashboard = async (req, res)=>{
    try {
        const DashboardId = req.params.id;
        const DashboardBody = req.body;
        //const UserId = req.headers.UserId;

        const result = await dashboardService.UpdateDashboard("", DashboardId, DashboardBody);

        res.status(200).json({message: "Everything is alright", result: result});
    } catch (error) {
        res.status(400).json({message: "Dashboard update failed", result: false });
    }
    
}

const CreateDashboard = async (req, res)=>{
    try {
        const DashboardBody = req.body.UserId; // req.headers.UserId

        const result = await dashboardService.CreateDashboard(DashboardBody);
    
        res.status(200).json({message: "Everything is alright", result: result});        
    } catch (error) {
        res.status(400).json({message: "Dashboard creation failed", result: false, errorMessage: error });
    }
}

//Deletes dashboard
//Except for the default dashboard.
const DeleteDashboard = async (req, res)=>{
    try {
        const DashboardId = req.params.dashboardId;

        const result = await dashboardService.DeleteDashboard(DashboardId);
    
        res.status(200).json({message: "Everything is alright", result: result});        
    } catch (error) {
        res.status(400).json({message: "Dashboard deletion failed", result: false, errorMessage: error });
    }

    
}


module.exports = {GetAllDashboards, DeleteDashboard, GetOneDashboard, UpdatesDashboard, CreateDashboard};