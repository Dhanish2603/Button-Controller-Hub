const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  }, 
}); 
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("playVideo", (videoNumber) => {
    console.log(`Playing Video ${videoNumber}`);

    io.emit("playVideo", videoNumber);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
