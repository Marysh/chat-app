import React from "react";
import {addMessage} from "../store/actionTypes";
import {connect} from "react-redux";

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    changeValue(e) {
        this.setState({
            value: e.target.value
        })
    }


    handleSend(msg) {
        const chatListId = this.props.chatState.selectedChat.id;
        if (msg) {
            fetch('http://localhost:3000/api/messages/add', {
                method: 'POST',
                body: JSON.stringify({msg, userId: 2, chatId: chatListId}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((newMsg) => {
                    return newMsg.json()
                })
                .then(newMsg => {
                    this.props.addMessage(newMsg);
                });
        }

        document.getElementById("chatInput").value = "";

    }


    render() {
        const {value} = this.state;
        return (
            <div className="inputWrapper">
                <input type="text" id='chatInput' placeholder="Broadcast a message..." onChange={(e) => {
                    this.changeValue(e);
                }}/>
                <button onClick={(e) => {
                    this.handleSend(value)
                }}>Send
                </button>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addMessage: (newMessage) => {
            dispatch(addMessage(newMessage))
        }
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);

