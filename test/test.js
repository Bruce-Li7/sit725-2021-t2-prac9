var expect = require("chai").expect;
var request = require("request");

describe("test project uploading", function () {
  var url = "http://localhost:3000/api/projects";
  it("returns status 200 to check if api works", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("returns result as array", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body).to.be.an("array");
      done();
    });
  });
});