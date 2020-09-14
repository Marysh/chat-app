import {chatActionTypes} from "./actionTypes";

export function chatReducer(state, action) {
    switch (action.type) {
        case chatActionTypes.FILL_CHATLIST:
            return Object.assign({}, state, {
                chatsList: action.chats
            });

        case chatActionTypes.CREATE_CHAT:
            return Object.assign({}, state, {
                chatsList: [...state.chatsList, {...action.newChat}],
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
            let activeChat = state.chatsList.findIndex(chat => chat.id === state.selectedChat.id);
            state.chatsList[activeChat].Messages = action.message ? [action.message] : [];
            return {...state}
        case
        chatActionTypes.SELECT_USER:
            state.selectedUser = action.user;
            return Object.assign({}, state, {
                selectedUser: action.user
            });
        case
        chatActionTypes.DELETE_MSG:
            let msgsAfterDelete = state.selectedChat.Messages.filter(msg => msg.id !== action.msgId);
            state.selectedChat.Messages = msgsAfterDelete;
            return {...state}
        case
        chatActionTypes.EDIT_MSG:
            state.msgToEdit = state.selectedChat.Messages.find(msg => msg.id === action.msgId);
            return {...state}
        default:
            return state
    }
}

