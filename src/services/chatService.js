const url = 'http://localhost:3000';

export default class Api {
    static getUsersForNewChat(id) {
        return fetch(`http://localhost:3000/api/chat/getUsers/${id}`)
            .then(result => result.json())
    }

    static createNewChat(user, owner) {
        return fetch(url + '/api/chat/start', {
            method: 'POST',
            body: JSON.stringify({ownerId: owner, newUserId: user.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    static getInfo(chatId) {
        return fetch(url + `/api/chat/getInfo/${chatId}`).then(res => res.json());
    }

    static getUsers() {
        return fetch(`http://localhost:3000/api/chat/getUsers`)
            .then(users => users.json())
    }

    static addMessage(msg, chatListId) {
        return fetch('http://localhost:3000/api/messages/add', {
            method: 'POST',
            body: JSON.stringify({msg, userId: 2, chatId: chatListId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(newMsg => newMsg.json())
    }

}
