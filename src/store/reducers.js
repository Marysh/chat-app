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
            if (action.selectedChat.Users.length > 1) {
                action.selectedChat.Users = action.selectedChat.Users.filter(user => user.id !== action.selectedChat.ownerId);
            }
            state.selectedChat = action.selectedChat;
            state.messages = action.selectedChat.Messages ? action.selectedChat.Messages : null;
            return {...state};
        case
        chatActionTypes.ADD_MSG_TO_SELECT_CHAT:
            return Object.assign({}, state, {
                messages: state.messages ? [...state.messages, action.newMessage] : [action.newMessage],
            });
        case
        chatActionTypes.UPDATE_LAST_MSG:
            let activeChat = state.chatsList.find(chat => chat.id === state.selectedChat.id);
            if (activeChat.Messages) {
                activeChat.Messages.push(action.message);
            }
            return {...state};
        case
        chatActionTypes.SELECT_USER:
            state.selectedUser = action.userId;
            return {...state};

        default:
            return state
    }
}


