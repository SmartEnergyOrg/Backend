const { DatabaseInstance } = require("../../db/InstanceOfDatabase");
const WidgetGraphService = require("../../services/dashboardconfig/GraphConfig.service");
const { CheckGraphInput } = require("../../services/dashboardconfig/InputValidation.service");

//Database sqlite3;
const database = DatabaseInstance();
const GraphsService = new WidgetGraphService(database);
const CheckInput = async (req, res, next)=>{
    try {
        const graph = req.body;
        CheckGraphInput(graph);
        next();
    } catch (error) {
        res.status(401).json({message: "Input failure", result: error.message});
    }
}

const GetOne = async (req, res)=>{
    try {
        const Id = req.params.graphId;

        if(isNaN(Id)){
            throw new Error("Id moet een nummer zijn");
        }

        const Graph = await GraphsService.GetOneGraph(Id);
    
        res.status(201).json({message: "Graph retrieved", result: Graph, succeeded: true});
    } catch (error) {
        res.status(400).json({message: "Grafiek ophalen is mislukt", result: error, succeeded: false});
    }

}

const GetAll = async (req, res)=>{
    try {
        const WidgetId = req.params.id;
    
        const Graph = await GraphsService.GetAllGraphs(WidgetId);
    
        res.status(201).json({message: "Retrieval all graphs succesful", result: Graph, succeeded: true});        
    } catch (error) {
        res.status(400).json({message: "Alle grafiek zijn niet opgehaald", result: error, succeeded: false});
    }

}


const Create = async (req, res)=>{
    try {
        const widgetId = req.params.id;
        const WidgetBody = req.body;
    
        const Graph = await GraphsService.CreateGraph(widgetId, WidgetBody);
    
        res.status(201).json({message: "Graph succesfully made", result: Graph, succeeded: true});
    } catch (error) {
        res.status(401).json({message: "Aanmaken van een grafiek is niet voltooid", result: error, succeeded: false});
    }

}

const Update = async (req, res)=>{
    try {
        const Id = req.params.graphId;
        const WidgetBody = req.body;
        //Updates graph.
        const Graph = await GraphsService.UpdateGraphsTable(Id, WidgetBody);
    
        res.status(201).json({message: "Graph is updated", result: Graph, succeeded: true});        
    } catch (error) {
        res.status(401).json({message: "Wijzigen van een grafiek is niet voltooid", result: error, succeeded: false});
    }

}

const Delete = async (req, res)=>{
    try {
        const Id = req.params.graphId;

        //Updates graph.
        const Graph = await GraphsService.DeleteOneGraph(Id);
    
        res.status(201).json({message: "Graph is succesfully removed", result: Graph, succeeded: true});        
    } catch (error) {
        res.status(401).json({message: "Deletion of graph did not succeed.", result: error, succeeded: false});
    }

}

module.exports = {GetOne, GetAll, Create, Update, Delete, CheckInput};
