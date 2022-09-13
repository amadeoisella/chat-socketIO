const express = require("express");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const socketio = require("socket.io")(server);

app.set("port", process.env.PORT || 8080);

// ejecutamos la funcion de sockets.js
require("./sockets")(socketio);

// static files
app.use(express.static(path.join(__dirname, "public")));

server.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});

// 32:31
