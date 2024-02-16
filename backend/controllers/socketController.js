module.exports = function (io) {
  
    io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
      io.emit("receive-message", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
