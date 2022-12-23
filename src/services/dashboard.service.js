//Responsible with the querying of data operations of various tables.
class DashboardService {
  //Uses a sqlite client.
  SqlClient;

  constructor(Database) {
    this.SqlClient = Database;
  }

  //Returns Dashboard
  async Create(UserId) {
    const sql = "INSERT INTO Dashboards(UserId) VALUES(?);";
    return await this.SqlClient.Create(sql, UserId);
  }

  async Update(UserId, DashboardId, UpdateValues) {
    //const sql = `UPDATE Dashboards SET ShowNavbar = ? WHERE UserId = ? AND DashboardId = ?;`
    const sql = `
    UPDATE Dashboards
    SET ShowNavbar = ?,
    PeakTariffOn = ?,
    ShowWeather = ?,
    NormalTariff = ?,
    PeakTariff = ?
    WHERE DashboardId = ?;`;
    const params = [
      UpdateValues.ShowNavbar,
      UpdateValues.PeakTariffOn,
      UpdateValues.ShowWeather,
      UpdateValues.NormalTariff,
      UpdateValues.PeakTariff,
      DashboardId,
    ];
    return await this.SqlClient.Update(sql, params);
  }

  //Only pass a single attribute or null or undefined!
  async GetAll(UserId) {
    let Query;
    const params = [];
    //If a UserId is not present
    if (!UserId) {
      Query = `SELECT * FROM Dashboards;`;
    } else {
      //Otherwise it will use a prepared statement.
      Query = `SELECT * FROM Dashboards WHERE UserId = ?;`;
      params.push(UserId);
    }
    //Perform query.
    console.log(Query);
    return await this.SqlClient.GetAll(Query, params);
  }

  async GetOne(DashboardId) {
    const sql = `SELECT * FROM Dashboards WHERE DashboardId = ?;`;
    const params = [DashboardId];

    return await this.SqlClient.GetOne(sql, params);
  }

  //Deletes dashboard, except if the dashboardId is 0!
  async Delete(DashboardId) {
    const sql = `DELETE FROM Dashboards WHERE DashboardId = ? AND DashboardId != 0;`;
    return await this.SqlClient.Delete(sql, [DashboardId]);
  }
}

module.exports = DashboardService;
