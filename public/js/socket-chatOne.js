const socket = io();

// Se declararon en el archivo socket-chat.js
// let name = params.get('name');
// let chatRoom = params.get('chatRoom');

if (!params.has('id')) {
    window.location = 'index.html';
    throw new Error("The user id is required")
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

// Private messages recived
socket.on('PrivateChatMessage', (data) => {
    console.log(data)
})


/*
* Output messages
*/
socket.emit('getInChat', user, function (resp) {
    renderListUsers(resp)
})

// Private messages sended
socket.emit('sendPrivateChatMessage', { id: '', message: 'Hola como estan' }, function (data) {
    console.log(data)
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

