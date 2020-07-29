import {chatActionTypes} from "./actionTypes";

export function chatReducer(state, action) {
    switch (action.type) {
        case chatActionTypes.FILL_CHATLIST:
            return Object.assign({}, state, {
                chatsList: action.chats
            });

        case chatActionTypes.CREATE_CHAT:
            return Object.assign({}, state, {
                chatsList: [...state.chatsList, action.newChat],
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
            if(state.selectedChat.Messages) {
                state.selectedChat.Messages = [...state.selectedChat.Messages, action.newMessage]
            } else {
                state.selectedChat.Messages = [action.newMessage]
            }
            return Object.assign({}, state);
        case
        chatActionTypes.UPDATE_LAST_MSG:
            // todo change to object assign
            let activeChat = state.chatsList.find(chat => chat.id === state.selectedChat.id);
            activeChat.Messages = [action.message];
            return {...state};
        case
        chatActionTypes.SELECT_USER:
            // todo change to object assign
            state.selectedUser = action.user;
            return {...state};

        default:
            return state
    }
}


