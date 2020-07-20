import React from "react";
import {connect} from "react-redux";
import {selectUser} from "../store/actionTypes";

class UsersToSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            selectedUser: null
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/chat/getUsers`)
            .then(users => users.json())
            .then(users => {
                this.setState({users: users});
            });
    }

    render() {
        const {users, selectedUser} = this.state;
        const User = {
            borderBottom: "1px solid grey",
            padding: "10px 15px",
            height: "20px",
        };

        return (
            <div className="usersWrapper">
                {/*todo change styles to const User*/}
                {users && users.map((user, index) => (
                    <div style={{
                    borderBottom: index === users.length - 1 ? 'none' : "1px solid grey",
                    padding: "10px 15px",
                    height: "20px",
                    backgroundColor: selectedUser === index ? "#fff" : "#ccc"
                }} key={index} onClick={() => {
                    this.props.selectUser(user.id);
                    this.setState({
                        selectedUser: index
                    })
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersToSelect);
