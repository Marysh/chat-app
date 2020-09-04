import React from "react";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
import Screen from "./Screen";
import ScreenTitle from "./ScreenTitle";
import SendMessage from "./SendMessage";
import {addMessage, fillChatList, selectChat, updateLastMessage} from "../store/actionTypes";
import {connect} from "react-redux";
import Api from "../services/chatService";
import SocketAPI from "../socketApi";


class Messenger extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getUserRooms(this.props.user);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.getUserRooms(this.props.user);
        }

        const {selectedChat} = this.props.chatState;
        const {selectedChat: previousSelectedChat} = prevProps.chatState;

        if (selectedChat === null && previousSelectedChat) {
            SocketAPI.disconnect();
        } else if (selectedChat && previousSelectedChat === null) {
            SocketAPI.initConnection(selectedChat, this.onMessageReceive);
        } else if (selectedChat && previousSelectedChat && selectedChat.id !== previousSelectedChat.id) {
            SocketAPI.disconnect();
            SocketAPI.initConnection(selectedChat, this.onMessageReceive);
        }
    }

    onMessageReceive = (newMessage) => {
        this.props.addMessage(newMessage);
        this.props.updateLastMessage(newMessage);
    };

    getUserRooms(userId) {
        Api.getUserRooms(userId)
            .then(chatRooms => {
                this.props.fillChatList(chatRooms);
                if (chatRooms.length !== 0) {
                    return Api.getInfo(chatRooms[0]);
                }
                return null;
            })
            .then(chatInfo => {
                this.props.selectChat(chatInfo)
            })
            .catch(err => {
                console.log(err);
            })

    };

    render() {
        const {user, chatState} = this.props;
        return (
            <div className="messengerWrapper">
                <div className="leftBar-wrap">
                    <AddChat ownerId={user}/>
                    <ChatList/>
                </div>

                <div className="rightBar-wrap">
                    <ScreenTitle/>
                    <Screen/>
                    {
                        chatState.selectedChat && <SendMessage/>
                    }
                </div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fillChatList: (chats) => {
            dispatch(fillChatList(chats))
        },
        selectChat: (chat) => {
            dispatch(selectChat(chat))
        },
        addMessage: (newMessage) => {
            dispatch(addMessage(newMessage))
        },
        updateLastMessage: (message) => {
            dispatch(updateLastMessage(message))
        }
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);


