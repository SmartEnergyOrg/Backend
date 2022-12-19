const { SqliteDataContext } = require("../../db/sqllite.client");
const { MapJoinResultToWidget, MapJoinResultArray } = require("./Mapping/Graph.Mapper");

class WidgetService{
    //Uses a sqlite client.
    SqlClient;
  
    constructor(database) {
      this.SqlClient = database;
    }

    //Crud operations widgets
    async CreateWidget(CreationObject) {
        const sql = `
        INSERT INTO Widgets(Title, DashboardId, DefaultRange, Type_Graph, Color_Graph)
        VALUES (?, ?, ?, ?, ?)
        `;
        const params = [ 
      CreationObject.Title,  
      CreationObject.DashboardId, 
      CreationObject.DefaultRange, 
      CreationObject.Type_Graph, 
      CreationObject.Color_Graph];
        return await this.SqlClient.Create(sql, params);
    }

    async UpdateWidget(Id, UpdateValues) {
        const UpdateQuery = `
    UPDATE Widgets 
    SET Title = ?, 
    DashboardId = ?,
    DefaultRange = ?, 
    Type_Graph = ?, 
    Color_Graph = ?
    WHERE WidgetId = ?;`;
        const params = [
      UpdateValues.Title, 
      UpdateValues.DashboardId,
      UpdateValues.DefaultRange,
      UpdateValues.Type_Graph,
      UpdateValues.Color_Graph,
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
      const result =  await this.SqlClient.GetAll(sqlQuery, param);

      //Will map results to an object.
      let newResult = MapJoinResultArray(result);

      return newResult;
    }

    //Retrieves a widget with settings and graphs.
    /* return Schema: 
      {
        Widget:All attributes,
        Settings:Object,
        Graphs: [Graph objects]
      }
      */
    async GetWidget(id) {
      //Queries
      const JoinQuery = `
      SELECT * FROM Widgets 
      JOIN Graphs G on Widgets.WidgetId = G.WidgetId
      JOIN WidgetSettings WS on Widgets.WidgetId = WS.WidgetId
      WHERE Widgets.WidgetId = ?`;
      const SingleQuery = 'SELECT * FROM Widgets WHERE WidgetId = ?';

      //Parameters.
      const Params = id;
      
      //Retrieves one result;
      let Widget = await this.SqlClient.GetOne(SingleQuery, Params);
      console.log(Widget);
      //Retrieves join result
      const result = await this.SqlClient.JoinResult(JoinQuery, Params);

      //Maps join result to an object with a graph array and settings object.
      Widget = MapJoinResultToWidget(result, Widget);

      //Returns a widget object.
      return Widget;
    }
}

module.exports = WidgetService;