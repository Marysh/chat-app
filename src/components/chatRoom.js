import React from "react";

class ChatRoom extends React.Component {

    render() {
        const {name} = this.props;
        return (
            <div className="chatRoom">
                <div style={{"fontWeight": "700"}}>{name}</div>
                <div>last message</div>
            </div>
        );
    }

}

export default ChatRoom;
