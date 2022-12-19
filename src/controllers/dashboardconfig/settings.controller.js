const { SqliteDataContext } = require("../../db/sqllite.client");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");

//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");
const SettingsService = new WidgetSettingsService(database);


const GetSettings = async (req, res)=>{
    const WidgetId = req.params.id;

    const settings = await SettingsService.GetSettings(WidgetId);

    res.status(201).json({message: "Settings retrieved", result: settings});
}

const UpdateSettings = async (req, res)=>{
    //Picks widgetId from url params
    const WidgetId = req.params.id;
    //Picks update body.
    const NewSettings = req.body;

    //Updates settingd
    const settings = await SettingsService.UpdateSettings(WidgetId, NewSettings);

    //Returns response
    res.status(201).json({message: "Settings retrieved", result: settings});
}

module.exports = {GetSettings, UpdateSettings};