const socket = io();

let params = (new URL(document.location)).searchParams;

if (!params.has('name') || !params.has('chatRoom')) {
    window.location = 'index.html';
    throw new Error("The Name and Chat Room are required")
}

let name = params.get('name');
let chatRoom = params.get('chatRoom');

if ((name === ' ' || name === '' || name === null) ||
    (chatRoom === ' ' || chatRoom === '' || chatRoom === null)) {
    window.location = 'index.html';
    throw new Error("The Name and Chat Room are required")
}

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
socket.on('leftChatMessage', (data) => {
    console.log(data)
})

socket.on('usersList', (data) => {
    console.log(data)
})

// Public messages recived
socket.on('publicChatMessage', (data) => {
    console.log(data)
})

// Private messages recived
socket.on('PrivateChatMessage', (data) => {
    console.log(data)
})


/*
* Output messages
*/
socket.emit('getInChat', user, function (resp) {
    console.log('Connected Users', resp)
})

// Public messages sended
socket.emit('sendChatMessage', { message: 'Hola como estan amigos' });

// Private messages sended
socket.emit('sendPrivateChatMessage', { id: '', message: 'Hola como estan' }, function (data) {
    console.log(data)
})

