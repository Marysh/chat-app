import React from "react";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
import Screen from "./Screen";
import ScreenTitle from "./ScreenTitle";
import SendMessage from "./SendMessage";
import {fillChatList, selectChat} from "../store/actionTypes";
import {connect} from "react-redux";
import Api from "../services/chatService";


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
            console.log('disconnect socket', selectedChat);
        } else if (selectedChat && previousSelectedChat === null) {
            console.log('connect', selectedChat);
        } else if(selectedChat && previousSelectedChat && selectedChat !== previousSelectedChat){
            console.log('disconnect and connect new socket', selectedChat);
        }
    }

    getUserRooms(userId) {
        //todo move to service
        fetch(`http://localhost:3000/api/chat/getRooms/${userId}`)
            .then(chatRooms => {
                return chatRooms.json();
            })
            .then(chatRooms => {
                this.props.fillChatList(chatRooms);
                if(chatRooms.length !== 0) {
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
                    <AddChat owner={user}/>
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
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);


