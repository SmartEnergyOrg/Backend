const assert = require("assert");
const { SqliteDataContext } = require("../../db/sqllite.client");
const { CheckSettingsInput } = require("../../services/dashboardconfig/InputValidation.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");

//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");
const SettingsService = new WidgetSettingsService(database);
const InputSettings = async (req, res, next)=>{
    try {
        const Settings = req.body;
        CheckSettingsInput(Settings);
        next();
    } catch (error) {
        res.status(401).json({message: "Input failure", result: error.message});  
    }
}

const GetSettings = async (req, res)=>{
    try {
        const WidgetId = req.params.id;

        const settings = await SettingsService.GetSettings(WidgetId);
    
        res.status(201).json({message: "Settings retrieved", result: settings, succeeded: true});
    } catch (error) {
        res.status(401).json({message: "Settings retrieval has failed", result: error, succeeded: false});  
    }

}

const UpdateSettings = async (req, res)=>{
    try {
    //Picks widgetId from url params
    const WidgetId = req.params.id;
    //Picks update body.
    const NewSettings = req.body;

    //Updates settingd
    const settings = await SettingsService.UpdateSettings(WidgetId, NewSettings);

    //Returns response
    res.status(201).json({message: "Settings retrieved", result: settings, succeeded: true});        
    } catch (error) {
        res.status(401).json({message: "Settings update has failed", result: error, succeeded: false});    
    }

}

module.exports = {GetSettings, UpdateSettings, InputSettings};