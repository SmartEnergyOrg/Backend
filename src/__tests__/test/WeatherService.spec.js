const { SqliteDataContext } = require("../../db/sqlite.client");
const DashboardConfigService = require("../../services/dashboard.service");
const WeatherService = require("../../services/weather.service");

const query =
  "REPLACE INTO Weathers (WeatherId, Country, Name, Lat, Lon) VALUES(1,'NL','Amsterdam',11, 11);";
let Input = {
  country: "NL",
  name: "Rotterdam",
  lat: 52,
  lon: 223,
};

describe("Test dashboard config service", () => {
  var SqlDb;
  var weatherService;
  var database;

  beforeEach(() => {
    SqlDb = new SqliteDataContext(":memory:");
    weatherService = new WeatherService(SqlDb);
    database = SqlDb.GetDb();
    database.serialize(async () => {
      SqlDb.setupTables();
      database.run("DELETE FROM Weathers;");
      database.run(query);
    });
  });

  afterEach(async () => {
    await database.close();
  });

  it("Successful update query", async () => {
    weatherService.Update(Input);

    const result = await weatherService.GetOne();

    expect(result.WeatherId).toEqual(1);
    expect(result.Name).toEqual("Rotterdam");
    expect(result.Country).toEqual("NL");
    expect(result.Lat).toEqual(52);
    expect(result.Lon).toEqual(223);
  });

  it("Successful retrieval query", async () => {
    const result = await weatherService.GetOne();

    expect(result.WeatherId).toEqual(1);
    expect(result.Name).toEqual("Amsterdam");
    expect(result.Country).toEqual("NL");
    expect(result.Lat).toEqual(11);
    expect(result.Lon).toEqual(11);
  });
});
