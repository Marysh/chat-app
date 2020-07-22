import React from "react";
import Modal from "./Modal";
import User from "./User";
import {connect} from "react-redux";
import {createChat, selectChat} from "../store/actionTypes";
import Api from '../services/chatService'

class AddChat extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalIsOpen: false,
        };

    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    };


    closeModal = () => {
        this.setState({modalIsOpen: false});
    };


    selectNewUser(user, owner) {
        this.setState({selectedUser: user});

        Api.createNewChat(user, owner).then(newChat => {
            return Api.getInfo(newChat)
        }).then(res => {
            this.props.createChat(res);
            this.props.selectChat(res);
        });

        this.closeModal();
    };

    render() {
        const {users, modalIsOpen} = this.state;
        const {owner} = this.props;
        return (
            <div>
                <div className="topBar left">
                    <button onClick={() => {
                        this.openModal();
                        Api.getUsersForNewChat(owner).then(users => {
                            this.setState({users: users});
                        });

                    }}>&#10010;</button>
                </div>
                {modalIsOpen && (
                    <Modal>
                        <button
                            className="modal-close"
                            onClick={this.closeModal}
                        >X
                        </button>
                        <div style={{"margin": "20px"}}>
                            {
                                users.map(user => {
                                    return (<User key={user.id} user={user}
                                                  selectNewUser={() => {
                                                      this.selectNewUser(user, owner)
                                                  }}
                                    />)
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

