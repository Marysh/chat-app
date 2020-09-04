import React from "react";
import ChatRoom from "./ChatRoom";
import {connect} from "react-redux";

class ChatList extends React.Component {

    render() {
        const {selectedChat, chatsList} = this.props.chatState;
        return (
            <div style={chatList}>
                {chatsList.map(room => {
                    const active = selectedChat && selectedChat.id === room.id;
                    return (<ChatRoom room={room} key={room.id} active={active}/>)
                })}
            </div>
        );
    }

}

const chatList = {
    height: "90%",
    overflowY: "auto"
};


function mapStateToProps(state) {
    return {
        chatState: state.chatState,
    }
}


export default connect(mapStateToProps, null)(ChatList);


