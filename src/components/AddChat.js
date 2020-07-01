import React from "react";
import Modal from "./Modal";
import User from "./Users";
import {connect} from "react-redux";
import {createChat} from "../store/actionTypes";

class AddChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalIsOpen: false,
            newChatName: null,
            selectedUserId: null
        }
    }

    getUsers() {
        fetch('http://localhost:3000/api/chat/getUsers')
            .then(result => result.json())
            .then(result => {
                let restUsers = result.filter(user => user.id !== 1);
                this.setState({users: restUsers});
            });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    createNewChat() {
        fetch('http://localhost:3000/api/chat/start', {
            method: 'POST',
            body: JSON.stringify({ownerId: 1, name: this.state.newChatName, newUserId: this.state.selectedUserId}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(response => {
                this.props.createChat(response);
            });

        document.getElementById("chatInputName").value = "";

        this.closeModal();

    }


    changeNameValue = (e) => {
        this.setState({newChatName: e.target.value})
    };


    selectNewUser = (userId) => {
        this.setState({selectedUserId: userId});
    };


    render() {
        const {users, modalIsOpen} = this.state;
        return (
            <div>
                <div className="topBar left">
                    <button onClick={() => {
                        this.openModal();
                        this.getUsers()
                    }}>&#10010;</button>
                </div>
                {modalIsOpen && (
                    <Modal>
                        <button
                            className="modal-close"
                            onClick={() => {
                                this.closeModal()
                            }}
                        >X
                        </button>
                        <div style={{"margin": "20px"}}>
                            <input type="text" id="chatInputName" style={{"border": "1px solid black"}}
                                   placeholder="enter a chat name" onChange={(e) => {
                                this.changeNameValue(e);
                            }}/>
                            {
                                users.map(user => (
                                    <User key={user.id} user={user} selectNewUser={this.selectNewUser}/>))
                            }
                        </div>
                        <button onClick={() => {
                            this.createNewChat()
                        }}>Create
                        </button>
                    </Modal>
                )}
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        createChat: (newChat) => {
            dispatch(createChat(newChat))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddChat);

