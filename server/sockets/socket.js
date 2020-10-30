const { io } = require('../server');
const { createMessage } = require('./../utils/utils');

const Users = require('./../classes/users');

const users = new Users();

io.on('connection', (client) => {

    console.log('The connection is active');

    /*
    * Input messages
    */
    client.on('disconnect', () => {

        let deletedUser = users.deleteUser(client.id);

        if (deletedUser) {
            client.broadcast.to(deletedUser.chatRoom).emit('leftChatMessage', createMessage('', 'Admin', `${deletedUser.name} left the Chat Room`));
            client.broadcast.to(deletedUser.chatRoom).emit('usersList', users.getUserByChatRoom(deletedUser.chatRoom));
        }

    });
    
    client.on('getInChat', (user, callBack) => {

        if (!user.name || !user.chatRoom) {
            return callBack({  
                err: true,
                message: "The Name and Chat Room are required" 
            })
        }

        client.join(user.chatRoom);
        
        users.addUser(client.id, user.name, user.chatRoom);

        client.broadcast.to(user.chatRoom).emit('usersList', users.getUserByChatRoom(user.chatRoom));
        client.broadcast.to(user.chatRoom).emit('publicChatMessage', createMessage('', 'Admin', `${user.name} joined the Chat Room`));

        return callBack(users.getUserByChatRoom(user.chatRoom)); 
        
    })

    // Public messages recived
    client.on('sendChatMessage', (data, callBack) => {

        let user = users.getUser(client.id);
        let message = createMessage(client.id, user.name, data.message);
        client.broadcast.to(user.chatRoom).emit('publicChatMessage', message);

        return callBack(message);
    })

    // Ptivate messages recived
    client.on('sendPrivateChatMessage', (data, callBack) => {

        let user = users.getUser(client.id);
        let userToSend = users.getUser(data.id);

        if (!userToSend) {
            return callBack({
                err: true,
                message: 'The message could not be sent'
            })
        }

        let message = createMessage(user.id, user.name, data.message);

        client.broadcast.to(userToSend.id).emit('PrivateChatMessage', message);

        return callBack({
            err: false,
            message: 'The message was sended'
        });

    })

    /*
    * Output messages
    */

});