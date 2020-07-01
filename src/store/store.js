import {chatReducer, messagesReducer} from './reducers'


export const initialState = {
    chatState: {
        chatsList: [],
        selectedChat: null
    },
    messagesState: []

};

export function reducers(state = initialState, action) {
    return {
        chatState: chatReducer(state.chatState, action),
        messagesState: messagesReducer(state.messagesState, action),
    }
}



