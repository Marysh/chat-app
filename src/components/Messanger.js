import React from "react";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
import Screen from "./Screen";
import ScreenTitle from "./ScreenTitle";
import SendMessage from "./SendMessage";
import {fillChatList, selectChat} from "../store/actionTypes";
import {connect} from "react-redux";


class Messenger extends React.Component {

    constructor(props) {
        super(props);
        fetch('http://localhost:3000/api/chat/getRooms')
            .then(chatRooms => chatRooms.json())
            .then(chatRooms => {
                this.props.fillChatList(chatRooms);
                if (chatRooms.length > 0) {
                    return fetch(`http://localhost:3000/api/chat/getInfo/${chatRooms[0].id}`)
                }
            })
            .then(chatInfo => {
                if (chatInfo) {
                    return chatInfo.json();
                }
            })
            .then(chatInfo => {
                if (chatInfo) {
                    this.props.selectChat(chatInfo)
                }
            })
        // todo create service for request to server;
    }

    render() {
        return (
            <div className="messengerWrapper">
                <div className="leftBar-wrap">
                    <AddChat/>
                    <ChatList/>
                </div>

                <div className="rightBar-wrap">
                    <ScreenTitle/>
                    <Screen/>
                    <SendMessage/>
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
        selectChat: (chats) => {
            dispatch(selectChat(chats))
        },
    }
}

export default connect(null, mapDispatchToProps)(Messenger);


