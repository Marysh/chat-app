import React from "react";
import {addMessage, updateLastMessage} from "../store/actionTypes";
import {connect} from "react-redux";
import SocketAPI from "../api";

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.inputRef = React.createRef();
    }

    changeValue = (e) => {
        if (e.target.value.trim() !== '') {
            this.setState({
                value: e.target.value
            })
        }
    };


    handleSend = (msg) => {
        const chatId = this.props.chatState.selectedChat.id;
        if (msg) {
            SocketAPI.sendMessage(msg, chatId);
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


function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}

export default connect(mapStateToProps)(SendMessage);

