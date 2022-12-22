const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("../../services/dashboardconfig/dashboardConfig.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");
const WidgetService = require("../../services/dashboardconfig/WidgetConfig.service");
const WidgetGraphService = require("../../services/dashboardconfig/GraphConfig.service");

//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");
//InfluxDBService
const influxdbService = require("../../services/influxdb/influxdb.service");
const assert = require("assert");
const { CheckWidgetInput, CheckSettingsInput, CheckGraphInput } = require("../../services/dashboardconfig/InputValidation.service");

//Dependency injectie binnen widgetservice.
const widgetService = new WidgetService(database);
const SettingsService = new WidgetSettingsService(database);
const GraphsService = new WidgetGraphService(database);

const CheckFieldsWidget = async ( req,res, next)=>{
  try {
      const WidgetBody = req.body.Widget;
      const Position = req.body.Position;
      const GraphList = req.body.Graphs;
      //Checks if input is valid.
      CheckWidgetInput(WidgetBody, GraphList);
      GraphList.forEach(graph => {
        CheckGraphInput(graph);
      });
      assert(typeof Position == 'number', 'Must have a postion');
      next();
  } catch (error) {
      res.status(401).json({message: "Input failure", result: error.message});  
  }
}

const CheckUpdateWidget =  async ( req,res, next)=>{
  try {
    const WidgetBody = req.body;
    const Settings = req.body.Settings;
    const GraphList = req.body.Graphs;
    //Checks if input is valid.
    CheckWidgetInput(WidgetBody, GraphList);
    CheckSettingsInput(Settings);
    GraphList.forEach(graph => {
      CheckGraphInput(graph);
    });
    next();
} catch (error) {
    res.status(401).json({message: "Input failure", result: error.message});  
}
}

//Haalt dashboards op.
const GetWidgetsOfDashboard = async (req, res) => {
  try {
    console.log("All widgets started");

    //const DashboardId = req.body.DashboardId;
    const DashboardId = 0;
  
    //Gets all dashboards.
    const result = await widgetService.GetAllWidgets(DashboardId);
    console.log("All widgets ended");
    res.status(200).json({ message: "Widgets are retrieved", result: result , succeeded: true});    
  } catch (error) {
    res.status(400).json({ message: "Widgets are not retrieved", result: error, succeeded: false });   
  }

};

//Creates a widget
/*Schema, at least these attributes must be present.
{
    Widget: {
        Title,
        DashboardId,
        DefaultRange,
        Color_Graph,
        Frequence
    }
    Position,
    Graphs: [
        {
            Name,
            Query,
            Type_Graph,
            Measurement
        }
    ]
}

*/
const CreateWidget = async (req, res) => {
  //Retrieves
  try {
    const WidgetBody = req.body.Widget;
    const Position = req.body.Position;
    const GraphList = req.body.Graphs;
    //Creates id.
    const CreatedID = await widgetService.CreateWidget(WidgetBody);

    //Create settings widget, based on last created widgetId.
    const setting = await SettingsService.CreateSettings({
      Position: Position,
      WidgetId: CreatedID,
    });
    //Creates the needed graphs with the database.
    await GraphList.forEach((graphs) => {
      GraphsService.CreateGraph(CreatedID, graphs);
    });
    res
      .status(201)
      .json({ message: "Creation widget succeeded", result: CreatedID, succeeded: true });
  } catch (error) {
    res.status(404).json({ message: error, succeeded: false });
  }
};

//Gets one widget
const GetOneWidget = async (req, res) => {
  try {
    console.log(req.params);
    const WidgetId = req.params.id;
  
    let Widget = await widgetService.GetWidget(WidgetId);
    
    res.status(201).json({ message: "Search result", result: Widget });
  } catch (error) {
    res.status(401).json({ message: "Search has failed", result: false, error });
  }

};

//Deletes widget
const DeleteWidget = async (req, res) => {
  try {
    const WidgetId = req.params.id;
    const result = await widgetService.DeleteWidgets(WidgetId);
    res.status(200).json({ message: "Deletion has succeeded result", result: true });   
  } catch (error) {
    res.status(401).json({ message: "Deletion has failed", result: false, error });
  }

};

/*Schema, at least these attributes must be present.
{
    WidgetId,
    DashboardId,
    Title,
    DefaultRange,
    Type_Graph,
    Color_Graph,
    Frequence,
    Settings: {
        SettingId,
        Position,
        ISACTIVE,
    },
    Graphs: [
        {
            GraphId
            Name,
            Type_Graph,
            Measurement
        }
    ]
}*/
const UpdateWidget = async (req, res) => {
  try {
    const Id = req.params.id;
    const WidgetBody = req.body;
    const Settings = WidgetBody.Settings;
    const GraphList = WidgetBody.Graphs;
  
    //Updates widget
    await widgetService.UpdateWidget(Id, WidgetBody);
  
    //Updates the settings
    await SettingsService.UpdateSettings(Id, Settings);
  
    //Updates all graphsources in this table.
    //Deletes all graphs not present in the object.
    await GraphsService.UpdateDeleteGraphs(GraphList.map((e) => e.GraphId));
  
    //Replaces graphs.
    await GraphList.forEach(async (e) => {
      //Replaces new values;
      GraphsService.ReplaceGraph(e.GraphId, Id, e);
    });
  
    res.status(201).json({ message: "Update is completed", result: true });
  } catch (error) {
    res.status(401).json({ message: "Update has failed", result: false, error });
  }
};

const Poll = async (req, res) => {
  try {
    //Check if id is number
    if (isNaN(req.params.id)) {
      res.status(400).json({ message: "Id is missing, or is not a number." });
      return;
    }

    const widget = await widgetService.GetWidget(req.params.id);
    if (widget == null) {
      res
        .status(400)
        .json({
          message: `Widget with id: ${req.params.id} could not be found.`,
        });
      return;
    }

    //Handle query overrides
    {
      if (typeof req.query.range == "string" && req.query.range.length > 0) {
        //Custom range is defined
        widget.DefaultRange = req.query.range;
      }
    }

    const influxdbResponse = await influxdbService.getDataByWidget(widget);
    res.status(200).json(influxdbResponse);
  } catch (err) {
    res.status(500).json({ message: "Something unexpected happened!", err });
  }
};

module.exports = {
  CheckFieldsWidget,
  CheckUpdateWidget,
  GetWidgetsOfDashboard,
  CreateWidget,
  DeleteWidget,
  GetOneWidget,
  UpdateWidget,
  Poll,
};
