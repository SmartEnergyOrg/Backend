require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { SqliteDataContext } = require("../../db/sqlite.client");
const { before, after, beforeEach, afterEach } = require("mocha");
const { DatabaseInstance } = require("../../db/InstanceOfDatabase");
const { fluxExpression } = require("@influxdata/influxdb-client");

chai.should();
chai.use(chaiHttp);

//Queries
const WidgetInsert =
  "REPLACE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(1, 'Widget voor gasverbruik', 1, 'IconURL');";
const GraphInsert =
  "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(1, 'bar', 'SELECT FROM', 5, '#000001')";
const WidgetInsert2 =
  "REPLACE INTO Widgets(WidgetId, Title, Position, Icon) VALUES(2, 'Widget voor gasverbruik', 2, 'IconURL');";
const GraphInsert2 =
  "REPLACE INTO Graphs (WidgetId, Type, Query, Interval, Color) VALUES(2, 'bar', 'SELECT FROM', 30, '#000001')";

const UserInsert = `REPLACE INTO Users(UserId, FirstName, LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password) VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
const deleteQueryUser = `DELETE FROM Users;`;
const deleteQueryWidget = `DELETE FROM Widgets;`;
const deleteGraph = "DELETE FROM Graphs";

//Valid Models
const validGraph = {
  Type: "bar",
  Query: "FLUXQUERY",
  Interval: 30,
  Color: "#000000",
};

const validWidget = {
  Title: "Nieuwe widget",
  Icon: "IconURL",
  Position: 1,
};

describe("CRUD Widgets", function () {
  let Datab;
  before(async () => {
    Datab = DatabaseInstance();
    await Datab.Create(UserInsert);
    await Datab.Create(WidgetInsert);
    await Datab.Create(WidgetInsert2);
    await Datab.Create(GraphInsert);
    await Datab.Create(GraphInsert2);
  });

  after(async () => {
    await Datab.Delete(deleteGraph);
    await Datab.Delete(deleteQueryWidget);
    await Datab.Delete(deleteQueryUser);
  });

  describe("Test update of widgets", () => {
    it("A widget without graphs, should give a assertion error.", function (done) {
      chai
        .request(server)
        .put("/api/widgets/1")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Icon: "IconURL",
            Position: 1,
          },
          Graphs: [],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Must have at least one graph");
          done();
        });
    });

    it("No title should give a assertion error", function (done) {
      chai
        .request(server)
        .put("/api/widgets/1")
        .send({
          Widget: {
            Icon: "IconURL",
            Position: 1,
          },
          Graphs: [validGraph],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("A Title must be filled in");
          done();
        });
    });

    it("No icon given should give a warning", function (done) {
      chai
        .request(server)
        .put("/api/widgets/1")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Position: 1,
          },
          Graphs: [
            { GraphId: 1, Measurement: "kwh", Name: "Nieuw", Type: "Lijn" },
          ],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Icon must be filled in");
          done();
        });
    });

    it("Widget should be succesfully updated", function (done) {
      chai
        .request(server)
        .put("/api/widgets/1")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Icon: "IconURL",
            Position: 1,
          },
          Graphs: [validGraph],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Update is completed");
          expect(response.result).equals(true);
          done();
        });
    });
  });

  describe("Read widget test", () => {
    it("Widget should be given based on widgetId", function (done) {
      chai
        .request(server)
        .get("/api/widgets/1")
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Search result");
          expect(response.result.WidgetId).equals(1);
          done();
        });
    });

    it("Gives all widgets", function (done) {
      chai
        .request(server)
        .get("/api/widgets")
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Widgets are retrieved");
          expect(response.result.length).equals(2);
          done();
        });
    });
  });

  describe("Deletion widget test", () => {
    it("Widget should be succesfully deleted", function (done) {
      chai
        .request(server)
        .delete("/api/widgets/1")
        .end((err, res) => {
          expect(res.status).equals(204);
          done();
        });
    });
  });
  describe("Test input creation of widget", () => {
    it("Lack of graphs should give a warning", function (done) {
      chai
        .request(server)
        .post("/api/widgets")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Icon: "IconURL",
            Position: 1,
          },
          Graphs: [],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Must have at least one graph");
          done();
        });
    });

    it("Lack of Icon fields should give a warning", function (done) {
      chai
        .request(server)
        .post("/api/widgets")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Position: 1,
          },
          Graphs: [],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Icon must be filled in");
          done();
        });
    });

    it("Graph does not contain all required attributes within graphlist", function (done) {
      chai
        .request(server)
        .post("/api/widgets")
        .send({
          Widget: {
            Title: "Nieuwe widget",
            Icon: "IconURL",
            Position: 1,
          },
          Graphs: [{ Interval: 30, Query: "Voorbeeld" }],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Type needs to be filled in");
          done();
        });
    });

    it("No position given should give a warning", function (done) {
      chai
        .request(server)
        .post("/api/widgets")
        .send({
          Widget: validWidget,
          Graphs: [
            {
              Measurement: "kwh",
              Name: "Voorbeeld",
              Type: "Lijn",
              Color: "#000000",
            },
          ],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Input failure");
          expect(response.result).equals("Query needs to be filled in");
          done();
        });
    });

    it("Widget should be succesfully created", function (done) {
      chai
        .request(server)
        .post("/api/widgets")
        .send({
          Widget: validWidget,
          Graphs: [validGraph],
        })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).equals("Creation widget succeeded");
          expect(response.succeeded).equals(true);
          done();
        });
    });
  });
});
