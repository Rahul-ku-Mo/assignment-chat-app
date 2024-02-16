const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  
  socket.on("send-message", (data) => {
    io.emit("receive-message", data); // Broadcast the message to all clients
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });


});
httpServer.listen(8000);

module.exports = app;
