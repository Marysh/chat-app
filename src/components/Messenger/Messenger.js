import React from "react";
import AddChat from "../AddChat/AddChat";
import ChatList from "../ChatList/ChatList";
import Screen from "../Screen/Screen";
import ScreenTitle from "../ScreenTitle/ScreenTitle";
import SendMessage from "../SendMessage/SendMessage";
import {addMessage, fillChatList, selectChat, updateLastMessage} from "../../store/actionTypes";
import {connect} from "react-redux";
import Api from "../../services/chatService";
import SocketAPI from "../../socketApi";
import styles from "./Messenger.module.css"


class Messenger extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getUserRooms(this.props.userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userId !== this.props.userId) {
            this.getUserRooms(this.props.userId);
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
        const {addMessage, updateLastMessage} = this.props;
        addMessage(newMessage);
        updateLastMessage(newMessage);
    };

    getUserRooms(userId) {
        const {fillChatList, selectChat} = this.props;
        Api.getUserRooms(userId)
            .then(chatRooms => {
                fillChatList(chatRooms);
                if (chatRooms.length !== 0) {
                    return Api.getInfo(chatRooms[0]);
                }
                return null;
            })
            .then(chatInfo => {
                selectChat(chatInfo)
            })
            .catch(err => {
                console.log(err);
            })

    };

    render() {
        const {userId, chatState} = this.props;
        return (
            <div className={styles.messengerWrapper}>
                <div className={styles.leftBar_wrap}>
                    <AddChat ownerId={userId}/>
                    <ChatList/>
                </div>

                <div className={styles.rightBar_wrap}>
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


