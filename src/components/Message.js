import React from "react";

class Message extends React.Component {

    render() {
        const {msg, userId, position} = this.props;

        const messageWrap = {
            display: "flex",
            justifyContent: position,
            marginBottom: "5px"
        };

        return (
            // userId === urlUserId => justify-content:flex-end
            <div className="messageWrap" style={messageWrap}>
                <div className="msg dark">{msg.text}</div>
            </div>

        )
    }

}


export default Message;
