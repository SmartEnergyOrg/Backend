require("dotenv").config();

const server = require("../../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("widgetController", function () {
  it.skip("should return information if ID is 1", function (done) {
    chai
      .request(server)
      .get("/api/widgets/poll/1")
      .end((err, res) => {
        console.log("end has been reached");
        res.should.have.status(200);
        res.should.have.property("body").has.length(1000);
        done();
      });
  });
});
