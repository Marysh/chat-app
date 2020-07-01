import React from "react";

class Message extends React.Component {

    render() {
        const {msg} = this.props;
        return (
                <div>
                    <div className="msg dark">{msg.text}</div>
                </div>
        );
    }

}

export default Message;
