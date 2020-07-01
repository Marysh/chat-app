export const chatActionTypes = {
    FILL_CHATLIST: 'FILL_CHATLIST',
    CREATE_CHAT: 'CREATE_CHAT',
    DELETE_CHAT: 'DELETE_CHAT',
    SELECT_CHAT: 'SELECT_CHAT',
    SELECT_USER: 'SELECT_USER',
};

export const messageActionTypes = {
    GET_MESSAGES: 'GET_MESSAGES',
    ADD_MESSAGE: 'ADD_MESSAGE'
};

export function createChat(newChat) {
    return {type: chatActionTypes.CREATE_CHAT, newChat}
}

export function deleteChat(chat) {
    return {type: chatActionTypes.DELETE_CHAT, chat}
}

export function selectChat(selectedChat) {
    return {type: chatActionTypes.SELECT_CHAT, selectedChat}
}

export function fillChatList(chats) {
    return {type: chatActionTypes.FILL_CHATLIST, chats}
}

export function getMessages(messages) {
    return {type: messageActionTypes.GET_MESSAGES, messages}
}

export function addMessage(newMessage) {
    return {type: messageActionTypes.ADD_MESSAGE, newMessage}
}


