import React from "react";
import ChatRoom from "./chatRoom";
import Message from "./message";

class Messenger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            chatRooms: [],
            value: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/getMessages')
            .then(result => result.json())
            .then(result => {
                console.log(result);
                this.setState({messages: result});
            });
        fetch('http://localhost:3000/getChatRooms')
            .then(result => result.json())
            .then(result => {
                console.log(result);
                this.setState({chatRooms: result});
            });
    }


    changeValue(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSend(msg) {
        if (msg) {
            fetch('http://localhost:3000/addMessage', {
                method: 'POST',
                body: JSON.stringify({msg}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(response => {
                    console.log(response);
                });
        }

        document.getElementById("chatInput").value = "";
    }

    render() {
        const {chatRooms, messages, value} = this.state;
        return (
            <div className="messengerWrapper">
                <div className="chatRoom-wrap">
                    {chatRooms.map(room => (
                        // <div key={room.id}>
                            <ChatRoom name={room.name}/>
                        // </div>
                    ))}
                </div>
                <div className="screenWrapper">
                    <div className="screen">
                        {messages.map(msg => (
                            <div key={msg.id}>
                                <Message msg={msg}/>
                            </div>
                        ))}
                    </div>
                    <div className="inputWrapper">
                        <input type="text" id='chatInput' placeholder="Broadcast a message..." onChange={(e) => {
                            this.changeValue(e);
                        }}/>
                        <button onClick={(e) => {
                            this.handleSend(value)
                        }}>Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Messenger;
