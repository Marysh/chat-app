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
        const {ownerId} = this.props;
        Api.getUsersForNewChat(ownerId).then(users => {
            this.setState({users: users});
        });
        this.setState({modalIsOpen: true});
    };


    closeModal = () => {
        this.setState({users: [], modalIsOpen: false});
    };


    selectNewUser(user, ownerId) {
        Api.createNewChat(user, ownerId).then(newChat => {
            this.props.createChat(newChat);
            this.props.selectChat(newChat);
        });

        this.closeModal();
    };

    render() {
        const {users, modalIsOpen} = this.state;
        const {ownerId} = this.props;
        return (
            <div>
                <div className="topBar left">
                    <button title='Start new chat' onClick={this.openModal}>&#10010;</button>
                </div>
                {modalIsOpen && (
                    <Modal>
                        <button
                            className="modal-close"
                            onClick={this.closeModal}
                        >X
                        </button>
                        <div style={{"margin": "20px 0"}}>
                            {
                                users.map(user => {
                                    return (<User key={user.id} user={user}
                                                  selectNewUser={() => {
                                                      this.selectNewUser(user, ownerId)
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

