require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { before, after } = require("mocha");
const { DatabaseInstance } = require("../../db/InstanceOfDatabase");

chai.should();
chai.use(chaiHttp);

const WidgetInsert =
  "REPLACE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(1, 'Widget voor gasverbruik', 1, 'IconURL');"
const GraphInsert =
  "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(1, 'bar', 'SELECT FROM', 5, '#000001')"
const UserInsert = `REPLACE INTO Users(UserId, FirstName,
    LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password)
    VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
const deleteQueryUser = `DELETE FROM Users;`;
const deleteQueryWidget = `DELETE FROM Widgets;`;
const deleteGraph = "DELETE FROM Graphs";


//Valid Models
const validGraph = {
  Type: "bar",
  Query: "FLUXQUERY",
  Interval: 30,
  Color: "#000000"
}

describe("Create graphs test", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    Datab.Create(WidgetInsert);
    Datab.Create(GraphInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(deleteQueryUser);
    Datab.Delete(deleteQueryWidget);
    Datab.Delete(deleteGraph);
    done();
  });

  it("Input failure of graph creation, should give a assertion warning.", function (done) {
    chai
      .request(server)
      .post("/api/widgets/1/graphs")
      .send({ WidgetId: 1, Type: "Cirkel", Measurement: "M3" })
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Input failure");
        expect(response.result).equals("Query needs to be filled in");
        done();
      });
  });

  it("Invalid foreign key should give a firm warning.", function (done) {
    chai
      .request(server)
      .post("/api/widgets/9999/graphs")
      .send(validGraph)
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Creation of graph failed");
        expect(response.succeeded).equals(false);
        done();
      });
  });

  it("Successful graph creation gives positive response message", function (done) {
    chai
      .request(server)
      .post("/api/widgets/1/graphs")
      .send(validGraph)
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Graph successfully made");
        expect(response.succeeded).equals(true);
        done();
      });
  });
});

describe("Update graphs test", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    Datab.Create(WidgetInsert);
    Datab.Create(GraphInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(deleteQueryUser);
    Datab.Delete(deleteQueryWidget);
    Datab.Delete(deleteGraph);
    done();
  });

  it("Invalid input should give asertion error.", function (done) {
    chai
      .request(server)
      .put("/api/widgets/1/graphs/1")
      .send({ Name: "Voorbeeld 3", Measurement: "M3" })
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Input failure");
        expect(response.result).equals("Type needs to be filled in");
        done();
      });
  });

  it("Successful graph update gives positive response message", function (done) {
    chai
      .request(server)
      .put("/api/widgets/1/graphs/1")
      .send(validGraph)
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Graph is updated");
        expect(response.succeeded).equals(true);
        done();
      });
  });
});

describe("Delete graphs test", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    Datab.Create(WidgetInsert);
    Datab.Create(GraphInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(deleteQueryUser);
    Datab.Delete(deleteQueryWidget);
    Datab.Delete(deleteGraph);
    done();
  });
  it("Successful deletion of graph should give positive message.", function (done) {
    chai
      .request(server)
      .delete("/api/widgets/1/graphs/1")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Graph is successfully removed");
        expect(response.succeeded).equals(true);
        done();
      });
  });
});

describe("Read graphs", function () {
  let Datab;
  before(async () => {
    Datab = DatabaseInstance();
    await Datab.Create(UserInsert);
    await Datab.Create(WidgetInsert);
    await Datab.Create(GraphInsert);
  });

  after(async () => {
    await Datab.Delete(deleteGraph);
    await Datab.Delete(deleteQueryWidget);
    await Datab.Delete(deleteQueryUser);
  });

  it("Gives all graph", function (done) {
    chai
      .request(server)
      .get("/api/widgets/1/graphs")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Successfully retrieved all graphs");
        expect(response.succeeded).equals(true);
        done();
      });
  });

  it("Gives One graph", function (done) {
    chai
      .request(server)
      .get("/api/widgets/1/graphs/1")
      .end((err, res) => {
        const response = res.body;
        const graph = response.result;
        expect(response.message).equals("Graph retrieved");
        expect(response.succeeded).equals(true);
        expect(graph.WidgetId).equals(1);
        expect(graph.Type).equals("bar");
        expect(graph.Query).equals("SELECT FROM");
        expect(graph.Interval).equals(5);
        expect(graph.Color).equals("#000001");
        done();
      });
  });
});
