import React from "react";
import {connect} from "react-redux";

class ScreenTitle extends React.Component {

    render() {
        const {chatState} = this.props;
        let chatMate;
        if (chatState.selectedChat) {
            chatMate = chatState.selectedChat.Users.find(user => user.id !== chatState.selectedUser.id).name;
        }
        return (
            <div className="topBar right">
                {chatMate}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chatState: state.chatState,

    }
}

export default connect(mapStateToProps, null)(ScreenTitle);

