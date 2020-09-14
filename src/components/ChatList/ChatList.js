import React from "react";
import ChatRoom from "../ChatRoom/ChatRoom";
import {connect} from "react-redux";
import styles from "./ChatList.module.css"

class ChatList extends React.Component {

    render() {
        const {selectedChat, chatsList} = this.props.chatState;
        return (
            <div className={styles.chatList}>
                {chatsList.map(room => {
                    const active = selectedChat && selectedChat.id === room.id;
                    return (<ChatRoom room={room} key={room.id} active={active}/>)
                })}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chatState: state.chatState,
    }
}


export default connect(mapStateToProps, null)(ChatList);


