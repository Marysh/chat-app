import {chatActionTypes} from "./actionTypes";
import {messageActionTypes} from "./actionTypes";

export function chatReducer(state, action) {
    switch (action.type) {
        case chatActionTypes.FILL_CHATLIST:
            return Object.assign({}, state, {
                chatsList: action.chats
            });

        case chatActionTypes.CREATE_CHAT:
            return Object.assign({}, state, {
                chatsList: [...state.chatsList, action.newChat]
            });

        case
        chatActionTypes.DELETE_CHAT:
            let refreshedChats = state.chatsList.filter(chat => chat.id !== action.chat.id);
            return Object.assign({}, state, {
                chatsList: refreshedChats
            });
        case
        chatActionTypes.SELECT_CHAT:
            return Object.assign({}, state, {
                selectedChat: action.selectedChat
            });

        default:
            return state
    }
}

export function messagesReducer(state, action) {
    switch (action.type) {
        case messageActionTypes.GET_MESSAGES:
            return action.messages;

        case messageActionTypes.ADD_MESSAGE:
            return [...state, action.newMessage];

        default:
            return state
    }
}

