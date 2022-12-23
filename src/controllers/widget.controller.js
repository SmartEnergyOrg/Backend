const { SqliteDataContext } = require("../db/sqllite.client");
const WidgetService = require("../services/widget.service");
const WidgetGraphService = require("../services/graph.service");
const { CheckWidgetInput, CheckGraphInput } = require("../services/input-validation.service");
const { DatabaseInstance } = require("../db/InstanceOfDatabase");

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
    const ISACTIVE = req.body.Widget.ISACTIVE || 1;

    CheckWidgetInput(WidgetBody, GraphList, ISACTIVE);

    GraphList.forEach(graph => {
      CheckGraphInput(graph);
    });

    next();
  } catch (error) {
    res.status(401).json({ message: "Input failure", result: error.message });
  }
};

// get all widgets
const GetAll = async (req, res) => {
  try {
    const DashboardId = req.body.DashboardId || 0;

    const result = await widgetService.GetAll(DashboardId);

    res.status(200).json({ message: "Widgets are retrieved", result: result, succeeded: true });
  } catch (error) {
    res.status(400).json({ message: "Widgets are not retrieved", result: error, succeeded: false });
  }
};

// get widget by id
const GetOne = async (req, res) => {
  try {
    const WidgetId = req.params.id;

    let Widget = await widgetService.GetOne(WidgetId);

    res.status(201).json({ message: "Search result", result: Widget });
  } catch (error) {
    res.status(401).json({ message: "Search has failed", result: false, error });
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

    res.status(201).json({ message: "Creation widget succeeded", result: WidgetId, succeeded: true });
  } catch (error) {
    res.status(404).json({ message: error, succeeded: false });
  }
};

// delete widget
const Delete = async (req, res) => {
  try {
    const WidgetId = req.params.id;
    const result = await widgetService.Delete(WidgetId);

    res.status(200).json({ message: "Deletion has succeeded result", result: true });
  } catch (error) {
    res.status(401).json({ message: "Deletion has failed", result: false, error });
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

    res.status(201).json({ message: "Update is completed", result: true });
  } catch (error) {
    res.status(401).json({ message: "Update has failed", result: false, error });
  }
};

// poll widget
const Poll = async (req, res) => {
  try {
    // check if id exists
    if (isNaN(req.params.id)) {
      res.status(400).json({ message: "Id is missing, or is not a number." });
      return;
    }

    const widget = await widgetService.GetOne(req.params.id);
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
  validate,
  GetAll,
  GetOne,
  Create,
  Update,
  Delete,
  Poll,
};
