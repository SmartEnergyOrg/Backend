class GraphConfigService {
  //Uses a sqlite client.
  SqlClient;

  constructor(database) {
    this.SqlClient = database;
  }
  //Creates a graph entity
  async Create(widgetId, datasource) {
    try {
      const param = [
        widgetId,
        datasource.Type,
        datasource.Query,
        datasource.Interval,
        datasource.Color,
      ];
      const query = `INSERT INTO Graphs(WidgetId, Type, Query, Interval, Color) VALUES(?, ?, ?, ?, ?)`;

      const result = await this.SqlClient.Create(query, param);

      return result != 0 ? result : null;
    } catch (error) {
      throw new Error("Creation mistake");
    }
  }

  //Updates graph entity
  async Update(datasourceId, datasource) {
    const param = [
      datasource.Type,
      datasource.Query,
      datasource.Interval,
      datasource.Color,
      datasourceId,
    ];
    const query = `
    UPDATE Graphs
    SET Type = ?, Query = ?, Interval = ?, Color = ?
    WHERE GraphId = ?;`;

    return await this.SqlClient.Update(query, param);
  }

  async Replace(graphId, widgetId, datasource) {
    const sql = `REPLACE INTO Graphs(GraphId, WidgetId, Type, Query, Interval, Color) VALUES(?,?,?,?,?,?)`;
    const param = [
      graphId,
      widgetId,
      datasource.Type,
      datasource.Query,
      datasource.Interval,
      datasource.Color,
    ];
    return await this.SqlClient.Create(sql, param);
  }

  //Chooses if it is to delete datasources or to change it to a single parameter.
  async Delete(datasourceId) {
    const Query = `DELETE FROM Graphs WHERE GraphId = ?;`;
    return await this.SqlClient.Delete(Query, datasourceId);
  }

  //Deletes datasources when it does not feature in the current composition
  //Example, when user does not want to use a certain datasource
  async UpdateDelete(dataSourcesIdParams) {
    try {
      //Puts string array into a string seperated by comma's
      const Values = String(dataSourcesIdParams);
      //Update/Delete query if
      const query = `DELETE FROM Graphs WHERE GraphId NOT IN (?)`;
      const params = Values;

      return await this.SqlClient.Delete(query, params);
    } catch (error) {
      return -1;
    }
  }

  async GetOne(graphId) {
    const sql = `SELECT * FROM Graphs WHERE GraphId = ?;`;

    return await this.SqlClient.GetOne(sql, [graphId]);
  }

  async GetAll(widgetId) {
    const sql = `SELECT * FROM Graphs WHERE WidgetId = ?;`;

    return await this.SqlClient.GetAll(sql, [widgetId]);
  }
}

module.exports = GraphConfigService;
