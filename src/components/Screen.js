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
        // todo let position,is this variable always undefined?
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

//todo remove fn if you don't use
function mapDispatchToProps(dispatch) {
    return {
        // getMessages: (messages) => {
        //     dispatch(getMessages(messages))
        // }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Screen);

