const {
  MapWidgetToObject,
  MapWidgetsToArray,
} = require("./mapping/widget.mapper");

class WidgetService {
  // use a sqlite client.
  SqlClient;

  constructor(database) {
    this.SqlClient = database;
  }

  //Crud operations widgets
  async Create(CreationObject) {
    const sql = `
      INSERT INTO Widgets(Title, Position, Icon)
      VALUES (?, ?, ?)
    `;

    const params = [
      CreationObject.Title,
      CreationObject.Position,
      CreationObject.Icon,
    ];

    return await this.SqlClient.Create(sql, params);
  }

  async Update(id, updateValues) {
    const updateQuery = `
      UPDATE Widgets
      SET Title = ?,
      Position = ?,
      Icon = ?
      WHERE WidgetId = ?;
    `;

    const params = [
      updateValues.Title,
      updateValues.Position,
      updateValues.Icon,
      id,
    ];
    return await this.SqlClient.Update(updateQuery, params);
  }

  //Based on WidgetId, it will delete a widget.
  async Delete(id) {
    const sql = `DELETE FROM Widgets WHERE WidgetId = ?`;

    return await this.SqlClient.Delete(sql, [id]);
  }

  //It will get all widgets, with the necessery graphs and settings.
  async GetAll(DashboardId) {
    const Query = `
      SELECT json_object(
        'WidgetId', widgets.WidgetId,
        'DashboardId', widgets.DashboardId,
        'Title', widgets.Title,
        'Range', Widgets.Range,
        'Frequence', Widgets.Frequence,
        'IsActive', Widgets.ISACTIVE,
        'Position', Widgets.Position,
        'Graphs', json_group_array(
          json_object(
            'Name', Graphs.Name,
            'Measurement', Graphs.Measurement,
            'Type', Graphs.Type,
            'Color', Graphs.Color
          )
        )
      ) data
      FROM Widgets
      LEFT JOIN Graphs ON Graphs.WidgetId = Widgets.WidgetId
      GROUP BY Widgets.WidgetId
    `;
    const param = [];

    if (DashboardId) {
      Query += ` WHERE DashboardId = ?`;
      param.push(DashboardId);
    }

    const result = await this.SqlClient.GetAll(Query, param);
    console.log(result);
    return MapWidgetsToArray(result);
  }

  async GetOne(id) {
    const Query = `
      SELECT json_object(
        'WidgetId', widgets.WidgetId,
        'Title', widgets.Title,
        'Position', widgets.Position,
        'Icon', widgets.Icon,
        'Graphs', json_group_array(
          json_object(
            'GraphId', Graphs.GraphId,
            'WidgetId', Graphs.WidgetId,
            'Type', Graphs.Type,
            'Query', Graphs.Query,
            'Interval', Graphs.Interval,
            'Color', Graphs.Color
          )
        )
      ) data
      FROM Widgets
      LEFT JOIN Graphs ON Graphs.WidgetId = Widgets.WidgetId
      WHERE Widgets.WidgetId = ?
    `;

    const Params = [id];

    let Widget = await this.SqlClient.GetOne(Query, Params);
    console.log(Widget);
    return MapWidgetToObject(Widget);
  }
}

module.exports = WidgetService;
