import React from "react";
import {addMessage} from "../store/actionTypes";
import {connect} from "react-redux";

class SendMessage extends React.Component {
    // todo change React.Component to React.PureComponent

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

        //todo try use destructurization everywhere;
        const chatListId = this.props.chatState.selectedChat.id;
        // todo create service for request to server;

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
        // todo use React.createRef() instead document.getElementById("chatInput");

    }


    render() {
        const {value} = this.state;
        return (
            <div className="inputWrapper">
                <input type="text" id='chatInput' placeholder="Broadcast a message..." onChange={(e) => {
                    this.changeValue(e);
                    // todo you can pass reference this.changeValue to method onChange;
                }}/>
                <button onClick={() => {
                    // todo you can not be passing value as argument to this.handleSend;
                    // todo pass reference on the function,don't calling her in callback;
                    this.handleSend(value);
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

