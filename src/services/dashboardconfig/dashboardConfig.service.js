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
  async CreateWidget(CreationObject) {
    const sql = `
        INSERT INTO Widgets(Title,DashboardId, Time_Period, Type_Graph, Color_Graph, InfluxQuery)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [ 
      CreationObject.Title,  
      CreationObject.DashboardId, 
      CreationObject.Time_Period, 
      CreationObject.Type_Graph, 
      CreationObject.Color_Graph, 
      CreationObject.InfluxQuery];
    let result = await this.SqlClient.Create(sql, params);
    return result;
  }

  async UpdateWidget(Id, UpdateValues) {
    const UpdateQuery = `
    UPDATE Widgets 
    SET Title = ?,
    DashboardId = ?,
    Time_Period = ?,
    Type_Graph = ?,
    Color_Graph = ?,
    InfluxQuery = ?
    WHERE WidgetId = ?`;
    const params = [
      UpdateValues.Title, 
      UpdateValues.DashboardId,
      UpdateValues.Time_Period,
      UpdateValues.Type_Graph,
      UpdateValues.Color_Graph,
      UpdateValues.InfluxQuery,
      Id
    ]
    return await this.SqlClient.Update(UpdateQuery, params);
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

  async CreateSettings(CreationValues){
    const Params = [CreationValues.Position_Y, CreationValues.Position_X, CreationValues.WidgetId];

    const Sql = `INSERT INTO WidgetSettings(Position_Y, Position_X, WidgetId) VALUES(?,?,?)`;

    const createCommand = await this.SqlClient.Create(sql, Params);

    return createCommand;
  }

  async UpdateSettings(Id, UpdateValues){
    const Params = [UpdateValues.Position_Y, UpdateValues.Position_X, UpdateValues.ISACTIVE, UpdateValues.WidgetId];

    const Sql = `INSERT INTO WidgetSettings(Position_Y, Position_X, WidgetId) VALUES(?,?,?)`;

    const createCommand = await this.SqlClient.Create(sql, Params);

    return createCommand;
  }


}

module.exports = DashboardConfigService;
