const { SqliteDataContext } = require("../../db/sqllite.client");
const GraphConfigService = require("../../services/graph.service");

describe("Test graph retrieval", () => {
  var SqlDb;
  var GraphService;
  var Database;

  beforeEach(() => {
    SqlDb = new SqliteDataContext(":memory:");
    GraphService = new GraphConfigService(SqlDb);
    Database = SqlDb.GetDb();
    Database.serialize(() => {
      SqlDb.setupTables();
      Database.run("DELETE FROM Graphs;");
      Database.run("DELETE FROM Widgets;");
      Database.run(
        "INSERT OR IGNORE INTO Widgets(WidgetId, Title, Range, Frequence, ISACTIVE, Position) VALUES(1, 'Widget voor gasverbruik', '24h', 3000, 1, 1);"
      );
      Database.run(
        "INSERT OR IGNORE INTO Widgets(WidgetId, Title, Range, Frequence, ISACTIVE, Position) VALUES(2, 'Widget voor gasverbruik', '24h', 3000, 1, 1);"
      );

      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement, Type) VALUES(24, 1, 'Een grafiek over gasverbruik', 'm3', 'lijn');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement, Type) VALUES(25, 1, 'Een grafiek over gasgeneratie', 'm3', 'lijn');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement, Type) VALUES(26, 2, 'Een grafiek over gasverbruik', 'm3', 'lijn');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Name, Measurement, Type) VALUES(27, 2, 'Een grafiek over gasgeneratie', 'm3', 'lijn');"
      );
    });
  });

  describe("Test retrieval of graphs without widget", () => {
    test("Test one widget retrieval", async () => {
      const result = await GraphService.GetOne(24);

      expect(result).toEqual({
        Color: "#000000",
        GraphId: 24,
        Measurement: "m3",
        Name: "Een grafiek over gasverbruik",
        Type: "lijn",
        WidgetId: 1,
      });
    });

    test("Test all widget retrieval of a widget", async () => {
      const result = await GraphService.GetAll(1);

      expect(result).toEqual([
        {
          Color: "#000000",
          GraphId: 24,
          Measurement: "m3",
          Name: "Een grafiek over gasverbruik",
          Type: "lijn",
          WidgetId: 1,
        },
        {
          Color: "#000000",
          GraphId: 25,
          Measurement: "m3",
          Name: "Een grafiek over gasgeneratie",
          Type: "lijn",
          WidgetId: 1,
        },
      ]);
    });

    test("Test all widget retrieval of a non existent widget", async () => {
      const result = await GraphService.GetAll(99);

      expect(result).toEqual([]);
    });
    test("Test one non-existent widget retrieval", async () => {
      const result = await GraphService.GetOne(999);

      expect(result).toEqual(undefined);
    });
  });

  describe("Test deletion of graph", () => {
    test("Delete graph", async () => {
      const deleteResult = await GraphService.Delete(24);
      //console.log(deleteResult);
      const result = await GraphService.GetOne(24);
      //console.log(result);
      expect(deleteResult).toEqual(true);
      expect(result).toEqual(undefined);
    });

    test("Delete non-existent graph", async () => {
      const deleteResult = await GraphService.Delete(6666);

      expect(deleteResult).toEqual(true);
    });

    test("Replace graph", async () => {
      const replaceBody = {
        Name: "Nieuwe naam",
        Type: "Cirkel",
        Measurement: "m4",
      };
      const deleteResult = await GraphService.Replace(25, 1, replaceBody);

      expect(deleteResult).toEqual(25);
    });
  });

  describe("Test update graph", () => {
    test("Test successful update", async () => {
      const UpdateBody = {
        Name: "Nieuwe graph",
        Type: "Circle",
        Measurement: "m2",
      };
      const Id = 26;
      await GraphService.Update(Id, UpdateBody);

      const check = await GraphService.GetOne(Id);

      expect(check.Name).toEqual("Nieuwe graph");
      expect(check.Type).toEqual("Circle");
      expect(check.Measurement).toEqual("m2");
    });
  });

  describe("Test Creation", () => {
    test("Test successful creation", async () => {
      const CreationBody = {
        Name: "Nieuwe graph",
        Type: "Circle",
        Measurement: "m2",
      };
      const WidgetId = 2;
      const createResult = await GraphService.Create(WidgetId, CreationBody);
      const Check = await GraphService.GetOne(createResult);

      expect(Check.Name).toEqual("Nieuwe graph");
      expect(Check.WidgetId).toEqual(2);
      expect(Check.Type).toEqual("Circle");
      expect(Check.Measurement).toEqual("m2");
    });
  });
  afterEach(async () => {});
  afterAll(async () => {
    await Database.close();
  });
});
