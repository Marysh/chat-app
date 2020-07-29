import React from "react";
import Message from "./Message";
import {connect} from "react-redux";

class Screen extends React.PureComponent {

    componentDidMount() {
    }
    render() {
        const {selectedChat} = this.props.chatState;
        return (
            <div className="screen">
                {selectedChat &&
                <div>
                    {
                        selectedChat.Messages && selectedChat.Messages.map(msg => (
                            // todo position should accept "left", "right". Position itself is internal implementation
                            <Message
                                position={msg.userId === selectedChat.ownerId ? 'flex-end' : 'flex-start'}
                                msg={msg} key={msg.id}/>))
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

