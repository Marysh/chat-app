import React from "react";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
import Screen from "./Screen";
import ScreenTitle from "./ScreenTitle";
import SendMessage from "./SendMessage";


class Messenger extends React.Component {

    render() {
        return (
            <div className="messengerWrapper">
                <div className="leftBar-wrap">
                    <AddChat/>
                    <ChatList/>
                </div>

                <div className="rightBar-wrap">
                    <ScreenTitle/>
                    <Screen/>
                    <SendMessage/>
                </div>
            </div>
        );
    }

}

export default Messenger;
