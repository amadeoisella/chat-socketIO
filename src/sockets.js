// lado servidor, luego de que el cliente nos mande la informacion, la recopilaremos, organizaremos y enviaremos nuevamente para ser mostrada en tiempo real
module.exports = (io) => {
  let nickNames = [];

  io.on("connection", (socket) => {
    console.log("New User connect");

    // Al recibir el mensaje recojemos los datos:
    socket.on("enviar mensaje", (datos) => {
      // console.log(datos);

      io.sockets.emit("nuevo mensaje", {
        msg: datos,
        username: socket.nickname,
      });
    });
    socket.on("nuevo usuario", (datos, callback) => {
      if (nickNames.indexOf(datos) != -1) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = datos;
        nickNames.push(socket.nickname);

        io.sockets.emit("nombre usuario", nickNames);
      }
    });
    socket.on("disconnect", (datos) => {
      if (!socket.nickname) {
        return;
      } else {
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);
        io.sockets.emit("nombre usuario", nickNames);
      }
    });
  });
};
