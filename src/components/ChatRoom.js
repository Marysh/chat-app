import React from "react";
import {connect} from "react-redux";
import {deleteChat, selectChat} from "../store/actionTypes";

class ChatRoom extends React.Component {

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
                console.log(res);
                this.props.selectChat(res);
            });
    }

    render() {
        const {room} = this.props;
        return (
            <div className="chatRoom" onClick={() => {
                this.handleChatSelect(room)
            }}>
                <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
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

export default connect(null, mapDispatchToProps)(ChatRoom);
