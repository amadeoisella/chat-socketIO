// lado cliente, desde aqui recopilaremos la info y la enviaremos al servidor
$(function () {
  const socket = io();
  let nick = "";

  // Accedemos a los elementos del DOM
  const messageForm = $("#messages-form");
  const messageBox = $("#message");
  const chat = $("#chat");

  const nickForm = $("#nick-form");
  const nickError = $("#nick-error");
  const nickName = $("#nick-name");

  const userNames = $("#usernames");

  // Eventos
  // Enviamos un mensaje al servidor
  messageForm.submit((e) => {
    e.preventDefault();
    socket.emit("enviar mensaje", messageBox.val());
    messageBox.val("");
  });

  // Obtenemos respuesta del servidor:
  socket.on("nuevo mensaje", function (datos) {
    // console.log(datos);
    let color = "#f4f4f4";

    if (nick == datos.username) {
      color = "#9ff4c5";
    }

    chat.append(
      `<div class="msg-area mb-2 " style="background-color:${color}"><b>${datos.username}:</b><p class="msg">${datos.msg}</p</div>`
    );
  });

  // Nuevo usuario logueado:
  nickForm.submit((e) => {
    e.preventDefault();
    socket.emit("nuevo usuario", nickName.val(), (datos) => {
      if (datos) {
        nick = nickName.val();
        $("#nick-wrap").hide();
        $("#content-wrap").show();
      } else {
        nickError.html(
          '<div class="alert alert-danger">El usuario ya existe</div>'
        );
      }
      nickName.val("");
    });
  });
  // Obtenemos el array de usuarios conectados
  socket.on("nombre usuario", (datos) => {
    let html = "";
    let color = "";
    let salir = "";

    for (let i = 0; i < datos.length; i++) {
      if (nick == datos[i]) {
        color = "#02f43";
        salir = '<a class="enlace-salir" href="/">Salir</a>';
      } else {
        color = "#000";
        salir = "";
      }
      html += `<p style="color: ${color}">${datos[i]} ${salir}</p>`;
    }
    userNames.html(html);
  });
});
