import React from "react";
import {connect} from "react-redux";

class ScreenTitle extends React.Component {
    // todo change React.Component to React.PureComponent

    render() {
        const {chatState} = this.props;
        return (
            <div className="topBar right">
                {chatState.selectedChat ? chatState.selectedChat.name : <div className="lds-ellipsis">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>}
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

