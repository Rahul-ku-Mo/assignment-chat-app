const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketController = require("./controllers/socketController");

const app = express();
//for cross origin
app.use(cors());

//for server creation
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//for socket instance
socketController(io);

//for server listen
httpServer.listen(8000);

module.exports = app;