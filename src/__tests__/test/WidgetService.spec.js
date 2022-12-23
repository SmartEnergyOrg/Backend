const { SqliteDataContext } = require("../../db/sqllite.client");
const WidgetService = require("../../services/widget.service");

describe("Test widget CRUD operations", () => {
  var SqlDb;
  var widgetService;
  var Database;
  beforeEach(() => {
    SqlDb = new SqliteDataContext(":memory:");
    widgetService = new WidgetService(SqlDb);
    Database = SqlDb.GetDb();
    Database.serialize(() => {
      SqlDb.setupTables();
      Database.run(
        "REPLACE INTO Widgets(WidgetId, DashboardId, Title, Range, Frequence, ISACTIVE, Position) VALUES(1, 0, 'Widget voor gasverbruik', '24h', 3600, 1, 1);"
      );
      Database.run(
        "REPLACE INTO Widgets(WidgetId, DashboardId, Title, Range, Frequence, ISACTIVE, Position) VALUES(2, 0, 'Widget voor gasverbruik', '24h', 3600, 1, 1);"
      );

      Database.run(
        "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type, Color) VALUES(1, 'Voorbeeld', 'kwh', 'lijn', '#000001')"
      );
      Database.run(
        "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type, Color) VALUES(1, 'Voorbeeld', 'kwh', 'lijn', '#000001')"
      );

      Database.run(
        "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type, Color) VALUES(2, 'Voorbeeld', 'kwh', 'lijn', '#000001')"
      );
    });
  });

  describe("Create widgets", () => {
    test("Create widget", async () => {
      const createBody = {
        Title: "Nieuwe widget",
        DashboardId: 0,
        Range: "16h",
        Frequence: 40000,
        ISACTIVE: 1,
        Position: 1,
      };

      const result = await widgetService.Create(createBody);

      expect(result).toEqual(3);
    });
  });

  describe("Update widgets", () => {
    test("Update widget", async () => {
      const updateBody = {
        Title: "Gewijzigde widget",
        DashboardId: 0,
        Frequence: 3000,
        Range: "48h",
        ISACTIVE: 1,
        Position: 1,
      };

      const result = await widgetService.Update(1, updateBody);
      const Check = await widgetService.GetOne(1);

      expect(result).toEqual(true);
      expect(Check.Title).toEqual("Gewijzigde widget");
      expect(Check.Range).toEqual("48h");
      expect(Check.Frequence).toEqual(3000);
    });
  });

  describe("Read widgets", () => {
    test("Read one widget", async () => {
      const widgetId = 1;

      const Check = await widgetService.GetOne(widgetId);

      expect(Check.Title).toEqual("Widget voor gasverbruik");
      expect(Check.Range).toEqual("24h");
      expect(Check.WidgetId).toEqual(1);
      expect(Check.Frequence).toEqual(3600);
      expect(Check.IsActive).toEqual(false);
      expect(Check.Position).toEqual(1);
      expect(Check.Graphs).toEqual([
        {
          Measurement: "m3",
          Name: "Een grafiek over gasgeneratie",
          Type: null,
          Color: "#000001",
          Measurement: "kwh",
          Name: "Voorbeeld",
          Type: "lijn",
        },
        {
          Measurement: "m3",
          Name: "Een grafiek over gasverbruik",
          Type: null,
          Color: "#000001",
          Measurement: "kwh",
          Name: "Voorbeeld",
          Type: "lijn",
        },
      ]);
    });

    test("Read All widget", async () => {
      const Check = await widgetService.GetAll();

      expect(Check.length).toEqual(2);
      expect(Check).toEqual([
        {
          DashboardId: 0,
          Frequence: 3600,
          Graphs: [
            {
              Measurement: "m3",
              Name: "Een grafiek over gasgeneratie",
              Type: null,
              Color: "#000001",
              Measurement: "kwh",
              Name: "Voorbeeld",
              Type: "lijn",
            },
            {
              Measurement: "m3",
              Name: "Een grafiek over gasverbruik",
              Type: null,
              Color: "#000001",
              Measurement: "kwh",
              Name: "Voorbeeld",
              Type: "lijn",
            },
          ],

          IsActive: false,
          Position: 1,

          Range: "24h",
          Title: "Widget voor gasverbruik",
          WidgetId: 1,
        },
        {
          DashboardId: 0,
          Frequence: 3600,
          Graphs: [
            {
              Measurement: "m3",
              Name: "Een grafiek over windgeneratie",
              Type: null,
              Color: "#000001",
              Measurement: "kwh",
              Name: "Voorbeeld",
              Type: "lijn",
            },
          ],

          IsActive: false,
          Position: 1,
          Range: "24h",
          Title: "Widget voor gasverbruik",
          WidgetId: 2,
        },
      ]);
    });
  });

  describe("Delete widgets", () => {
    test("Delete widget", async () => {
      const deleteId = 2;
      const result = await widgetService.Delete(deleteId);

      expect(result).toEqual(true);
    });
  });

  afterAll(async () => {
    await Database.close();
  });
});
