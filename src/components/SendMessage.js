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
        if (msg) {
            fetch('http://localhost:3000/api/messages/add', {
                method: 'POST',
                body: JSON.stringify({msg, userId: 1, chatRoomId: 1}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(response => {
                    console.log(response);
                    this.props.addMessage(response);
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

export default connect(null, mapDispatchToProps)(SendMessage);

