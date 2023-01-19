class WeatherService {
  databaseInstance;

  constructor(database) {
    this.databaseInstance = database;
  }

  async Create(weatherConfig) {
    try {
      const query =
        "REPLACE INTO Weathers (WeatherId, Country, Name, Lat, Lon) VALUES(1,?,?,?,?);";
      const params = [
        weatherConfig.country,
        weatherConfig.name,
        weatherConfig.lat,
        weatherConfig.lon,
      ];

      this.databaseInstance.Create(query, params);

      return await this.GetOne();
    } catch (error) {
      throw new Error("Creation has failed. Try later.");
    }
  }

  async Update(weatherConfig) {
    try {
      const query =
        "REPLACE INTO Weathers (WeatherId, Country, Name, Lat, Lon) VALUES(1,?,?,?,?);";
      const params = [
        weatherConfig.country,
        weatherConfig.name,
        weatherConfig.lat,
        weatherConfig.lon,
      ];
      await this.databaseInstance.Update(query, params);

      return await this.GetOne();
    } catch (error) {
      throw new Error("Update has failed. Try once more");
    }
  }

  async GetOne() {
    try {
      const query = "SELECT * FROM Weathers WHERE WeatherId = 1;";
      return this.databaseInstance.GetOne(query);
    } catch (error) {
      throw new Error("There is no weather configuration. Configure a new one");
    }
  }
}

module.exports = WeatherService;
