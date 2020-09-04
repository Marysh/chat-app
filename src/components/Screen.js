import React from "react";
import Message from "./Message";
import {connect} from "react-redux";
import ContextMenu from "./ContextMenu";
import {deleteMsg, editMsg} from "../store/actionTypes";
import Api from "../services/chatService";

class Screen extends React.PureComponent {

    // todo
    // 2) ContextPopup should have own click listener to stopPropagation
    // 3) ContextPopup and Screen click listeners should be destroyed on componentWillUnmount

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
        if (this.state.menuIsShown) {
            this.setState({
                menuIsShown: !this.state.menuIsShown
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
        if (actionKey === "Edit") {
            // this.props.editMsg();
            console.log('edit');
        } else if (actionKey === "Delete") {
            Api.removeMsg(this.state.selectedMsgId)
                .then(res => {
                    this.props.deleteMsg(this.state.selectedMsgId);
                    this.setState({
                        menuIsShown: !this.state.menuIsShown
                    })
                })
        } else {

        }
    }

    render() {
        const {selectedChat, selectedUser} = this.props.chatState;
        const {menuIsShown, coordinates} = this.state;
        const actions = ["Edit", "Delete", "Copy"];
        let position;
        return (
            <div className="screen">
                {selectedChat &&
                <div>
                    {
                        selectedChat.Messages.map(msg => {
                            position = msg.userId === selectedUser.id ? "right" : 'left';
                            return (
                                <>
                                    <Message
                                        key={msg.id}
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
                                </>
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
        editMsg: (msgId) => {
            dispatch(editMsg(msgId))
        },
        deleteMsg: (msgId) => {
            dispatch(deleteMsg(msgId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

