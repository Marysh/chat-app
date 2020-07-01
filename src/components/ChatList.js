import React from "react";
import ChatRoom from "./ChatRoom";
import {connect} from "react-redux";
import {fillChatList} from "../store/actionTypes";

class ChatList extends React.Component {

    constructor(props) {
        super(props);
        fetch('http://localhost:3000/api/chat/getRooms')
            .then(result => result.json())
            .then(result => {
                this.props.fillChatList(result);
            });
    }


    render() {
        return (
            <div style={{
                "height": "90%",
                "overflowY": "auto"
            }}>
                {this.props.chatState.chatsList.map(room => (
                    <ChatRoom room={room} key={room.id}/>
                ))}
            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        chatState: state.chatState,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fillChatList: (chats) => {
            dispatch(fillChatList(chats))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);


