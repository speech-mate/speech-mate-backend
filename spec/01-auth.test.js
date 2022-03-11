const supertest = require("supertest");
const http = require("http");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const { describe, it, afterEach, before } = require("mocha");
const createMyAppServer = require("../app");
const User = require("../models/User");
const { mockUser } = require("./mockdata");
const { createMockUser, removeMockUser } = require("./helper");
let request;
let refreshToken;

describe("environment variable test", () => {
  it("The environment variable must have a secret key to encode and decode access token", () => {
    expect(process.env.ACCESS_SECRET).to.exist;
    expect(process.env.ACCESS_SECRET).not.to.include(";");
  });

  it("The environmental variable must have a secret key to create a new access token", () => {
    expect(process.env.REFRESH_SECRET).to.exist;
    expect(process.env.REFRESH_SECRET).not.to.include(";");
  });
});

describe("auth test", () => {
  before(async () => {
    request = supertest(http.createServer(await createMyAppServer()));
  });

  afterEach(removeMockUser);

  describe("POST /auth/login", () => {
    it("should respond with token, userInfo if requests login", (done) => {
      request
        .post("/auth/login")
        .send(mockUser)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { message, data } = res.body;
          refreshToken = data.refreshToken;

          expect(message).to.exist;
          expect(message).to.eql("ok");

          expect(data.userInfo).to.exist;
          expect(data.userInfo.nickname).to.eql(mockUser.nickname);

          expect(data.accessToken).to.exist;

          const payload = await jwt.verify(
            data.accessToken,
            process.env.ACCESS_SECRET,
          );
          delete payload.iat;
          delete payload.exp;

          expect(payload).to.eql(mockUser);

          const newUser = await User.findOne({ email: mockUser.email }).lean();
          expect(newUser).to.exist;

          done();
        });
    });
  });

  describe("POST /auth/refresh", () => {
    before(createMockUser);

    it("should response with new access token and userInfo If joined user request login", (done) => {
      request
        .post("/auth/refresh")
        .send({ refreshToken })
        .expect("Content-Type", /json/)
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { message, data } = res.body;

          expect(message).to.exist;
          expect(message).to.eql("ok");

          expect(data.userInfo).to.exist;
          expect(data.userInfo.nickname).to.eql(mockUser.nickname);

          expect(data.accessToken).to.exist;

          const payload = await jwt.verify(
            data.accessToken,
            process.env.ACCESS_SECRET,
          );
          delete payload.iat;
          delete payload.exp;

          expect(payload).to.eql(mockUser);

          done();
        });
    });
  });
});
