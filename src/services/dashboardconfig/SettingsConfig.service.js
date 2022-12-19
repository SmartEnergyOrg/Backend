const { SqliteDataContext } = require("../../db/sqllite.client");

class WidgetSettingsService{
    //Uses a sqlite client.
SqlClient;
  
constructor(database) {
    this.SqlClient = database;
}
    //Settings of widget operations
  async CreateSettings(CreationValues){
    const Params = [CreationValues.Position, CreationValues.WidgetId];

    const Sql = `INSERT INTO WidgetSettings(Position, WidgetId) VALUES(?,?)`;

    return await this.SqlClient.Create(Sql, Params);
  }

  //Updates a widgetSetting entity.
  async UpdateSettings(Id, UpdateValues){
    const Params = [UpdateValues.Position, UpdateValues.ISACTIVE, Id];

    const Sql =`
    UPDATE WidgetSettings 
    SET Position = ?, ISACTIVE = ?
    WHERE WidgetId = ?;`;
    
    return await this.SqlClient.Update(Sql, Params);
  }

  //Retrieves setting based on widgetId
  async GetSettings(Id){
    const sql = `SELECT * FROM WidgetSettings WHERE WidgetId = ?;`
    return await this.SqlClient.GetOne(sql, [Id]);
  }
}

module.exports = WidgetSettingsService;