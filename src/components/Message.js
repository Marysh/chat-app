import React from "react";

class Message extends React.Component {

    render() {
        const {msg, position} = this.props;
        const messageWrap = {
            display: "flex",
            justifyContent: position,
            marginBottom: "5px"
        };

        return (
            <div className="messageWrap" style={messageWrap}>
                <div className="msg dark">{msg.text}</div>
            </div>

        )
    }

}


export default Message;
