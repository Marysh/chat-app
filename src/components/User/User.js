import React from "react";
import styles from "./User.module.css"

class User extends React.Component {


    render() {
        const {user, selectNewUser} = this.props;
        return (
            <div className={styles.user_wrap} onClick={() => {
                selectNewUser(user);
            }}>
                <div className="bold">{user.name}</div>
            </div>
        );
    }

}


export default User;
