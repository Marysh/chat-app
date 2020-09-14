import React from "react";
import {connect} from "react-redux";
import {fillChatList, selectUser} from "../../store/actionTypes";
import Api from "../../services/chatService";
import styles from "./UsersToSelect.module.css"

class UsersToSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            selectedUser: null
        }
    }

    componentDidMount() {
        Api.getUsers().then(users => {
            this.setState({users: users});
        });
    }

    render() {
        const {users} = this.state;
        const {chatState, fillChatList, selectUser} = this.props;
        return (
            <div className={styles.usersWrapper}>
                {users && users.map((user, index) => {
                    const bgColor = chatState.selectedUser && chatState.selectedUser.id === user.id ? "#fff" : "#ccc";
                    return (
                        <div className={styles.user} style={{
                            backgroundColor: bgColor
                        }} key={index} onClick={() => {
                            fillChatList([]);
                            selectUser(user);
                        }}>{user.name}</div>
                    )
                })}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }

}

function mapDispatchToProps(dispatch) {
    return {
        selectUser: (user) => {
            dispatch(selectUser(user))
        },
        fillChatList: (chats) => {
            dispatch(fillChatList(chats))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersToSelect);
