const sqlLite = require("sqlite3").verbose();

class SqliteDataContext {
  DataSQL;

  constructor() {
    this.DataSQL = new sqlLite.Database("DashboardConfigDB", (err) => {
      if (err) {
        console.log("Database is not connected");
      } else {
        console.log("Database is connected");
        //Will setup tables
        this.setupTables();
      }
    });
  }

  async setupTables() {
    const WidgetSettingTable = `CREATE TABLE IF NOT EXISTS WidgetSettings(
        SettingId INTEGER PRIMARY KEY,
        Position_Y INTEGER DEFAULT 0,
        Position_X INTEGER DEFAULT 0,
        ISACTIVE INTEGER CHECK ( 0 OR 1 ) DEFAULT 1,
        WidgetId INTEGER,
        FOREIGN KEY (WidgetId) REFERENCES Widget)`;
    const WidgetTable = `CREATE TABLE IF NOT EXISTS Widget (
     WidgetId INTEGER PRIMARY KEY,
     DashboardId INTEGER,
     Title TEXT NOT NULL ,
     Time_Period INTEGER NOT NULL,
     Type_Graph INTEGER NOT NULL,
     Color_Graph TEXT DEFAULT 'Black',
     InfluxQuery TEXT
    /*FOREIGN KEY (DashboardId) REFERENCES Dashboard*/
     )`;
    const DashBoardTable = `
  CREATE TABLE IF NOT EXISTS Dashboard(
      DashboardId INTEGER PRIMARY KEY,
      UserId INTEGER,
      ShowNavbar INTEGER CHECK(0 OR 1) DEFAULT 1
      /*FOREIGN KEY (UserId) REFERENCES Users*/
  )`;
    const UserTable = `
  CREATE TABLE IF NOT EXISTS Users(
      UserId INTEGER PRIMARY KEY,
      FirstName TEXT NOT NULL,
      LastName TEXT NOT NULL,
      Street TEXT NOT NULL,
      HomeNr TEXT NOT NULL,
      PostalCode TEXT NOT NULL,
      Country TEXT NOT NULL,
      Emailadres TEXT NOT NULL,
      Password TEXT NOT NULL,
      Role TEXT DEFAULT 'REGULAR'
  )`;
    const HistoricDataTable = `
    CREATE TABLE IF NOT EXISTS HistoricCosts(
        HistoryId INTEGER PRIMARY KEY,
        Month INTEGER NOT NULL,
        Year INTEGER NOT NULL,
        Costs INTEGER NOT NULL,
        EnergySource TEXT NOT NULL
    )`;

    try {
      this.DataSQL.serialize(async () => {
        this.DataSQL.run(UserTable);
        this.DataSQL.run(DashBoardTable);
        this.DataSQL.run(WidgetTable);
        this.DataSQL.run(HistoricDataTable);
        this.DataSQL.run(WidgetSettingTable);
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  //Use ? when you use a parameter within the query
  //Example 'SELECT Widget WHERE WidgetId = ?' , [1] OR 1
  //Alternative notation: 'SELECT Widget WHERE WidgetId = $Id?' { $Id: 1 }
  async PreparedStatement(Query, InputData) {
    try {
      return this.DataSQL.run(Query, InputData, (err) => {
        return true;
      });
    } catch (e) {
      return false;
    }
  }

  //Use this method if you want to insert
  async SingleQuery(Query) {
    return this.DataSQL.each(Query, [], (err, rows) => {
      return rows;
    });
  }

  async GetSingleResult(Query, Params) {
    try {
      if (typeof Query != "string") {
        throw new Error("Query moet een string zijn.");
      }
      const row = await this.DataSQL.get(Query, Params);
      return row ? row : null;
    } catch (e) {
      throw e;
    }
  }

  async GetAllResults(Query, Params) {
    console.log(Query);
    try {
      return this.DataSQL.each(Query, Params, (err, row) => {
        if (err) {
          console.log("Niets gevonden");
        }

        const rows = row;
        console.log(rows);
        return rows ? rows : null;
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = { SqliteDataContext };
