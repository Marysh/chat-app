import {chatReducer} from './reducers'


export const initialState = {
    chatState: {
        chatsList: [],
        selectedChat: null,
        messages: null,
    }

};

export function reducers(state = initialState, action) {
    return {
        chatState: chatReducer(state.chatState, action),
    }
}



