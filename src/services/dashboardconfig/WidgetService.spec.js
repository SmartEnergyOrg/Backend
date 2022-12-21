const { SqliteDataContext } = require("../../db/sqllite.client");
const WidgetService = require("./WidgetConfig.service");


describe('Test widget CRUD operations', ()=>{
    var SqlDb;
    var widgetService;
    var Database;
    beforeEach(()=>{
        SqlDb = new SqliteDataContext(":memory:");
        widgetService = new WidgetService(SqlDb);
        Database = SqlDb.GetDb();
        Database.serialize(() => {
              SqlDb.setupTables();
              Database.run("REPLACE INTO Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(1, 'Widget voor gasverbruik', '24h', 'Blue');");
              Database.run("REPLACE INTO Widgets(WidgetId, Title, DefaultRange, Color_Graph) VALUES(2, 'Widget voor kolenverbruik', '48h', 'Red');");
              Database.run('REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(1, 1, 1, 1)');
              Database.run('REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(2, 2, 1, 2)');

              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(1, 1, 'Een grafiek over gasgeneratie', 'm3');");
              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(2, 1, 'Een grafiek over gasverbruik', 'm3');");

              Database.run("INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement) VALUES(3, 2, 'Een grafiek over windgeneratie', 'm3');");

          })
      })

      describe('Create widgets', ()=>{
        test('Create widget', async ()=>{
            const createBody  = {Title: "Nieuwe widget", DashboardId: 0, DefaultRange: "16h", Color_Graph: "Red"};

            const result = await widgetService.CreateWidget(createBody);
            

            expect(result).toEqual(3);
        })
      })

      describe('Update widgets', ()=>{
        test('Update widget', async ()=>{
            const updateBody  = {Title: "Gewijzigde widget", DashboardId: 0, DefaultRange: "48h", Color_Graph: "Green"};

            const result = await widgetService.UpdateWidget(1, updateBody);
            const Check = await widgetService.GetWidget(1);

            expect(result).toEqual(true);
            expect(Check.Title).toEqual("Gewijzigde widget");
            expect(Check.DefaultRange).toEqual("48h");
            expect(Check.Color_Graph).toEqual("Green");
        })
      })

      describe('Read widgets', ()=>{
        test('Read one widget', async ()=>{
            const widgetId  = 1;

            const Check = await widgetService.GetWidget(widgetId);

            expect(Check.Title).toEqual("Widget voor gasverbruik");
            expect(Check.Color_Graph).toEqual("Blue");
            expect(Check.DefaultRange).toEqual("24h");
            expect(Check.WidgetId).toEqual(1);
            expect(Check.Settings).toEqual({ ISACTIVE: 1,Position: 1, SettingId: 1});
            expect(Check.Graphs).toEqual([
                {"GraphId": 1, "Measurement": "m3", "Name": "Een grafiek over gasgeneratie", "Query": undefined, "Type_Graph": null}, 
                {"GraphId": 2, "Measurement": "m3", "Name": "Een grafiek over gasverbruik", "Query": undefined, "Type_Graph": null}
            ]);
        })


        test('Read All widget', async ()=>{

            const Check = await widgetService.GetAllWidgets();

            expect(Check.length).toEqual(2);
            expect(Check).toEqual([
                {
                     "Color_Graph": "Blue",
                     "DashboardId": 0,
                     "DefaultRange": "24h",
                     "Graphs": [
                       {
                         "GraphId": 1,
                         "Measurement": "m3",
                         "Name": "Een grafiek over gasgeneratie",
                         "Type_Graph": null,
                       },
                       {
                         "GraphId": 2,
                         "Measurement": "m3",
                         "Name": "Een grafiek over gasverbruik",
                         "Type_Graph": null,
                       },
                     ],
                     "Settings": {
                       
                       "ISACTIVE": 1,
                       "Position": 1,
                       "SettingId": 1,
                     },
                     "Title": "Widget voor gasverbruik",
                     "WidgetId": 1,
                   }
                   ,
                    {
                         "Color_Graph": "Red",
                         "DashboardId": 0,
                         "DefaultRange": "48h",
                         "Graphs":  [
                            {
                              "GraphId": 3, 
                              "Measurement": "m3",
                              "Name": "Een grafiek over windgeneratie",
                              "Type_Graph": null,
                           },
                         ],
                         "Settings":  {
                           
                           "ISACTIVE": 1,
                           "Position": 2,
                           "SettingId": 2,
                         },
                         "Title": "Widget voor kolenverbruik",
                         "WidgetId": 2,
                       }]);
        })
      })

      describe('Delete widgets', ()=>{
        test('Delete widget', async ()=>{
            const deleteId  = 2;
            const result = await widgetService.DeleteWidgets(deleteId);

            expect(result).toEqual(true);
        })
      })

      afterAll(async()=>{
        await Database.close();
    })


})