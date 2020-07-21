import React from "react";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
import Screen from "./Screen";
import ScreenTitle from "./ScreenTitle";
import SendMessage from "./SendMessage";
import {fillChatList, selectChat} from "../store/actionTypes";
import {connect} from "react-redux";


class Messenger extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getUserRooms(this.props.user);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            this.getUserRooms(this.props.user);
        }
    }

    getUserRooms(userId) {
        fetch(`http://localhost:3000/api/chat/getRooms/${userId}`)
            .then(chatRooms => chatRooms.json())
            .then(chatRooms => {
                this.props.fillChatList(chatRooms);
                this.props.selectChat(chatRooms[0]);

                // if (chatRooms.length > 0) {
                //     return fetch(`http://localhost:3000/api/chat/getInfo/${chatRooms[0].id}`)
                // }
            })
        // .then(chatInfo => {
        //     if (chatInfo) {
        //         return chatInfo.json();
        //     }
        // })
        // .then(chatInfo => {
        //         if (chatInfo)
        //             this.props.selectChat(chatInfo)
        //     }
        // )

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


