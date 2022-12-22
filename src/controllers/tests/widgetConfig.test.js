require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { SqliteDataContext } = require("../../db/sqllite.client");
const { before, after } = require("mocha");

chai.should();
chai.use(chaiHttp);

//Queries
const WidgetInsert = "REPLACE INTO  Widgets(WidgetId, DashboardId, Title, DefaultRange, Color_Graph) VALUES(1, 0, 'Widget voor gasverbruik', '24h', 'Blue');"
const GraphInsert = "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type_Graph, GraphId) VALUES(1, 'Voorbeeld', 'kwh', 'lijn', 1)"
const WidgetInsert2 = "REPLACE INTO  Widgets(WidgetId, DashboardId, Title, DefaultRange, Color_Graph) VALUES(2, 0, 'Widget voor gasverbruik', '24h', 'Blue');"
const GraphInsert2 = "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type_Graph, GraphId) VALUES(2, 'Voorbeeld', 'kwh', 'lijn', 2)"
const SettingsInsert = 'REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(1, 1, 1, 1)';
const SettingsInsert2 = 'REPLACE INTO  WidgetSettings (SettingId, Position, ISACTIVE, WidgetId) VALUES(2, 1, 1, 2)';

const UserInsert = `REPLACE INTO Users(UserId, FirstName, 
    LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password) 
    VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
const deleteQueryUser = `DELETE FROM Users;`;
const deleteQueryWidget = `DELETE FROM Widgets;`;
const deleteSettings = 'DELETE FROM WidgetSettings';
const deleteGraph = 'DELETE FROM Graphs';


describe('CRUD Widgets', function(){
    let Datab;
    before(async (done)=>{
          const sql = new SqliteDataContext("DashboardConfigDB");
          Datab = sql.DataSQL;
          await Datab.serialize(()=>{
            Datab.run(UserInsert);
            Datab.run(WidgetInsert);
            Datab.run(GraphInsert);
            Datab.run(SettingsInsert);
            Datab.run(SettingsInsert2);
            Datab.run(WidgetInsert2);
            Datab.run(GraphInsert2);
            done();
          });
           
    });
      
    after(async (done)=>{
          await Datab.serialize(async ()=>{
            Datab.run(deleteQueryUser);
            Datab.run(deleteQueryWidget);
            Datab.run(deleteGraph);
            Datab.run(deleteSettings);
            done();
          });
    });

    it('Lack of graphs should give a warning', function(done){
        chai.request(server)
        .post('/api/widgetsconfig')
        .send({
            Widget:{
                Title: "Nieuwe widget", 
                DashboardId: 0, 
                DefaultRange: "16h", 
                Color_Graph: "Red", 
                Frequence: 40000 
            },
            Position: 1,
            Graphs:[]
          })
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("Must have at least one graph");
            done();
          });
    })

    it('Lack of text fields should give a warning', function(done){
        chai.request(server)
        .post('/api/widgetsconfig')
        .send({
            Widget:{
                Title: "Nieuwe widget", 
                DashboardId: 0,  
                Color_Graph: "Red", 
                Frequence: 40000 
            },
            Position: 1,
            Graphs:[]
          })
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("A range must be filled in");
            done();
          });
    })

    it('Graph does not contain all required attributes within graphlist', function(done){
        chai.request(server)
        .post('/api/widgetsconfig')
        .send({
            Widget:{
                Title: "Nieuwe widget", 
                DashboardId: 0, 
                DefaultRange: "16h", 
                Color_Graph: "Red", 
                Frequence: 40000 
            },
            Position: 1,
            Graphs:[{Measurement: "kwh", Name: "Voorbeeld"}]
          })
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("Type_Graph needs to be filled in");
            done();
          });
    })

    it('No position given should give a warning', function(done){
        chai.request(server)
        .post('/api/widgetsconfig')
        .send({
            Widget:{
                Title: "Nieuwe widget", 
                DashboardId: 0, 
                DefaultRange: "16h", 
                Color_Graph: "Red", 
                Frequence: 40000 
            },
            Graphs:[{Measurement: "kwh", Name: "Voorbeeld", Type_Graph: "Lijn"}]
          })
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Input failure");
            expect(response.result).equals("Must have a postion");
            done();
          });
    })

    it('Widget should be succesfully created', function(done){
        chai.request(server)
        .post('/api/widgetsconfig')
        .send({
            Widget:{
                Title: "Nieuwe widget", 
                DashboardId: 0, 
                DefaultRange: "16h", 
                Color_Graph: "Red", 
                Frequence: 40000 
            },
            Position: 1,
            Graphs:[{Measurement: "kwh", Name: "Voorbeeld", Type_Graph: "Lijn"}]
          })
        .end((err, res) => {
            const response = res.body;
            expect(response.message).equals("Creation widget succeeded");
            expect(response.succeeded).equals(true);
            done();
          });
    })
    it('Lack of graphs should give a warning', function(done){
      chai.request(server)
      .put('/api/widgetsconfig/1')
      .send({
          
          Title: "Nieuwe widget", 
          DashboardId: 0, 
          DefaultRange: "16h", 
          Color_Graph: "Red", 
          Frequence: 40000, 
          Settings:{
              Position: 1,
              ISACTIVE: 1,
              SettingId: 1
          }
          ,
          Graphs:[]
        })
      .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Must have at least one graph");
          done();
        });
  })

  it('Lack of text fields should give a warning', function(done){
      chai.request(server)
      .put('/api/widgetsconfig/1')
      .send({
          Title: "Nieuwe widget", 
          DashboardId: 0, 
          DefaultRange: "16h", 
          Color_Graph: "Red", 
          Frequence: 40000, 
          Settings:{
              Position: 1,
              SettingId: 1
          }
          ,
          Graphs:[{GraphId: 1, Measurement: "kwh", Name: "Nieuw", Type_Graph: "Lijn"}]
        })
      .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("ISACTIVE needs to be filled in");
          done();
        });
  })

  it('No field given should give a warning', function(done){
      chai.request(server)
      .put('/api/widgetsconfig/1')
      .send({
          
          Title: "Nieuwe widget", 
          DashboardId: 0, 
          Color_Graph: "Red", 
          Frequence: 40000, 
          Settings:{
              Position: 1,
              SettingId: 1
          }
          ,
          Graphs:[{GraphId: 1, Measurement: "kwh", Name: "Nieuw", Type_Graph: "Lijn"}]
        })
      .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("A range must be filled in");
          done();
        });
  })

  it('Widget should be succesfully updated', function(done){
      chai.request(server)
      .put('/api/widgetsconfig/1')
      .send({
          Title: "Nieuwe widget", 
          DashboardId: 0, 
          DefaultRange: "24h",
          Color_Graph: "Red", 
          Frequence: 40000, 
          Settings:{
              Position: 1,
              SettingId: 1,
              ISACTIVE: 1
          }
          ,
          Graphs:[{GraphId: 1, Measurement: "kwh", Name: "Nieuw", Type_Graph: "Lijn"}]
        })
      .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Update is completed");
          expect(response.result).equals(true);
          done();
        });
  })

  it('Widget should be given based on widgetId', function(done){
    chai.request(server)
    .get('/api/widgetsconfig/2')
    .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Search result");
        done();
      });
})

it('Gives all widgets', function(done){
    chai.request(server)
    .get('/api/widgetsconfig')
    .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Widgets are retrieved");
        done();
      });
})

it('Widget should be succesfully deleted', function(done){
  chai.request(server)
  .delete('/api/widgetsconfig/1')
  .end((err, res) => {
      const response = res.body;
      expect(response.message).equals("Deletion has succeeded result");
      expect(response.result).equals(true);
      done();
    });
})
})