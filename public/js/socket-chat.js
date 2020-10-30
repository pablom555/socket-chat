const socket = io();

// Se declararon en el archivo socket-chat.js
// let name = params.get('name');
// let chatRoom = params.get('chatRoom');

if (!params.has('name') || !params.has('chatRoom')) {
    window.location = 'index.html';
    throw new Error("The Name and Chat Room are required")
}

if ((name === ' ' || name === '' || name === null) ||
    (chatRoom === ' ' || chatRoom === '' || chatRoom === null)) {
    window.location = 'index.html';
    throw new Error("The Name and Chat Room are required")
}

let formEnviarElement = document.querySelector('#formEnviar');
let txtMensajeElement = document.querySelector('#txtMensaje');

const user = {
    name,
    chatRoom
}

socket.on('connect', () => {
    console.log('The connection is active')
})

socket.on('disconnect', () => {
    console.log('The connection is not active')
})

/*
* Input messages
*/
socket.on('leftChatMessage', (message) => {
    renderMessageRecived(message);
})

socket.on('usersList', (data) => {
    renderListUsers(data)
})

// Public messages recived
socket.on('publicChatMessage', (message) => {
    renderMessageRecived(message);
})

/*
* Output messages
*/
socket.emit('getInChat', user, function (resp) {
    renderListUsers(resp)
})


formEnviarElement.addEventListener('submit', (e) => {
    e.preventDefault();

    if (txtMensajeElement.value.trim() === '' || txtMensajeElement.value.trim === ' ') {
        return;
    }

    // Public messages sended
    socket.emit('sendChatMessage', { message: txtMensajeElement.value }, function (message) {

        txtMensajeElement.value = '';
        txtMensajeElement.focus();
        renderMessageSend(message);

    });
})

