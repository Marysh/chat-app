import React from 'react';
import './App.css';
import Messenger from "./components/Messanger";
import UsersToSelect from "./components/UsersToSelect";
import {connect} from "react-redux";

class App extends React.Component {

    render() {
        const {chatState} = this.props;
        return (
            <div style={{margin: "100px auto 0", width: "600px"}}>
                <UsersToSelect/>
                {chatState.selectedUser && <Messenger user={chatState.selectedUser}/>}
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        chatState: state.chatState
    }
}

export default connect(mapStateToProps, null)(App);
