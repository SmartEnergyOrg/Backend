require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { SqliteDataContext } = require("../../db/sqllite.client");
const { before, after } = require("mocha");
const { InstanceOfDB } = require("../../db/databaseInstance");

chai.should();
chai.use(chaiHttp);


const WidgetInsert = "REPLACE INTO  Widgets(WidgetId, DashboardId, Title, DefaultRange, Color_Graph) VALUES(1, 0, 'Widget voor gasverbruik', '24h', 'Blue');"
const GraphInsert = "REPLACE INTO Graphs (WidgetId, Name, Measurement, Type_Graph) VALUES(1, 'Voorbeeld', 'kwh', 'lijn')"
const UserInsert = `REPLACE INTO Users(UserId, FirstName, 
    LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password) 
    VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
const deleteQueryUser = `DELETE FROM Users;`;
const deleteQueryWidget = `DELETE FROM Widgets;`;
const deleteGraph = 'DELETE FROM Graphs';
    describe("Create graphs test", function () {
        let Datab;
        before(async (done)=>{
          Datab = InstanceOfDB();
          Datab.Create(UserInsert);
          Datab.Create(WidgetInsert);
          Datab.Create(GraphInsert);
          done();
        });
      
        after(async (done)=>{
          Datab.Delete(deleteQueryUser);
          Datab.Delete(deleteQueryWidget);
          Datab.Delete(deleteGraph);
          done();
        });


        it('Input failure of graph creation, should give a assertion warning.', function(done){
            chai.request(server)
            .post('/api/widgetsconfig/1/graphs')
            .send({WidgetId: 1, Type_Graph: "Cirkel", Measurement: "M3"})
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Input failure");
                expect(response.result).equals("Name needs to be filled in");
                done();
              });
        })

        it('Invalid foreign key should give a firm warning.', function(done){
            chai.request(server)
            .post('/api/widgetsconfig/9999/graphs')
            .send({Name: "Voorbeeld 2", Type_Graph: "Cirkel", Measurement: "M3"})
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Aanmaken van een grafiek is niet voltooid");
                expect(response.succeeded).equals(false);
                done();
              });
        })

        it('Successful graph creation gives positive response message', function(done){
            chai.request(server)
            .post('/api/widgetsconfig/1/graphs')
            .send({Name: "Voorbeeld 2", Type_Graph: "Cirkel", Measurement: "M3"})
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Graph succesfully made");
                expect(response.succeeded).equals(true);
                done();
              });
        })
    })

    describe("Update graphs test", function () {
      let Datab;
      before(async (done)=>{
        Datab = InstanceOfDB();
        Datab.Create(UserInsert);
        Datab.Create(WidgetInsert);
        Datab.Create(GraphInsert);
        done();
      });
    
      after(async (done)=>{
        Datab.Delete(deleteQueryUser);
        Datab.Delete(deleteQueryWidget);
        Datab.Delete(deleteGraph);
        done();
      });

        it('Invalid input should give asertion error.', function(done){
            chai.request(server)
            .put('/api/widgetsconfig/1/graphs/1')
            .send({Name: "Voorbeeld 3", Measurement: "M3"})
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Input failure");
                expect(response.result).equals("Type_Graph needs to be filled in");
                done();
              });
        })

          it('Successful graph update gives positive response message', function(done){
            chai.request(server)
            .put('/api/widgetsconfig/1/graphs/1')
            .send({Name: "Voorbeeld 3", Type_Graph: "Cirkel", Measurement: "M3"})
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Graph is updated");
                expect(response.succeeded).equals(true);
                done();
              });
        })
    })

    describe("Delete graphs test", function () {
      let Datab;
      before(async (done)=>{
        Datab = InstanceOfDB();
        Datab.Create(UserInsert);
        Datab.Create(WidgetInsert);
        Datab.Create(GraphInsert);
        done();
      });
    
      after(async (done)=>{
        Datab.Delete(deleteQueryUser);
        Datab.Delete(deleteQueryWidget);
        Datab.Delete(deleteGraph);
        done();
      });
        it('Successful deletion of graph should give positive message.', function(done){
            chai.request(server)
            .delete('/api/widgetsconfig/1/graphs/1')
            .end((err, res) => {
                const response = res.body;
                expect(response.message).equals("Graph is succesfully removed");
                expect(response.succeeded).equals(true);
                done();
              });
        })
    })

describe('Read graphs', function(){
  let Datab;
  before(async ()=>{
    Datab = InstanceOfDB();
    await Datab.Create(UserInsert);
    await Datab.Create(WidgetInsert);
    await Datab.Create(GraphInsert);
  });

  after(async ()=>{
    await Datab.Delete(deleteGraph);
    await Datab.Delete(deleteQueryWidget);
    await Datab.Delete(deleteQueryUser);
  });

  it('Gives all graph', function(done){
    chai.request(server)
    .get('/api/widgetsconfig/1/graphs')
    .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Retrieval all graphs succesful");
        expect(response.succeeded).equals(true);
        done();
      });
  })

  it('Gives One graph', function(done){
    chai.request(server)
            .get('/api/widgetsconfig/1/graphs/1')
            .end((err, res) => {
                const response = res.body;
                const graph =response.result;
                expect(response.message).equals("Graph retrieved");
                expect(response.succeeded).equals(true);
                expect(graph.WidgetId).equals(1);
                expect(graph.Name).equals('Voorbeeld');
                expect(graph.Measurement).equals('kwh');
                expect(graph.Type_Graph).equals('lijn');
                done();
              });
  })
})
