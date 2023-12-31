const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io"); //grav library

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], //specify all properties with cors
  },
});

io.on("connection", (socket) => {
  console.log(`"User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
}); //listen to events
server.listen(3001, () => {
  console.log("server running");
});
