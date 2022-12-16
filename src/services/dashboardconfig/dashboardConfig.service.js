const { SqliteDataContext } = require("../../db/sqllite.client");


//Responsible with the querying of data operations of various tables.
class DashboardConfigService {
  //Uses a sqlite client.
  SqlClient;
  
  constructor(input) {
    this.SqlClient = new SqliteDataContext();
  }

  //Crud operations widgets
  async CreateWidget(CreationObject) {
    const sql = `
        INSERT INTO Widgets(Title,DashboardId, Time_Period, Type_Graph, Color_Graph)
        VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [ 
      CreationObject.Title,  
      CreationObject.DashboardId, 
      CreationObject.Time_Period, 
      CreationObject.Type_Graph, 
      CreationObject.Color_Graph];
    return await this.SqlClient.Create(sql, params);
  }

  async UpdateWidget(Id, UpdateValues) {
    const UpdateQuery = `
    UPDATE Widgets SET Title = ?, DashboardId = ?,
    Time_Period = ?, Type_Graph = ?, Color_Graph = ?,
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

  //Based on WidgetId, it will delete a widget.
  async DeleteWidgets(id) {
    const sql = `DELETE FROM Widgets WHERE WidgetId = ?`;
    
    return await this.SqlClient.Delete(sql, id);
  }

  //It will get all widgets, with the necessery graphs and settings.
  async GetAllWidgets(DashboardId) {
    const sqlQuery = `
    select * from Widgets
    INNER JOIN WidgetSettings ON WidgetSettings.WidgetId = Widgets.WidgetId
    INNER JOIN Graphs ON Graphs.WidgetId = Widgets.WidgetId`;
    const param = [];
    //If dashboardId is present, it will assign the where clause to the current Query;
    if(DashboardId){
      sqlQuery += ` WHERE DashboardId = ?`;
      param.push(DashboardId);
    }
    return await this.SqlClient.GetAll(sqlQuery, param);
  }

  //Retrieves a widget with settings and graphs.
  async GetWidget(id) {
    const sql = `
    select * from Widgets 
    INNER JOIN WidgetSettings ON WidgetSettings.WidgetId = Widgets.WidgetId
    INNER JOIN Graphs ON Graphs.WidgetId = Widgets.WidgetId
    WHERE WidgetId = ?`;

    const Params = [id];
    
    const result = await this.SqlClient.GetOne(sql, Params);

    return result;
  }


  //Settings of widget operations
  async CreateSettings(CreationValues){
    const Params = [CreationValues.Position_Y, CreationValues.Position_X, CreationValues.WidgetId];

    const Sql = `INSERT INTO WidgetSettings(Position_Y, Position_X, WidgetId) VALUES(?,?,?)`;

    return await this.SqlClient.Create(Sql, Params);
  }

  //Updates a widgetSetting entity.
  async UpdateSettings(Id, UpdateValues){
    const Params = [UpdateValues.Position_Y, UpdateValues.Position_X, UpdateValues.ISACTIVE, UpdateValues.WidgetId];

    const Sql = `INSERT INTO WidgetSettings(Position_Y, Position_X, WidgetId, ISACTIVE) VALUES(?, ?, ?, ?)`;

    return await this.SqlClient.Create(Sql, Params);
  }

  //Returns Dashboard 
  async CreateDashboard(UserId){
    const sql = 'INSERT INTO Dashboards(UserId) VALUES(?);'
    return await this.SqlClient.Create(sql, UserId);
  }

  async UpdateDashboard(UserId, DashboardId, UpdateValues){
    const sql = `UPDATE Dashboards SET ShowNavbar = ? WHERE UserId = ? AND DashboardiD = ?;`
    const params = [UpdateValues.ShowNavbar, UserId, DashboardId]
    return await this.SqlClient.Update(sql, params);
  }

  //Only pass a single attribute or null or undefined!
  async GetDashboards(UserId){

    let Query;
    const params = [];
    //If a UserId is not present
    if(!UserId){
      Query = `SELECT * FROM Dashboards;`
    } else{
      //Otherwise it will use a prepared statement.
      Query = `SELECT * FROM Dashboards WHERE UserId = ?;`
      params.push(UserId);
    }
    //Perform query.
    return await this.SqlClient.GetAll(Query, params);
  }

  async GetOneDashboard(DashboardId){
    const sql = `SELECT * FROM Dashboards WHERE DashboardId = ?;`
    const params = [DashboardId];

    return await this.SqlClient.GetOne(sql, params);
  }

  async DeleteDashboard(DashboardId){
    const sql = `DELETE FROM Dashboards WHERE DashboardId = ?;`;
    return await this.SqlClient.Delete(sql, [DashboardId]);
  }

  //Creates a graph entity
  async CreateGraph(WidgetId, Datasource){
    const param = [WidgetId, Datasource.Name, Datasource.Query, Datasource.Type_Graph, Datasource.PowerSource];
    const query = `INSERT INTO Graphs(WidgetId, Name, Query, Type_Graph, PowerSource) VALUES(?,?,?,?,?)`
    
    const result = await this.SqlClient.Create(query, param);

    return result != 0 ? result : null;
  }

  //Updates graph entity
  async UpdateGraphsTable(DatasourceId, Datasource){
    const param = [ Datasource.Name, Datasource.Query, Datasource.Type_Graph, Datasource.PowerSource, DatasourceId];
    const query = `
    UPDATE Graphs 
    SET Name = ?, Query = ?, Type_Graph = ?, PowerSource = ?
    WHERE GraphId = ?;`

    return await this.SqlClient.Update(query, param);
  }

  //Chooses if it is to delete datasources or to change it to a single parameter.
  async DeleteOneGraph(DatasourceId){
    const Query = `DELETE FROM Graphs WHERE GraphId = ?;`;
    return await this.SqlClient.Delete(Query, DatasourceId);
  }

  //Deletes datasources when it does not feature in the current composition
  //Example, when user does not want to use a certain datasource
  async UpdateDeleteGraphs(DataSourcesIdParams){
    try {
      //Puts string array into a string seperated by comma's
      const Values = String(DataSourcesIdParams);
      //Update/Delete query if 
      const query = `DELETE FROM Graphs WHERE GraphId NOT IN (?)`
      const params = Values;

    return await this.SqlClient.Delete(query, params);
    } catch (error) {
      return -1;
    }
    
    
  }
}

module.exports = DashboardConfigService;
