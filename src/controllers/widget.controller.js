const { SqliteDataContext } = require("../db/sqlite.client");
const WidgetService = require("../services/widget.service");
const WidgetGraphService = require("../services/graph.service");
const {
  CheckWidgetInput,
  CheckGraphInput,
} = require("../services/input-validation.service");
const { DatabaseInstance } = require("../db/InstanceOfDatabase");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

// sqlite service
const database = DatabaseInstance();

// influx service
const influxdbService = require("../services/influxdb.service");

// dependency injection
const widgetService = new WidgetService(database);
const GraphsService = new WidgetGraphService(database);

// validate request
const validate = async (req, res, next) => {
  try {
    const WidgetBody = req.body.Widget;
    const GraphList = req.body.Graphs;

    CheckWidgetInput(WidgetBody, GraphList);

    GraphList.forEach((graph) => {
      CheckGraphInput(graph);
    });

    next();
  } catch (error) {
    res.status(400).json({ message: "Input failure", result: error.message });
  }
};

// get all widgets
const GetAll = async (req, res) => {
  try {
    const DashboardId = req.body.DashboardId || 0;

    const result = await widgetService.GetAll(DashboardId);

    res.status(200).json({
      message: "Widgets are retrieved",
      result: result,
      succeeded: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Widgets are not retrieved",
      result: error,
      succeeded: false,
    });
  }
};

// get widget by id
const GetOne = async (req, res) => {
  try {
    const WidgetId = req.params.id;

    let Widget = await widgetService.GetOne(WidgetId);

    res.status(201).json({ message: "Search result", result: Widget });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Search has failed", result: false, error });
  }
};

const Create = async (req, res) => {
  try {
    const Widget = req.body.Widget;
    const Graphs = req.body.Graphs;

    const WidgetId = await widgetService.Create(Widget);

    await Graphs.forEach((graph) => {
      GraphsService.Create(WidgetId, graph);
    });

    res.status(201).json({
      message: "Creation widget succeeded",
      result: WidgetId,
      succeeded: true,
    });
  } catch (error) {
    res.status(400).json({ message: error, succeeded: false });
  }
};

// delete widget
const Delete = async (req, res) => {
  try {
    const WidgetId = req.params.id;
    const result = await widgetService.Delete(WidgetId);

    res
      .status(204)
      .json({ message: "Deletion has succeeded result", result: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Deletion has failed", result: false, error });
  }
};

const Update = async (req, res) => {
  try {
    const WidgetId = req.params.id;
    const WidgetBody = req.body.Widget;
    const GraphList = req.body.Graphs;

    // update widget
    await widgetService.Update(WidgetId, WidgetBody);

    //Updates all graphsources in this table.
    //Deletes all graphs not present in the object.
    await GraphsService.UpdateDelete(GraphList.map((e) => e.GraphId));

    // replaces graphs
    await GraphList.forEach(async (e) => {
      // update with new values
      GraphsService.Replace(e.GraphId, WidgetId, e);
    });

    res.status(204).json({ message: "Update is completed", result: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Update has failed", result: false, error });
  }
};

io.on("connection", (client) => {
  console.log(`user ${client.id.substr(0, 2)} connected`);
  client.interval = [];

  client.on("subscribe", async (data) => {
    try{
      console.log(
        `${client.id.substr(0, 2)} subscribed to graph ${data.graphId}`
      );

      // let oldResult;
      const placeholderResult = await GraphsService.GetOne(data.graphId);

      if (placeholderResult && placeholderResult.Query) {
        //first emit
        let influxResult = await influxdbService.callFluxQuery(
          placeholderResult.Query
        );
        client.emit(`pollWidget(${data.graphId})`, influxResult);

        let oldInfluxResult;

        //emits after interval time
        client.interval.push(
          setInterval(async () => {
            const result = await GraphsService.GetOne(data.graphId);

            influxResult = await influxdbService.callFluxQuery(result.Query);

            // sends only new data by checking if latest _time is equal to already received _time
            if (
              oldInfluxResult !== undefined &&
              influxResult[0]._time !== oldInfluxResult[0]._time
            ) {
              client.emit(`pollWidget(${data.graphId})`, influxResult);
            }

            oldInfluxResult = influxResult;
          }, Math.max(placeholderResult.Interval, 10) * 1000)
        );
      }
    }
    catch(err){
      let errorEventData = {
        eventName: "subscribe",
        clientData: data,
        message: err.message,
        error: err
      }

      console.log(
        `${client.id.substr(0, 2)} subscribe event failed`
      )
      client.emit("error", errorEventData);
    }
  });
  client.on("disconnect", () => {
    console.log(`client ${client.id.substr(0, 2)} disconnected`);
    if (client.interval != null) {
      client.interval.forEach((e) => clearInterval(e));
    }
  });
});
server.listen(9400);

module.exports = {
  validate,
  GetAll,
  GetOne,
  Create,
  Update,
  Delete,
};
