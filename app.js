require("dotenv").config();
const initServer = require("./loaders");
const express = require("express");
const http = require("http");

async function createServer() {
  const app = express();
  await initServer({ expressApp: app });

  return app;
}

async function startServer() {
  const app = express();
  const port = process.env.PORT || "3001";

  await initServer({ expressApp: app });
  app.set("port", port);

  const server = http.createServer(app);

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  return app;

  function onError(err) {
    if (err.syscall !== "listen") {
      throw err;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    switch (err.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw err;
    }
  }

  function onListening() {
    console.log("🚀  Your server is ready !");
  }
}

if (process.env.NODE_ENV !== "test") startServer();

module.exports = createServer;
