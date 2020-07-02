import React from "react";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor: null
        }
    }

    changeBg() {
        if (!this.state.bgColor) {
            this.setState({bgColor: "#ccc"})
        }
    }

    render() {
        const {user, selectNewUser, active} = this.props;
        return (
            <div className="user-wrap" onClick={() => {
                selectNewUser(user.id);
            }} style={{backgroundColor: active ? "#ccc" : 'transparent'}}>
                <div style={{"fontWeight": "700"}}>{user.name}</div>
            </div>
        );
    }

}


export default User;
