import React from "react";
import {addMessage, updateLastMessage} from "../store/actionTypes";
import {connect} from "react-redux";

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.inputRef = React.createRef();
    }

    changeValue(e) {
        if (e.target.value !== ' ') {
            this.setState({
                value: e.target.value
            })
        }
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
                    this.props.updateLastMessage(newMsg);
                });
        }

        this.inputRef.current.value = "";
        this.setState({
            value: "",
        });
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSend(this.state.value);
        }
    }


    render() {
        const {value} = this.state;
        return (
            <div className="inputWrapper">
                <input ref={this.inputRef} type="text" id='chatInput' placeholder="Broadcast a message..."
                       onChange={(e) => {
                           this.changeValue(e);
                       }} onKeyPress={(e) => {
                    this.handleKeyPress(e)
                }
                }/>
                <button disabled={!this.state.value} onClick={(e) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);

