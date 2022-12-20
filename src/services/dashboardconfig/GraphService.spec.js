const { SqliteDataContext } = require("../../db/sqllite.client");
const DashboardConfigService = require("./dashboardConfig.service");
const GraphConfigService = require("./GraphConfig.service");

describe('Test graph retrieval', ()=>{
    var SqlDb;
    var GraphService;
    var Database;

    beforeEach(()=>{
        SqlDb = new SqliteDataContext(":memory:");
        GraphService = new GraphConfigService(SqlDb);
        Database = SqlDb.GetDb();
        Database.serialize(() => {
              SqlDb.setupTables();
              Database.run("DELETE FROM Graphs;");
              Database.run("DELETE FROM Widgets;");
              Database.run("INSERT OR IGNORE INTO Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(1, 'Widget voor gasverbruik', '24h', 'Blue');");
              Database.run("INSERT OR IGNORE INTO Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(2, 'Widget voor gasverbruik', '24h', 'Blue');");

              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(24, 1, 'Een grafiek over gasverbruik', 'm3');");
              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(25, 1, 'Een grafiek over gasgeneratie', 'm3');");
              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(26, 2, 'Een grafiek over gasverbruik', 'm3');");
              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(27, 2, 'Een grafiek over gasgeneratie', 'm3');");
          })
      })

      describe('Test retrieval of graphs without widget', ()=>{
        test('Test one widget retrieval', async ()=>{
            const result = await GraphService.GetOneGraph(24);

            expect(result).toEqual({
                GraphId: 24, 
                Measurement: "m3", 
                Name: "Een grafiek over gasverbruik",
                Type_Graph: null,
                WidgetId: 1
            });
        })

        test('Test all widget retrieval of a widget', async ()=>{
            const result = await GraphService.GetAllGraphs(1);

            expect(result).toEqual([{
                GraphId: 24, 
                Measurement: "m3", 
                Name: "Een grafiek over gasverbruik",
                Type_Graph: null,
                WidgetId: 1
            },
            {
                GraphId: 25, 
                Measurement: "m3", 
                Name: "Een grafiek over gasgeneratie",
                Type_Graph: null,
                WidgetId: 1
            }]);
        })

        test('Test all widget retrieval of a non existent widget', async ()=>{
            const result = await GraphService.GetAllGraphs(99);

            expect(result).toEqual([]);
        })
        test('Test one non-existent widget retrieval', async ()=>{
            const result = await GraphService.GetOneGraph(999);

            expect(result).toEqual(undefined);
        })
      })

      describe('Test deletion of graph', ()=>{
        test('Delete graph', async ()=>{
            const deleteResult = await GraphService.DeleteOneGraph(24);
            //console.log(deleteResult);
            const result = await GraphService.GetOneGraph(24);
            //console.log(result);
            expect(deleteResult).toEqual(true);
            expect(result).toEqual(undefined);
        })

        test('Delete non-existent graph', async ()=>{
            const deleteResult = await GraphService.DeleteOneGraph(6666);
           
            expect(deleteResult).toEqual(true);

            
        })

        test('Replace graph', async ()=>{
            const replaceBody  = {Name:"Nieuwe naam" , Type_Graph: "Cirkel", Measurement: "m4"}
            const deleteResult = await GraphService.ReplaceGraph(25, 1, replaceBody);
           
            expect(deleteResult).toEqual(25);
        })
      })


      describe('Test update graph', ()=>{
        test('Test successful update', async ()=>{
            const UpdateBody = {Name: "Nieuwe graph", Type_Graph: "Circle", Measurement: "m2"};
            const Id = 26;
            await GraphService.UpdateGraphsTable(Id, UpdateBody);

            const check = await GraphService.GetOneGraph(Id);

            expect(check.Name).toEqual("Nieuwe graph");
            expect(check.Type_Graph).toEqual("Circle");
            expect(check.Measurement).toEqual("m2");
        })
      })

      describe('Test Creation', ()=>{
        test('Test successful creation', async ()=>{
            const CreationBody = {Name: "Nieuwe graph", Type_Graph: "Circle", Measurement: "m2"};
            const WidgetId = 2;
            const createResult = await GraphService.CreateGraph(WidgetId, CreationBody);
            const Check = await GraphService.GetOneGraph(createResult);

            expect(Check.Name).toEqual("Nieuwe graph");
            expect(Check.WidgetId).toEqual(2);
            expect(Check.Type_Graph).toEqual("Circle");
            expect(Check.Measurement).toEqual("m2");

        })
      })
    afterEach(async ()=>{
        
        
    })
    afterAll(async()=>{
        await Database.close();
    })
})