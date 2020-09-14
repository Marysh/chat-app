import React from "react";
import Message from "../Message/Message";
import {connect} from "react-redux";
import ContextMenu from "../ContextMenu/ContextMenu";
import {deleteMsg, updateLastMessage} from "../../store/actionTypes";
import Api from "../../services/chatService";
import styles from "./Screen.module.css"

class Screen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuIsShown: false,
            coordinates: [],
            action: null,
            selectedMsgId: null
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
    }

    handleClick = () => {
        const {menuIsShown} = this.state;
        if (menuIsShown) {
            this.setState({
                menuIsShown: !menuIsShown
            })
        }
    }

    handleContextMenu = (e, msgId) => {
        e.preventDefault();
        this.setState({
            menuIsShown: !this.state.menuIsShown,
            coordinates: [e.pageX, e.pageY],
            selectedMsgId: msgId
        })
    }

    handleMenuItemClick = (actionKey) => {
        const {selectedMsgId, menuIsShown} = this.state;
        const {deleteMsg, updateLastMessage, chatState} = this.props;
        if (actionKey === "Delete") {
            Api.removeMsg(selectedMsgId)
                .then(() => {
                    deleteMsg(selectedMsgId);
                    const lastMsg = chatState.selectedChat.Messages.length > 0 ?
                        chatState.selectedChat.Messages[chatState.selectedChat.Messages.length - 1] : null
                    updateLastMessage(lastMsg)
                    this.setState({
                        menuIsShown: !menuIsShown
                    })
                })
        }
    }

    render() {
        const {selectedChat, selectedUser} = this.props.chatState;
        const {menuIsShown, coordinates} = this.state;
        const actions = ["Delete"];
        let position;
        return (
            <div className={styles.screen}>
                {selectedChat &&
                <div>
                    {
                        selectedChat.Messages.map(msg => {
                            position = msg.userId === selectedUser.id ? "right" : 'left';
                            return (
                                <React.Fragment key={msg.id}>
                                    <Message
                                        msg={msg}
                                        position={position}
                                        handleContext={(e) => {
                                            this.handleContextMenu(e, msg.id)
                                        }}/>
                                    {
                                        menuIsShown &&
                                        <ContextMenu actions={actions} handleMenuClick={this.handleMenuItemClick}
                                                     coordinates={coordinates}/>
                                    }
                                </React.Fragment>
                            )
                        })
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

function mapDispatchToProps(dispatch) {
    return {
        deleteMsg: (msgId) => {
            dispatch(deleteMsg(msgId))
        },
        updateLastMessage: (msg) => {
            dispatch(updateLastMessage(msg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

