const { SqliteDataContext } = require("../db/sqllite.client");

class GraphConfigService{
    //Uses a sqlite client.
SqlClient;

constructor(database) {
    this.SqlClient = database;
}
//Creates a graph entity
async Create(WidgetId, Datasource){
  try {
    const param = [WidgetId, Datasource.Name, Datasource.Type, Datasource.Measurement, Datasource.Color];
    const query = `INSERT INTO Graphs(WidgetId, Name, Type, Measurement, Color) VALUES(?, ?, ?, ?, ?)`

    const result = await this.SqlClient.Create(query, param);

    return result != 0 ? result : null;
  } catch (error) {
    throw new Error("Creation mistake");
  }
  }

  //Updates graph entity
  async Update(DatasourceId, Datasource){
    const param = [ Datasource.Name, Datasource.Type_Graph, Datasource.Measurement, DatasourceId];
    const query = `
    UPDATE Graphs
    SET Name = ?, Type_Graph = ?, Measurement = ?
    WHERE GraphId = ?;`

    return await this.SqlClient.Update(query, param);
  }

  async Replace(GraphId, WidgetId, Datasource){
    const sql = `REPLACE INTO Graphs(GraphId, WidgetId, Name, Type_Graph, Measurement) VALUES(?,?,?,?,?)`;
    const param = [GraphId, WidgetId, Datasource.Name, Datasource.Type_Graph, Datasource.Measurement];
    return await this.SqlClient.Create(sql, param)
  }

  //Chooses if it is to delete datasources or to change it to a single parameter.
  async Delete(DatasourceId){
    const Query = `DELETE FROM Graphs WHERE GraphId = ?;`;
    return await this.SqlClient.Delete(Query, DatasourceId);
  }

  //Deletes datasources when it does not feature in the current composition
  //Example, when user does not want to use a certain datasource
  async UpdateDelete(DataSourcesIdParams){
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

  async GetOne(GraphId){
    const sql = `SELECT * FROM Graphs WHERE GraphId = ?;`

    return await this.SqlClient.GetOne(sql, [GraphId]);
  }

  async GetAll(WidgetId){
    const sql = `SELECT * FROM Graphs WHERE WidgetId = ?;`

    return await this.SqlClient.GetAll(sql, [WidgetId]);
  }
}

module.exports = GraphConfigService;
