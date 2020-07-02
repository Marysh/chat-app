import React from "react";
import Message from "./Message";
import {connect} from "react-redux";
import {getMessages} from "../store/actionTypes";

class Screen extends React.Component {

    componentDidMount() {
        fetch('http://localhost:3000/api/messages/get')
            .then(result => result.json())
            .then(result => {
                this.props.getMessages(result)
            });
    }

    render() {
        const {selectedChat} = this.props.chatState;
        let position;
        return (
            <div className="screen">
                {selectedChat &&
                <div>
                    {
                        selectedChat.Messages && selectedChat.Messages.map(msg => (
                            < Message position={position} msg={msg} key={msg.id}/>))
                    }
                </div>
                // < Message position={position} msg={msg} key={msg.id}/>))
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getMessages: (messages) => {
            dispatch(getMessages(messages))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Screen);

