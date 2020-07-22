const url = 'http://localhost:3000';

export default class Api {
    static getUsersForNewChat(id) {
        return fetch(url + `/api/chat/getUsers/${id}`)
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

    static getInfo(chat) {
        return fetch(url + `/api/chat/getInfo/${chat.id}`).then(res => res.json());
    }

    static getUsers() {
        return fetch(url + `/api/chat/getUsers`)
            .then(users => users.json())
    }

    static addMessage(msg, chatListId) {
        return fetch(url + '/api/messages/add', {
            method: 'POST',
            body: JSON.stringify({msg, userId: 2, chatId: chatListId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(newMsg => newMsg.json())
    }

    static removeChatRoom(id) {
        return fetch(`http://localhost:3000/api/chat/remove/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
    }

}
