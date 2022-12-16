const { SqliteDataContext } = require("../../db/sqllite.client");

class DashboardConfigService {
  //Uses a sqlite client.
  SqlClient;
  READ = 1;
  EDIT = 2;
  
  constructor(input) {
    console.log(input);
    this.SqlClient = new SqliteDataContext();
  }

  //Crud operations widgets
  async CreateWidget(
    Title, DashboardId, Time_Period, Type_Graph, Color_Graph, InfluxQuery
  ) {
    const sql = `
        INSERT INTO Widgets(Title,DashboardId, Time_Period, Type_Graph, Color_Graph, InfluxQuery)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [ Title,  DashboardId, Time_Period, Type_Graph, Color_Graph, InfluxQuery];
    let result = await this.SqlClient.Create(sql, params);
    return result;
  }

  UpdateWidget(Id, UpdateValues) {
    const sql = `
    UPDATE Widgets 
    SET`;
    return "Hello update"
  }

  async DeleteWidgets(id) {
    const sql = `DELETE FROM Widgets WHERE WidgetId = ?`;
    
    const result = await this.SqlClient.Delete(sql, id);
    
    return result;
  }

  async GetAllWidgets() {
    const sqlQuery = `select * from Widgets;`;
  
    const read = await this.SqlClient.GetAll(sqlQuery);
   
    return read;
  }

  async GetWidget(id) {
    const sql = `select * from Widgets WHERE WidgetId = ?`;
    const Params = [id];
    
    const result = await this.SqlClient.GetOne(sql, Params);

    return result;
  }
}

module.exports = DashboardConfigService;
