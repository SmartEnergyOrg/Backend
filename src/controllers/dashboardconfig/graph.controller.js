const { SqliteDataContext } = require("../../db/sqllite.client");
const WidgetGraphService = require("../../services/dashboardconfig/GraphConfig.service");

//Database sqlite3;
const database = new SqliteDataContext("DashboardConfigDB");
const GraphsService = new WidgetGraphService(database);


const GetOne = async (req, res)=>{
    const Id = req.params.graphId;

    const Graph = await GraphsService.CreateGraph()
}

const GetAll = async (req, res)=>{
    
}


const Create = async (req, res)=>{
    const widgetId = req.params.id;
    const WidgetBody = req.body;

    const Graph = await GraphsService.CreateGraph(widgetId, WidgetBody);

    res.status(201).json({message: "Grafiek aangemaakt", result: Graph});
}

const Update = async (req, res)=>{
    const Id = req.params.graphId;
    const WidgetBody = req.body;
    //Updates graph.
    const Graph = await GraphsService.UpdateGraphsTable(Id, WidgetBody);

    res.status(201).json({message: "Grafiek aangemaakt", result: Graph});
}

const Delete = async (req, res)=>{
    const Id = req.params.graphId;

    //Updates graph.
    const Graph = await GraphsService.DeleteOneGraph(Id);

    res.status(201).json({message: "Grafiek aangemaakt", result: Graph});
}

module.exports = {GetOne, GetAll, Create, Update, Delete};
