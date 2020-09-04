import React from "react";

export default function Message(props) {
    const getTime = (time) => {
        let date = new Date(time);
        return date.getHours() + ':' + date.getMinutes();
    }

    const {msg, position, handleContext} = props;

    const messageWrap = {
        display: "flex",
        justifyContent: position === "right" ? "flex-end" : "flex-start",
        marginBottom: "5px"
    };
    const bgColor = position === "right" ? "dark" : 'light';
    const time = getTime(msg.time);

    return (
        <div className="messageWrap" style={messageWrap}>
            {/*<div className={`msg ${bgColor}`} onContextMenu={handleContext}>*/}
            <div className={`msg ${bgColor}`} onContextMenu={handleContext}>
                <div className={'msg-text'}>
                    {msg.text}
                </div>
                <p className="msgTime">{time}</p>
            </div>
        </div>
    )

}


