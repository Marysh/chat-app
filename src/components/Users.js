import React from "react";

class User extends React.Component {

// todo if you have simple component like this use Functional Component
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
