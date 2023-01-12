const { DatabaseInstance } = require("../db/InstanceOfDatabase");
const { SqliteDataContext } = require("../db/sqlite.client");
const WidgetGraphService = require("../services/graph.service");
const { CheckGraphInput } = require("../services/input-validation.service");

// sqlite service
const database = DatabaseInstance();

// dependeny injeciton in service
const GraphsService = new WidgetGraphService(database);

// validate request
const Validate = async (req, res, next) => {
  try {
    const graph = req.body;
    CheckGraphInput(graph);
    next();
  } catch (error) {
    res.status(400).json({ message: "Input failure", result: error.message });
  }
};

// get all graphs
const GetAll = async (req, res) => {
  try {
    const WidgetId = req.params.id;

    const Graph = await GraphsService.GetAll(WidgetId);

    res.status(200).json({
      message: "Successfully retrieved all graphs",
      result: Graph,
      succeeded: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve all graphs",
      result: error,
      succeeded: false,
    });
  }
};

// get graph by id
const GetOne = async (req, res) => {
  try {
    const Id = req.params.graphId;

    if (isNaN(Id)) {
      throw new Error("Id has to be a number");
    }

    const Graph = await GraphsService.GetOne(Id);

    res
      .status(200)
      .json({ message: "Graph retrieved", result: Graph, succeeded: true });
  } catch (error) {
    res.status(404).json({
      message: "This graph was not found",
      result: error,
      succeeded: false,
    });
  }
};

// create graph
const Create = async (req, res) => {
  try {
    const widgetId = req.params.id;
    const WidgetBody = req.body;

    const Graph = await GraphsService.Create(widgetId, WidgetBody);

    res.status(201).json({
      message: "Graph successfully made",
      result: Graph,
      succeeded: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Creation of graph failed",
      result: error,
      succeeded: false,
    });
  }
};

// update graph
const Update = async (req, res) => {
  try {
    const Id = req.params.graphId;
    const WidgetBody = req.body;
    //Updates graph.
    const Graph = await GraphsService.Update(Id, WidgetBody);

    res
      .status(201)
      .json({ message: "Graph is updated", result: Graph, succeeded: true });
  } catch (error) {
    res.status(500).json({
      message: "Could not make changes to graph",
      result: error,
      succeeded: false,
    });
  }
};

// delete graph
const Delete = async (req, res) => {
  try {
    const Id = req.params.graphId;

    //Updates graph.
    const Graph = await GraphsService.Delete(Id);

    res.status(200).json({
      message: "Graph is successfully removed",
      result: Graph,
      succeeded: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Deletion of graph did not succeed.",
      result: error,
      succeeded: false,
    });
  }
};

module.exports = {
  Validate,
  GetAll,
  GetOne,
  Create,
  Update,
  Delete,
};
