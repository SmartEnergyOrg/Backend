const sqlLite = require("sqlite3").verbose();


//Responsible for the connection with the database and CRUD operations of the database.
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
        console.log("Database is connected");
        //Will setup tables
        this.setupTables();
      }
    });
  }

  //Creates all the tables.
  async setupTables() {
    const FK_On = "PRAGMA foreign_keys = ON";
    const WidgetSettingTable = `CREATE TABLE IF NOT EXISTS WidgetSettings(
        SettingId INTEGER PRIMARY KEY,
        Position INTEGER DEFAULT 0,
        ISACTIVE INTEGER CHECK ( 0 OR 1 ) DEFAULT 1,
        WidgetId INTEGER NOT NULL,
        FOREIGN KEY (WidgetId) REFERENCES Widgets ON DELETE CASCADE
        )`;

        //TODO Foreign key with dashboard needs to be connected.
    const WidgetTable = `CREATE TABLE IF NOT EXISTS Widgets (
     WidgetId INTEGER PRIMARY KEY,
     DashboardId INTEGER DEFAULT 0,
     Title TEXT NOT NULL ,
     Time_Period INTEGER NOT NULL,
     Type_Graph INTEGER NOT NULL,
     Color_Graph TEXT DEFAULT 'Black'
    /*FOREIGN KEY (DashboardId) REFERENCES Dashboard ON DELETE SET DEFAULT*/
     )`;
    const DashBoardTable = `
  CREATE TABLE IF NOT EXISTS Dashboards(
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

  const DatasourceTable = `CREATE TABLE IF NOT EXISTS Graphs(
    GraphId INTEGER PRIMARY KEY,
    WidgetId INTEGER NOT NULL,
    Name TEXT NOT NULL,
    Query TEXT,
    Type_Graph TEXT,
    PowerSource TEXT NOT NULL,
    FOREIGN KEY (WidgetId) REFERENCES Widgets ON DELETE CASCADE
  )`

  const defaultDashboard = `INSERT OR IGNORE INTO Dashboards(DashboardId, UserId) VALUES(0, 0);`

    try {
      this.DataSQL.serialize(async () => {
        this.DataSQL.get(FK_On);
        this.DataSQL.run(UserTable);
        this.DataSQL.run(DashBoardTable);
        this.DataSQL.run(WidgetTable);
        this.DataSQL.run(WidgetSettingTable);
        this.DataSQL.run(DatasourceTable);
        this.DataSQL.run(defaultDashboard);
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

  //Geef database client terug
  //Voor custom queries
  GetDb(){
    return this.DataSQL;
  }

  //Two ways to pass in a query.
  //1) Via Prepared statements -> SELECT * FROM Widgets WHERE WidgetId = ? / Params => [Id], Id OR 
  //SELECT * FROM Widgets WHERE WidgetId = $Id -> Params { $Id }
  //2) Directly -> SELECT FROM Widgets WHERE WidgetId = 1 and params empty [] or {}

  //Get all elements.
  async GetAll(Query, Params){
    const db = this.GetDb();
    return new Promise(function(resolve, reject){
      db.all(Query,Params,(error, rows)=>{
        if(error) reject(error);
        resolve(rows);
      });
    })
  }

  //Get one element
  async GetOne(Query, Params){
    const db = this.GetDb();
    //Via a promise, is it possible to async await a query
    return new Promise(function(resolve, reject){
      db.get(Query, Params, (error, rows)=>{
        if(error) reject(error);
        console.log(rows);
        resolve(rows);
      });
    })
  }

  async JoinResult(Query, Params){
    //Via a promise, is it possible to async await a query
    return this.GetAll(Query, Params);
  }

  //Update query
  async Update(Query, Params){
    const db = this.GetDb();
 //Via a promise, is it possible to async await a query
    return new Promise(function(resolve, reject){
      db.run(Query, Params, function(error){
        if(error) reject(false);
        console.log(`Last Id is ${this.lastID}`);
        resolve(true);
      });
    })
  }

  //Delete a element
  async Delete(Query, Params){
    const db = this.GetDb();

     //Via a promise, is it possible to async await a query
    return new Promise(function(resolve, reject){
      db.run(Query, Params, function(error){
        if(error) reject(false);
        resolve(true);
      });
    })
  }

  //Create function.
  async Create(Query, InputValues){
    const db = this.GetDb();
     //Via a promise, is it possible to async await a query
    return new Promise(function(resolve, reject){
      db.run(Query, InputValues, function(err){
        if(err) reject(0);
        console.log(`Id of edited of inserted ${this.lastID}`);
        //Retrieves last inserted id.
        resolve(this.lastID);
      });
    })
    
  }
}

module.exports = { SqliteDataContext };
