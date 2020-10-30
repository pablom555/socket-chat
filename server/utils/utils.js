const createMessage = (id, name, message) => {

    return {
        id,
        name,
        message,
        date: new Date().getTime()
    }

}

module.exports = {
    createMessage
}