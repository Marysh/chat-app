import {chatActionTypes, messageActionTypes, selectChat} from "./actionTypes";

export function chatReducer(state, action) {
    switch (action.type) {
        case chatActionTypes.FILL_CHATLIST:
            return Object.assign({}, state, {
                chatsList: action.chats
            });

        case chatActionTypes.CREATE_CHAT:
            return Object.assign({}, state, {
                chatsList: [...state.chatsList, action.newChat], // todo think!!!
            });

        case
        chatActionTypes.DELETE_CHAT:
            let refreshedChats = state.chatsList.filter(chat => chat.id !== action.chat.id);
            return Object.assign({}, state, {
                chatsList: refreshedChats,
                selectedChat: null,
            });
        case
        chatActionTypes.SELECT_CHAT:
            return Object.assign({}, state, {
                selectedChat: action.selectedChat
            });
        case
        chatActionTypes.ADD_MSG_TO_SELECT_CHAT:
            if (state.selectedChat.Messages.length > 0) {
                state.selectedChat.Messages = [...state.selectedChat.Messages, action.newMessage]
            } else {
                state.selectedChat.Messages = [action.newMessage]
            }
            return Object.assign({}, state);
        case
        chatActionTypes.UPDATE_LAST_MSG:
            // todo understand why chatsList[activeChat] === selectedChat
            let activeChat = state.chatsList.findIndex(chat => chat.id === state.selectedChat.id);
            state.chatsList[activeChat].Messages = [action.message];
            return {...state}
        case
        chatActionTypes.SELECT_USER:
            state.selectedUser = action.user;
            return Object.assign({}, state, {
                selectedUser: action.user
            });
        case
        chatActionTypes.DELETE_MSG:
            let msgAfterDelete = state.selectedChat.Messages.filter(msg => msg.id !== action.msgId);
            state.selectedChat.Messages = msgAfterDelete;
            return {...state}
        default:
            return state
    }
}

// export function msgReducer(state, action) {
//     switch (action.type) {
//         case
//         messageActionTypes.EDIT_MSG:
//             return {...state}
//         case
//         messageActionTypes.DELETE_MSG:
//            return state.chatsList.selectedChat.Messages.filter(msg => msg.id !== action);
//         default:
//             return state
//     }
// }


