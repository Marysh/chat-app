import React from 'react';
import './App.css';
import Messenger from "./components/Messenger/Messenger";
import UsersToSelect from "./components/UsersToSelect/UsersToSelect";
import {connect} from "react-redux";

class App extends React.Component {

    render() {
        const {chatState} = this.props;
        return (
            <div style={{margin: "100px auto 0", width: "600px"}}>
                <UsersToSelect/>
                {chatState.selectedUser && <Messenger userId={chatState.selectedUser.id}/>}
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
