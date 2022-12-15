const { SqliteDataContext } = require("../../db/sqllite.client");

class DashboardConfigService {
  //Uses a sqlite client.
  SqlClient;

  constructor(input) {
    console.log(input);
    this.SqlClient = new SqliteDataContext();
  }

  //Crud operations widgets
  CreateWidget(
    Title,
    DashboardId,
    Time_Period,
    Type_Graph,
    Color_Graph,
    InfluxQuery
  ) {
    const sql = `
        INSERT INTO Widget(Title,DashboardId, Time_Period, Type_Graph, Color_Graph, InfluxQuery)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      Title,
      DashboardId,
      Time_Period,
      Type_Graph,
      Color_Graph,
      InfluxQuery,
    ];
    let result = this.SqlClient.PreparedStatement(sql, params);
    console.log(result);
  }

  UpdateWidget(Id) {
    const sql = `UPDATE `;
  }

  DeleteWidgets(id) {
    const sql = `DELETE FROM Widget WHERE WidgetId = ?`;
    return this.SqlClient.PreparedStatement(sql, id);
  }

  async GetAllWidgets() {
    const sqlQuery = `select * from Widget;`;
    const result = await this.SqlClient.SingleQuery(sqlQuery);
    return result;
  }

  async GetWidget(id) {
    const sql = `select *
                 from Widget
                 WHERE WidgetId = ?`;

    const result = await this.SqlClient.PreparedStatement(sql, id);

    return result;
  }
}

module.exports = DashboardConfigService;
