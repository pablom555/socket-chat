// {
//     id: 'sfsfdfdfsdfffdff',
//     name: 'Pablo MArtinez',
//     chatRoom: 'sala1'
// }

class Users {

    constructor() {

        this.users = [];
    }

    addUser(id, name, chatRoom) {

        let user = {id, name, chatRoom};
        this.users.push(user);

        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);        
    }

    getUsers() {
        return this.users;
    }

    getUserByChatRoom(chatRoom) {
        return this.users.filter(user => user.chatRoom == chatRoom);
    }

    deleteUser(id) {

        let deletedUser = this.getUser(id);
        this.users = this.users.filter(user => user.id != id);

        return deletedUser;
    }

}

module.exports = Users;