import React from "react";
import Message from "./Message";
import {connect} from "react-redux";

class Screen extends React.Component {
    // todo change React.Component to React.PureComponent

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    render() {
        const {selectedChat, messages} = this.props.chatState;
        let position;
        return (
            <div className="screen">
                {selectedChat &&
                <div>
                    {
                        messages && messages.map(msg => (
                            < Message position={position} msg={msg} key={msg.id}/>))
                    }
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState,
    }
}

export default connect(mapStateToProps, null)(Screen);

