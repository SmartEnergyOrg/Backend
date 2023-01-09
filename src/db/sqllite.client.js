const sqlLite = require("sqlite3").verbose();

class SqliteDataContext {
  DataSQL;

  //Builds up the tables if it does not exist
  //Connects app to a Sqlite database.
  constructor(DatabaseName) {
    console.log(`Database is connected to ${DatabaseName}. Welcome`);
    this.DataSQL = new sqlLite.Database(DatabaseName, (err) => {
      if (err) {
        console.log("Database is not connected");
      } else {
        console.log("Setup SQLLite database");
        this.setupTables();
      }
    });
  }

  //Creates all the tables.
  async setupTables() {
    const FK_On = "PRAGMA foreign_keys = ON";

    const WidgetTable = `
      CREATE TABLE IF NOT EXISTS Widgets (
        WidgetId INTEGER PRIMARY KEY,
        Title TEXT NOT NULL,
        Position INTEGER DEFAULT 0 NOT NULL,
        Icon TEXT NOT NULL
      )
    `;

    const DashBoardTable = `
      CREATE TABLE IF NOT EXISTS Dashboards (
        DashboardId INTEGER PRIMARY KEY,
        UserId INTEGER NOT NULL,
        ShowNavbar INTEGER CHECK(0 OR 1) DEFAULT 1,
        ShowWeather INTEGER CHECK(0 OR 1) DEFAULT 0,
        PeakTariffOn INTEGER CHECK(0 OR 1) DEFAULT 0,
        PeakTariff INTEGER DEFAULT 0,
        NormalTariff INTEGER DEFAULT 0
      )
    `;

    const UserTable = `
      CREATE TABLE IF NOT EXISTS Users (
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
      )
    `;

    const GraphTable = `
      CREATE TABLE IF NOT EXISTS Graphs (
        GraphId INTEGER PRIMARY KEY,
        WidgetId INTEGER NOT NULL,
        Type TEXT NOT NULL,
        Query TEXT NOT NULL,
        Interval INTEGER DEFAULT 60 NOT NULL,
        Color TEXT DEFAULT "#000000",
        FOREIGN KEY (WidgetId) REFERENCES Widgets ON DELETE CASCADE
      )
    `;

    const defaultDashboard = `INSERT OR IGNORE INTO Dashboards(DashboardId, UserId) VALUES(0, 0);`;

    try {
      this.DataSQL.serialize(async () => {
        this.DataSQL.get(FK_On); // Enable foreign key
        this.DataSQL.run(UserTable); // Add user table
        this.DataSQL.run(DashBoardTable); // Add dashboard table
        this.DataSQL.run(WidgetTable); // Add widget table
        this.DataSQL.run(GraphTable); // Add graph table
        this.DataSQL.run(defaultDashboard); // Create default dashboard
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

  // get db client (custom queries)
  GetDb() {
    return this.DataSQL;
  }

  //Two ways to pass in a query.
  //1) Via Prepared statements -> SELECT * FROM Widgets WHERE WidgetId = ? / Params => [Id], Id OR
  //SELECT * FROM Widgets WHERE WidgetId = $Id -> Params { $Id }
  //2) Directly -> SELECT FROM Widgets WHERE WidgetId = 1 and params empty [] or {}

  //Get all elements.
  async GetAll(Query, Params) {
    const db = this.GetDb();
    return new Promise(function (resolve, reject) {
      db.all(Query, Params, (err, rows) => {
        if (err) {
          reject(0);
          console.log(err);
        }

        resolve(rows);
      });
    });
  }

  //Get one element
  async GetOne(Query, Params) {
    const db = this.GetDb();
    //Via a promise, is it possible to async await a query
    return new Promise(function (resolve, reject) {
      db.get(Query, Params, (err, rows) => {
        if (err) {
          reject(0);
          console.log(err);
        }

        resolve(rows);
      });
    });
  }

  async JoinResult(Query, Params) {
    //Via a promise, is it possible to async await a query
    return this.GetAll(Query, Params);
  }

  //Update query
  async Update(Query, Params) {
    const db = this.GetDb();
    //Via a promise, is it possible to async await a query
    return new Promise(function (resolve, reject) {
      db.run(Query, Params, function (err) {
        if (err) {
          reject(0);
          console.log(err);
        }
        //console.log(`Last Id is ${this.lastID}`);
        resolve(true);
      });
    });
  }

  //Delete a element
  async Delete(Query, Params) {
    const db = this.GetDb();

    //Via a promise, is it possible to async await a query
    return new Promise(function (resolve, reject) {
      db.run(Query, Params, function (err) {
        if (err) {
          reject(0);
          console.log(err);
        }
        resolve(true);
      });
    });
  }

  //Create function.
  async Create(Query, InputValues) {
    const db = this.GetDb();
    //Via a promise, is it possible to async await a query
    return new Promise(function (resolve, reject) {
      console.log(Query);
      db.run(Query, InputValues, function (err) {
        if (err) {
          reject(0);
        }

        resolve(this.lastID);
      });
    });
  }
}

module.exports = { SqliteDataContext };
