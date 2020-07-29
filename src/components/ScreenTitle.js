import React from "react";
import {connect} from "react-redux";

class ScreenTitle extends React.Component {

    render() {
        const {selectedChat} = this.props.chatState;
        let name;
        if (selectedChat) {
            name = selectedChat.Users.length > 1 ? selectedChat.Users[1].name : selectedChat.Users[0].name
        }
        return (
            <div className="topBar right">
                {name ||
                <div className="lds-ellipsis">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                }
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

