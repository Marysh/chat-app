const url = 'http://localhost:3000';

export default class Api {
    static getUsersForNewChat(id) {
        return fetch(url + `/api/chat/getUsers/${id}`)
            .then(result => result.json())
    }

    static createNewChat(user, ownerId) {
        return fetch(url + '/api/chat/start', {
            method: 'POST',
            body: JSON.stringify({ownerId: ownerId, newUserId: user.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        });
    }

    static getInfo(chat) {
        return fetch(url + `/api/chat/getInfo/${chat.id}`).then(res => res.json());
    }

    static getUsers() {
        return fetch(url + `/api/chat/getUsers`)
            .then(users => users.json())
    }

    static getUserRooms(userId) {
        return fetch(url + `/api/chat/getRooms/${userId}`)
            .then(chatRooms => {
                return chatRooms.json();
            })
    }

    static removeChatRoom(id) {
        return fetch(url + `/api/chat/remove/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
    }

    static removeMsg(id) {
        return fetch(url + `/api/chat/removeMsg/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
    }

}
