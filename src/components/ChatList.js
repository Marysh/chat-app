import React from "react";
import ChatRoom from "./ChatRoom";
import {connect} from "react-redux";
import {selectChat} from "../store/actionTypes";

class ChatList extends React.Component {
    // todo change React.Component to React.PureComponent

    render() {
        const {selectedChat} = this.props.chatState;
        return (
            <div style={{
                "height": "90%",
                "overflowY": "auto"
            }}>
                {this.props.chatState.chatsList.map(room => {
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


function mapDispatchToProps(dispatch) {
    return {
        selectChat: (chats) => {
            dispatch(selectChat(chats))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);


