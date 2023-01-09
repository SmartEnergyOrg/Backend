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
        "INSERT OR IGNORE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(1, 'Widget voor gasverbruik', 1, 'IconURL');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(2, 'Widget voor gasverbruik', 2, 'IconURL');"
      );

      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Type, Query, Interval, Color) VALUES(24, 1, 'line', 'SELECT FROM', 10, '#000001');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Type, Query, Interval, Color) VALUES(25, 1, 'line', 'SELECT FROM', 20, '#000001');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Type, Query, Interval, Color) VALUES(26, 2, 'line', 'SELECT FROM', 30, '#000001');"
      );
      Database.run(
        "INSERT OR IGNORE INTO Graphs(GraphId, WidgetId, Type, Query, Interval, Color) VALUES(27, 2, 'line', 'SELECT FROM', 40, '#000001');"
      );
    });
  });

  describe("Test retrieval of graphs without widget", () => {
    test("Test one widget retrieval", async () => {
      const result = await GraphService.GetOne(24);

      expect(result).toEqual({
        GraphId: 24,
        WidgetId: 1,
        Type: "line",
        Query: "SELECT FROM",
        Interval: 10,
        Color: "#000001",
      });
    });

    test("Test all widget retrieval of a widget", async () => {
      const result = await GraphService.GetAll(1);

      expect(result).toEqual([
        {
          GraphId: 24,
          WidgetId: 1,
          Type: "line",
          Query: "SELECT FROM",
          Interval: 10,
          Color: "#000001",
        },
        {
          GraphId: 25,
          WidgetId: 1,
          Type: "line",
          Query: "SELECT FROM",
          Interval: 20,
          Color: "#000001",
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
        Type: "cirkel",
        Query: "ReplacedQuery",
        Interval: 100,
        Color: "#000000"
      };
      const deleteResult = await GraphService.Replace(25, 1, replaceBody);

      expect(deleteResult).toEqual(25);
    });
  });

  describe("Test update graph", () => {
    test("Test successful update", async () => {
      const UpdateBody = {
        Type: "Circle",
        Query: "Nieuwe Query",
        Interval: 200,
        Color: "NEWCOLOR"
      };
      const Id = 26;
      await GraphService.Update(Id, UpdateBody);

      const check = await GraphService.GetOne(Id);

      expect(check.Type).toEqual("Circle");
      expect(check.Query).toEqual("Nieuwe Query");
      expect(check.Interval).toEqual(200);
      expect(check.Color).toEqual("NEWCOLOR");
    });
  });

  describe("Test Creation", () => {
    test("Test successful creation", async () => {
      const CreationBody = {
        Type: "line",
        Query: "NEW SELECT",
        Interval: 300,
        Color: "#000003"
      };
      const WidgetId = 2;
      const createResult = await GraphService.Create(WidgetId, CreationBody);
      const Check = await GraphService.GetOne(createResult);

      expect(Check.WidgetId).toEqual(2);
      expect(Check.Type).toEqual("line");
      expect(Check.Query).toEqual("NEW SELECT");
      expect(Check.Interval).toEqual(300);
      expect(Check.Color).toEqual("#000003");
    });
  });
  afterEach(async () => {});
  afterAll(async () => {
    await Database.close();
  });
});
