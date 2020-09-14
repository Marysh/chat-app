import React from "react";
import styles from "./Message.module.css";

export default function Message(props) {
    const getTime = (time) => {
        let date = new Date(time);
        return date.getHours() + ':' + date.getMinutes();
    }

    const {msg, position, handleContext} = props;
    const msgPos = position === "right" ? styles.end : styles.start
    const bgColor = position === "right" ? styles.msg_dark : styles.msg_light;
    const time = getTime(msg.time);

    return (
        <div className={`${styles.messageWrap} ${msgPos}`}>
            <div className={`${styles.msg} ${bgColor}`} onContextMenu={handleContext}>
                <div className={styles.msg_text}>
                    {msg.text}
                </div>
                <p className={styles.msgTime}>{time}</p>
            </div>
        </div>
    )

}


