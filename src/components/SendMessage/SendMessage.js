import React from "react";
import {connect} from "react-redux";
import SocketAPI from "../../socketApi";
import styles from "./SendMessage.module.css"

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
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
        const {selectedChat, selectedUser} = this.props.chatState;
        if (msg) {
            SocketAPI.sendMessage(msg, selectedChat.id, selectedUser.id, new Date());
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
            <div className={styles.inputWrapper}>
                <input ref={this.inputRef} type="text" id='chatInput' placeholder={"Broadcast a message..."}
                       value={value} onChange={this.changeValue} onKeyPress={
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

