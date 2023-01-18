require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const { before, after } = require("mocha");
const { DatabaseInstance } = require("../../db/InstanceOfDatabase");

chai.should();
chai.use(chaiHttp);

const query =
  "REPLACE INTO Weathers (WeatherId, Country, Name, Lat, Lon) VALUES(1,'Niets','Nothing',1, 1);";
const deleteQuery = "DELETE FROM Weathers";

let correctInput = {
  country: "NL",
  name: "Rotterdam",
  lat: 52,
  lon: 223,
};
let wrongInputNoCountry = { name: "Rotterdam", lat: 52, lon: 223 };
let wrongInputNoName = { country: "NL", lat: 52, lon: 223 };
let wrongInputNoLon = { country: "NL", name: "Rotterdam", lat: 52 };
let wrongInputNoLat = { country: "NL", name: "Rotterdam", lon: 223 };
describe("Test weatherconfig update", () => {
  let db;

  before(async () => {
    db = DatabaseInstance();
    await db.Create(query);
  });

  after(async () => {
    await db.Delete(deleteQuery);
  });

  it("Test if controller gives an validation error when one country is missing", (next) => {
    chai
      .request(server)
      .put("/api/weathers")
      .send(wrongInputNoCountry)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Input failure");
        expect(body.result).equals("Country needs to be filled in");
        next();
      });
  });

  it("Test if controller gives an validation error when longitude is missing", (next) => {
    chai
      .request(server)
      .put("/api/weathers")
      .send(wrongInputNoName)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Input failure");
        expect(body.result).equals("City needs to be filled in");
        next();
      });
  });

  it("Test if controller gives an validation error when one of the values is missing", (next) => {
    chai
      .request(server)
      .put("/api/weathers")
      .send(wrongInputNoLon)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Input failure");
        expect(body.result).equals("Longtitude needs to be filled in");
        next();
      });
  });

  it("Test if controller gives an validation error when one of the values is missing", (next) => {
    chai
      .request(server)
      .put("/api/weathers")
      .send(wrongInputNoLat)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Input failure");
        expect(body.result).equals("lattitude needs to be filled in");
        next();
      });
  });

  it("Test if weathercontroller succesfully updates weather config", (next) => {
    chai
      .request(server)
      .put("/api/weathers")
      .send(correctInput)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Update is completed");
        expect(body.result.country).equals("NL");
        expect(body.result.name).equals("Rotterdam");
        expect(body.result.lat).equals(52);
        expect(body.result.lon).equals(223);
        next();
      });
  });
});

describe("Test weatherconfig retrieval", () => {
  before(async () => {
    db = DatabaseInstance();
    await db.Create(query);
  });

  after(async () => {
    await db.Delete(deleteQuery);
  });

  it("Test if weathercontroller succesfully updates weather config", (next) => {
    chai
      .request(server)
      .get("/api/weathers")
      .send(correctInput)
      .end((err, res) => {
        const body = res.body;
        expect(body.message).equals("Search result");
        expect(body.result.country).equals("Niets");
        expect(body.result.name).equals("Nothing");
        expect(body.result.lat).equals(1);
        expect(body.result.lon).equals(1);
        next();
      });
  });
});
