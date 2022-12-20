const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("../../services/dashboardconfig/dashboardConfig.service");
const WidgetSettingsService = require("../../services/dashboardconfig/SettingsConfig.service");
const WidgetService = require("../../services/dashboardconfig/WidgetConfig.service");
const WidgetGraphService = require("../../services/dashboardconfig/GraphConfig.service");
const {
  MapToWidget,
  MapJoinResultToWidget,
} = require("../../services/dashboardconfig/Mapping/Graph.Mapper");
//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");
//InfluxDBService
const influxdbService = require("../../services/influxdb/influxdb.service");

//Dependency injectie binnen widgetservice.
const widgetService = new WidgetService(database);
const SettingsService = new WidgetSettingsService(database);
const GraphsService = new WidgetGraphService(database);

//Haalt dashboards op.
const GetWidgetsOfDashboard = async (req, res) => {
  console.log("All widgets started");

  //const DashboardId = req.body.DashboardId;
  const DashboardId = 0;

  //Gets all dashboards.
  const result = await widgetService.GetAllWidgets(DashboardId);
  console.log("All widgets ended");
  res.status(200).json({ message: "Everything is alright", result: result });
};

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
      .json({ message: "Creation widget succeeded", result: CreatedID });
  } catch (error) {
    res.status(404).json({ message: error, result: false });
  }
};

//Gets one widget
const GetOneWidget = async (req, res) => {
  console.log(req.params);
  const WidgetId = req.params.id;

  let Widget = await widgetService.GetWidget(WidgetId);

  console.log("Read is over");
  res.status(201).json({ message: "Search result", result: Widget });
};

//Deletes widget
const DeleteWidget = async (req, res) => {
  const WidgetId = req.params.id;
  const result = await widgetService.DeleteWidgets(WidgetId);
  res.status(201).json({ message: "Search result", result: result });
};

/*Schema, at least these attributes must be present.
{
    WidgetId,
    DashboardId,
    Title,
    DefaultRange,
    Type_Graph,
    Color_Graph
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
};

const Poll = async (req, res) => {
  // The following objects are MOCKS, they can be deleted after the Sqlite logic is finished for this endpoint.
  const id1 = {
    id: 1,
    measurement: "solar",
    defaultRange: "24h",
  };

  const id2 = {
    id: 2,
    measurement: "wind",
    defaultRange: "3d",
  };

  if (req.params.id == 1) {
    const result = await influxdbService.getDataByWidget(id1);

    res.status(200).json(result);
  } else if (req.params.id == 2) {
    const result = await influxdbService.getDataByWidget(id2);

    res.status(200).json(result);
  } else if (req.params.id == 3) {
    res.status(200).send("hello world");
  } else {
    res.status(400).end();
  }
};
module.exports = {
  GetWidgetsOfDashboard,
  CreateWidget,
  DeleteWidget,
  GetOneWidget,
  UpdateWidget,
  Poll,
};
