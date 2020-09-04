export const chatActionTypes = {
    FILL_CHATLIST: 'FILL_CHATLIST',
    CREATE_CHAT: 'CREATE_CHAT',
    DELETE_CHAT: 'DELETE_CHAT',
    SELECT_CHAT: 'SELECT_CHAT',
    SELECT_USER: 'SELECT_USER',
    ADD_MSG_TO_SELECT_CHAT: 'ADD_MSG_TO_SELECT_CHAT',
    UPDATE_LAST_MSG: 'UPDATE_LAST_MSG',
    EDIT_MSG: 'EDIT_MSG',
    DELETE_MSG: 'DELETE_MSG',
};

export const messageActionTypes = {
    DELETE_MSG: 'DELETE_MSG',
    EDIT_MSG: 'EDIT_MSG',
}

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

export function addMessage(newMessage) {
    return {type: chatActionTypes.ADD_MSG_TO_SELECT_CHAT, newMessage}
}

export function updateLastMessage(message) {
    return {type: chatActionTypes.UPDATE_LAST_MSG, message}
}

export function selectUser(user) {
    return {type: chatActionTypes.SELECT_USER, user}
}

export function deleteMsg(msgId) {
    return {type: chatActionTypes.DELETE_MSG, msgId}
}


export function editMsg(msgId) {
    return {type: chatActionTypes.EDIT_MSG, msgId}
}

// export function deleteMsg(msgId) {
//     return {type: messageActionTypes.DELETE_MSG, msgId}
// }
//
//
// export function editMsg(msgId) {
//     return {type: messageActionTypes.EDIT_MSG, msgId}
// }
