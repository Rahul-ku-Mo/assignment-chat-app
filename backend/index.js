const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    io.to(data.room).emit("message", data.message);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8000, () => console.log("Listening on port 8000"));
