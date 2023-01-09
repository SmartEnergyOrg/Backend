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
        "REPLACE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(1, 'Widget voor gasverbruik', 1, 'IconURL');"
      );
      Database.run(
        "REPLACE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(2, 'Widget voor gasverbruik', 2, 'IconURL');"
      );

      Database.run(
        "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(1, 'bar', 'SELECT FROM', 5, '#000001')"
      );
      Database.run(
        "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(1, 'line', 'SELECT FROM', 10, '#000001')"
      );

      Database.run(
        "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(2, 'bar', 'SELECT FROM', 30, '#000001')"
      );
    });
  });

  describe("Create widgets", () => {
    test("Create widget", async () => {
      const createBody = {
        Title: "Nieuwe widget",
        Position: 0,
        Icon: "Icon"
      };

      const result = await widgetService.Create(createBody);

      expect(result).toEqual(3);
    });
  });

  describe("Update widgets", () => {
    test("Update widget", async () => {
      const updateBody = {
        Title: "Gewijzigde widget",
        Position: 10,
        Icon: "Gewijzigde icon"
      };

      const result = await widgetService.Update(1, updateBody);
      const Check = await widgetService.GetOne(1);

      expect(result).toEqual(true);
      expect(Check.Title).toEqual("Gewijzigde widget");
      expect(Check.Position).toEqual(10);
      expect(Check.Icon).toEqual("Gewijzigde icon");
    });
  });

  describe("Read widgets", () => {
    test("Read one widget", async () => {
      const widgetId = 1;

      const Check = await widgetService.GetOne(widgetId);

      expect(Check.WidgetId).toEqual(1);
      expect(Check.Title).toEqual("Widget voor gasverbruik");
      expect(Check.Position).toEqual(1);
      expect(Check.Icon).toEqual("IconURL");
      expect(Check.Graphs).toEqual([
        {
          GraphId: 1,
          WidgetId: 1,
          Interval: 5,
          Type: "bar",
          Query: "SELECT FROM",
          Color: "#000001",
        },
        {
          GraphId: 2,
          WidgetId: 1,
          Interval: 10,
          Type: "line",
          Query: "SELECT FROM",
          Color: "#000001",
        },
      ]);
    });

    test("Read All widget", async () => {
      const Check = await widgetService.GetAll();

      expect(Check.length).toEqual(2);
      expect(Check).toEqual([
        {
          WidgetId: 1,
          Title: "Widget voor gasverbruik",
          Position: 1,
          Icon: "IconURL",
          Graphs: [
            {
              GraphId: 1,
              WidgetId: 1,
              Interval: 5,
              Type: "bar",
              Query: "SELECT FROM",
              Color: "#000001",
            },
            {
              GraphId: 2,
              WidgetId: 1,
              Interval: 10,
              Type: "line",
              Query: "SELECT FROM",
              Color: "#000001",
            },
          ],
        },
        {
          WidgetId: 2,
          Title: "Widget voor gasverbruik",
          Position: 2,
          Icon: "IconURL",
          Graphs: [
            {
              GraphId: 3,
              WidgetId: 2,
              Interval: 30,
              Type: "bar",
              Query: "SELECT FROM",
              Color: "#000001",
            },
          ],
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
