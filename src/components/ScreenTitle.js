import React from "react";
import {connect} from "react-redux";

class ScreenTitle extends React.Component {

    render() {
        const {chatState} = this.props;
        return (
            <div className="topBar right">
                {chatState.selectedChat ? chatState.selectedChat.name : 'here will be chat name'}
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

