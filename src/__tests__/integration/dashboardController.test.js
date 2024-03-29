require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { before, after } = require("mocha");
const { DatabaseInstance } = require("../../db/InstanceOfDatabase");

chai.should();
chai.use(chaiHttp);
const UserInsert = `REPLACE INTO Users(UserId, FirstName,
  LastName, Street, HomeNr, PostalCode, Country, Emailadres, Password)
  VALUES(0, 'Test', 'Name', 'TestPlein', '1B', '8080EX', 'Testistan', 'Test@example.com', 'Password')`;
describe("Read dashboards", function () {
  it("Should give a list of dashboards back", function (done) {
    chai
      .request(server)
      .get("/api/dashboards")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Retrieval successful");
        expect(response.result.length).equals(1);
        done();
      });
  });

  it("Should get one dashboard back", (done) => {
    chai
      .request(server)
      .get("/api/dashboards/0")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Retrieval successful");
        expect(response.result.DashboardId).equals(0);
        expect(response.result.UserId).equals(0);
        expect(response.result.ShowNavbar).equals(1);
        expect(response.result.ShowWeather).equals(0);
        expect(response.result.PeakTariffOn).equals(0);
        expect(response.result.PeakTariff).equals(0);
        expect(response.result.NormalTariff).equals(0);
        done();
      });
  });

  it("Should send error back if nothing is found", (done) => {
    chai
      .request(server)
      .get("/api/dashboards/9000")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Dashboard search failed");
        expect(response.result).equals(false);
        done();
      });
  });
});

describe("Create dashboard", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(`DELETE FROM Users;`);
    Datab.Delete(`DELETE FROM Dashboards WHERE DashboardId != 0;`);
    done();
  });

  it("Create dashboard", function (done) {
    chai
      .request(server)
      .post("/api/dashboards")
      .send({ UserId: 2 })
      .end((err, res) => {
        const response = res.body;

        expect(response.result).equals(1);
        expect(response.message).equals("Execution was successful");
        done();
      });
  });
});

describe("Update dashboard", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(`DELETE FROM Users;`);
    Datab.Delete(`DELETE FROM Dashboards WHERE DashboardId != 0;`);
    done();
  });

  it("Should update a dashboard.", function (done) {
    chai
      .request(server)
      .put("/api/dashboards/2")
      .send({
        UserId: 1,
        ShowNavbar: 0,
        PeakTariffOn: 1,
        ShowWeather: 0,
        PeakTariff: 5,
        NormalTariff: 5,
      })
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Execution was successful");
        expect(response.result).equals(true);
        done();
      });
  });
});

describe("Delete dashboard", function () {
  let Datab;
  before(async (done) => {
    Datab = DatabaseInstance();
    Datab.Create(UserInsert);
    done();
  });

  after(async (done) => {
    Datab.Delete(`DELETE FROM Users;`);
    Datab.Delete(`DELETE FROM Dashboards WHERE DashboardId != 0;`);
    done();
  });

  it("Should delete dashboard with the right Id.", function (done) {
    chai
      .request(server)
      .delete("/api/dashboards/2")
      .end((err, res) => {
        const response = res.body;
        expect(response.message).equals("Execution was successful");
        expect(response.result).equals(true);
        done();
      });
  });
});
