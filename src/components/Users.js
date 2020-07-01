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
        const {user, selectNewUser} = this.props;
        return (
            <div className="user-wrap" onClick={() => {
                this.changeBg();
                selectNewUser(user.id);
            }} style={{backgroundColor: this.state.bgColor}}>
                <div style={{"fontWeight": "700"}}>{user.name}</div>
            </div>
        );
    }

}


export default User;
