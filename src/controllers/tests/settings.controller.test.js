require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { SqliteDataContext } = require("../../db/sqllite.client");
const { before, after } = require("mocha");

chai.should();
chai.use(chaiHttp);
const WidgetInsert = "REPLACE INTO  Widgets(WidgetId, DashboardId, Title, DefaultRange, Color_Graph) VALUES(1, 0, 'Widget voor gasverbruik', '24h', 'Blue');"
const SettingsInsert = 'REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(1, 1, 1, 1)'
const UserInsert = `REPLACE INTO Users(UserId, FirstName, 
    LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password) 
    VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
describe('Test update of widgetSettings', ()=>{
    let Datab;
    before(async (done)=>{
      Datab = new SqliteDataContext("DashboardConfigDB");
      Datab.Create(UserInsert);
      Datab.Create(WidgetInsert);
      Datab.Create(SettingsInsert);
      done();
    });
  
    after(async (done)=>{
      Datab.Delete(`DELETE FROM Users;`);
      Datab.Delete(`DELETE FROM Dashboards WHERE DashboardId != 0;`);
      Datab.Delete(`DELETE FROM Widgets;`);
      done();
    });

    it('Test empty ISACTIVE', function(done){
        chai.request(server)
        .put('/api/widgetsconfig/1/settings')
        .send({Position: 1})
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("ISACTIVE needs to be filled in");
            done();
          });
    })

    it('Test should give warning that a field is empty', function(done){
        chai.request(server)
        .put('/api/widgetsconfig/1/settings')
        .send({Position: 1})
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("ISACTIVE needs to be filled in");
            done();
          });
    })

    it('Successful update of settings', function(done){
        chai.request(server)
        .put('/api/widgetsconfig/1/settings')
        .send({Position: 1, ISACTIVE: 0})
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Settings retrieved");
            expect(response.result).equals(true);
            expect(response.succeeded).equals(true);
            done();
          });
    })
})


describe('Test read of widgetSettings', ()=>{
  let Datab;
  before(async (done)=>{
    Datab = new SqliteDataContext("DashboardConfigDB");
    Datab.Create(UserInsert);
    Datab.Create(WidgetInsert);
    Datab.Create(SettingsInsert);
    done();
  });

  after(async (done)=>{
    Datab.Delete(`DELETE FROM Users;`);
    Datab.Delete(`DELETE FROM Dashboards WHERE DashboardId != 0;`);
    Datab.Delete(`DELETE FROM Widgets;`);
    done();
  });

    it('Successful retrieval of settings', function(done){
        chai.request(server)
        .get('/api/widgetsconfig/1/settings')
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Settings retrieved");
            expect(response.succeeded).equals(true);
            done();
          });
    })
})
