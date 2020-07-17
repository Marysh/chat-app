import React from "react";
import Modal from "./Modal";
import User from "./Users";
import {connect} from "react-redux";
import {createChat, selectChat} from "../store/actionTypes";

class AddChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalIsOpen: false,
        }
    }

    getUsersForNewChat(id) {
        fetch(`http://localhost:3000/api/chat/getUsers/${id}`)
            .then(result => result.json())
            .then(users => {
                this.setState({users: users});
            });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    createNewChat(user) {
        fetch('http://localhost:3000/api/chat/start', {
            method: 'POST',
            body: JSON.stringify({ownerId: this.props.owner, newUserId: user.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((newChat) => newChat.json())
            .then(newChat => {
                debugger
                this.props.createChat(newChat);
                this.props.selectChat(newChat);
                return fetch(`http://localhost:3000/api/chat/getInfo/${newChat.id}`);
            }).then((res) => res.json())
            .then(res => {
                console.log(res);
            });

        this.closeModal();
    }


    selectNewUser = (user) => {
        this.setState({selectedUser: user});
        this.createNewChat(user);
    };

    render() {
        const {users, modalIsOpen} = this.state;
        const {owner} = this.props;
        return (
            <div>
                <div className="topBar left">
                    <button onClick={() => {
                        this.openModal();
                        this.getUsersForNewChat(owner);
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
                            {
                                users.map(user => {
                                    return (<User key={user.id} user={user} selectNewUser={this.selectNewUser}/>)
                                })
                            }
                        </div>
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
        },
        selectChat: (newChat) => {
            dispatch(selectChat(newChat))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddChat);

