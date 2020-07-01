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
        const {messagesState, chatState} = this.props;

        return (
            <div className="screen">
                {
                    // chatState.selectedChat.
                }
                {messagesState.map(msg => (
                    <Message msg={msg} key={msg.id}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messagesState: state.messagesState,
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

