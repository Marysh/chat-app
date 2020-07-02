import React from "react";
import {connect} from "react-redux";
import {deleteChat, selectChat} from "../store/actionTypes";

class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor: "transparent"
        }
    }

    handleChatDelete(id) {
        fetch(`http://localhost:3000/api/chat/remove/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(res => {
                this.props.deleteChat(res);
            })
    };

    handleChatSelect(chat) {
        fetch(`http://localhost:3000/api/chat/getInfo/${chat.id}`)
            .then((res) => res.json())
            .then(res => {
                this.props.selectChat(res);
            });
    }

    changeBg() {
        if (this.state.bgColor === "transparent") {
            this.setState({bgColor: "#ccc"})
        }
    }

    render() {
        const {room, active} = this.props;
        const chatRoom = {
            borderBottom: "1px solid grey",
            padding: "10px 15px",
            backgroundColor: active ? "#ccc" : 'transparent'
        };

        return (
            <div style={chatRoom} onClick={() => {
                this.handleChatSelect(room);
            }}>
                <div style={chatRoomName}>
                    <div style={{"fontWeight": "700"}}>{room.name}</div>
                    <button className="fa fa-trash" style={{"background": "none"}} onClick={(e) => {
                        e.stopPropagation();
                        this.handleChatDelete(room.id);
                    }}/>
                </div>
                <div>last message</div>
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

const chatRoomName = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

export default connect(null, mapDispatchToProps)(ChatRoom);
