import React from "react";
import {connect} from "react-redux";
import {deleteChat, selectChat} from "../store/actionTypes";
import Api from "../services/chatService";

class ChatRoom extends React.Component {

    handleChatDelete() {
        Api.removeChatRoom(this.props.room.id)
            .then(res => {
                this.props.deleteChat(res);
            })
    };

    handleChatSelect(chat) {
        this.props.selectChat(chat);

    };

    render() {
        const {room, active} = this.props;
        const chatRoom = {
            borderBottom: "1px solid grey",
            padding: "10px 15px",
            minHeight: "45px",
            backgroundColor: active ? "#fff" : 'transparent',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        };

        let lastMessage;
        let chatName = room.Users.length > 1 ? room.Users[1].name : room.Users[0].name;
        if (room.Messages && room.Messages.length !== 0) {
            lastMessage = room.Messages[room.Messages.length - 1].text;
        }
        return (
            <div style={chatRoom} onClick={() => {
                this.handleChatSelect(room);
            }}>
                <div style={chatRoomName}>
                    <div
                        style={{"fontWeight": "700"}}>{chatName}</div>
                    <button className="fa fa-trash" style={{"background": "none"}} onClick={(e) => {
                        e.stopPropagation();
                        this.handleChatDelete();
                    }}/>
                </div>
                {lastMessage}
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
        }
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }

}

const chatRoomName = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
