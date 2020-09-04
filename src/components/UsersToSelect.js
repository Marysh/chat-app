import React from "react";
import {connect} from "react-redux";
import {fillChatList, selectUser} from "../store/actionTypes";
import Api from "../services/chatService";

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
        const {selectedUser} = this.props.chatState;
        return (
            <div className="usersWrapper">
                {users && users.map((user, index) => (
                    <div className="user" style={{
                        backgroundColor: selectedUser && selectedUser.id === user.id ? "#fff" : "#ccc"
                    }} key={index} onClick={() => {
                        // this.props.fillChatList([]); //todo think if we should clear chats
                        this.props.selectUser(user);
                    }}>{user.name}</div>
                ))}
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
