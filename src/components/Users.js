import React from "react";

class User extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {user, selectNewUser} = this.props;
        return (
            <div className="user-wrap" onClick={() => {
                selectNewUser(user);
            }}>
                <div style={{"fontWeight": "700"}}>{user.name}</div>
            </div>
        );
    }

}


export default User;
