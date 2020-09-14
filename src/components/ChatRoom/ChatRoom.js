import React from "react";
import {connect} from "react-redux";
import {deleteChat, selectChat, updateLastMessage} from "../../store/actionTypes";
import Api from "../../services/chatService";
import styles from "./Chatroom.module.css"

class ChatRoom extends React.Component {
    handleChatDelete() {
        Api.removeChatRoom(this.props.room.id)
            .then(res => {
                this.props.deleteChat(res);
            })
    };

    handleChatSelect(chat) {
        Api.getInfo(chat).then(chat => {
            this.props.selectChat(chat);
        });
    };

    render() {
        const {room, active} = this.props;
        const bgColor = active ? styles.whiteBg : styles.transparent;
        let chatName = room.Users.length > 1 ? room.Users[1].name : room.Users[0].name; // chat mate
        let lastMessage;
        if (room.Messages.length > 0) {
            lastMessage = room.Messages[room.Messages.length - 1].text;
        }
        return (
            <div className={`${styles.chatRoom} ${bgColor}`} onClick={() => {
                this.handleChatSelect(room);
            }}>
                <div className={styles.chatRoomName}>
                    <div
                    >{chatName}</div>
                    <button className={`fa fa-trash ${styles.chatRoomBtn}`} onClick={(e) => {
                        e.stopPropagation();
                        this.handleChatDelete();
                    }}/>
                </div>
                <div className={styles.preview_msg}>{lastMessage}</div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        deleteChat: (chat) => {
            dispatch(deleteChat(chat))
        },
        selectChat: (chat) => {
            dispatch(selectChat(chat))
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


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
