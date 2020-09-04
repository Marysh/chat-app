import {chatReducer, msgReducer} from './reducers'


export const initialState = {
    chatState: {
        chatsList: [],
        selectedChat: null,
        selectedUser: null,
        msgId: null
    },
    // msgState: {
    //     msgId: null
    // }

};

export function reducers(state = initialState, action) {
    return {
        chatState: chatReducer(state.chatState, action),
        // msgState: msgReducer(state.msgState, action)
    }
}



