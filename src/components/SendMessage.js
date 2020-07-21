import React from "react";
import {addMessage, updateLastMessage} from "../store/actionTypes";
import {connect} from "react-redux";
import Api from "../services/chatService";

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.inputRef = React.createRef();
    }

    changeValue = (e) => {
        if (e.target.value !== ' ') {
            this.setState({
                value: e.target.value
            })
        }
    };


    handleSend = (msg) => {
        const chatListId = this.props.chatState.selectedChat.id;
        if (msg) {
            Api.addMessage(msg, chatListId)
                .then(newMsg => {
                    this.props.addMessage(newMsg);
                    this.props.updateLastMessage(newMsg);
                });
        }

        this.inputRef.current.value = "";
        this.setState({
            value: "",
        });
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleSend(this.state.value);
        }
    };


    render() {
        const {value} = this.state;
        return (
            <div className="inputWrapper">
                <input ref={this.inputRef} type="text" id='chatInput' placeholder="Broadcast a message..."
                       onChange={this.changeValue} onKeyPress={
                    this.handleKeyPress
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

