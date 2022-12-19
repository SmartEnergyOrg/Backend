const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("../../services/dashboardconfig/dashboardConfig.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");
const WidgetService = require("../../services/dashboardconfig/WidgetConfig.service");
const WidgetGraphService = require("../../services/dashboardconfig/GraphConfig.service");
const { MapToWidget, MapJoinResultToWidget } = require("../../services/dashboardconfig/Mapping/Graph.Mapper");
//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");

//Dependency injectie binnen widgetservice.
const widgetService = new WidgetService(database);
const SettingsService = new WidgetSettingsService(database);
const GraphsService = new WidgetGraphService(database);

//Haalt dashboards op.
const GetWidgetsOfDashboard = async (req, res)=>{
    console.log("All widgets started");

    //const DashboardId = req.body.DashboardId;
    const DashboardId = 0;

    //Gets all dashboards.
    const result = await widgetService.GetAllWidgets(DashboardId);
    console.log("All widgets ended");
    res.status(200).json({message: "Everything is alright", result: result});
}

//Creates a widget
/*Schema, at least these attributes must be present.
{
    Widget: {
        Title,
        DashboardId, 
        Time_Period, 
        Type_Graph, 
        Color_Graph
    }
    Position,
    Graphs: [
        {
            Name,
            Query,
            Type_Graph,
            PowerSource
        }
    ]
}

*/
const CreateWidget = async (req, res)=>{
    //Retrieves
    const WidgetBody = req.body.Widget;
    const Position = req.body.Position;
    const GraphList = req.body.Graphs;
    //Creates id.
    const CreatedID = await widgetService.CreateWidget(WidgetBody);

    //Create settings widget, based on last created widgetId.
    const setting = await SettingsService.CreateSettings({Position: Position, WidgetId: CreatedID})
    //Creates the needed graphs with the database.
    await GraphList.forEach(graphs => {
       GraphsService.CreateGraph(CreatedID, graphs);
    });


    res.status(201).json({message: "Creation widget succeeded", result: CreatedID})
}

//Gets one widget
const GetOneWidget = async (req, res)=>{
    console.log(req.params);
    const WidgetId = req.params.id;

    let Widget = await widgetService.GetWidget(WidgetId);
    
    console.log("Read is over")
    res.status(201).json({message: "Search result", result: Widget});
}

//Deletes widget
const DeleteWidget = async (req, res)=>{
    const WidgetId = req.params.id;
    const result = await widgetService.DeleteWidgets(WidgetId);    
    res.status(201).json({message: "Search result", result: result});
}

/*Schema, at least these attributes must be present.
{
    
    WidgetId,
    DashboardId, 
    Title,
    Time_Period, 
    Type_Graph, 
    Color_Graph
    Settings:{
        SettingId,
        Position,
        ISACTIVE,
    },
    Graphs: [
        {
            GraphId
            Name,
            Query,
            Type_Graph,
            PowerSource
        }
    ]
}*/
const UpdateWidget = async (req, res)=>{
    const Id = req.params.id;
    const WidgetBody = req.body.Widget;
    const Settings = req.body.Settings;
    const GraphList = req.body.Graphs;

    //Updates widget
    await widgetService.UpdateWidget(Id, WidgetBody);

    //Updates the settings
    await SettingsService.UpdateSettings(Id, Settings);

    //Updates all graphsources in this table.
    await GraphList.forEach(e =>{
        GraphsService.UpdateGraphsTable(e.GraphId, e);
    })

    res.status(204).json({message: "Update is completed", result: true});
}
module.exports = { GetWidgetsOfDashboard, CreateWidget, DeleteWidget, GetOneWidget, UpdateWidget }