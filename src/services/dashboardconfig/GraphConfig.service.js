const { SqliteDataContext } = require("../../db/sqllite.client");

class GraphConfigService{
    //Uses a sqlite client.
SqlClient;
  
constructor(database) {
    this.SqlClient = database;
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

module.exports = GraphConfigService;