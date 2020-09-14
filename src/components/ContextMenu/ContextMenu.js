import React from "react";
import styles from "./ContextMenu.module.css"

export default function ContextMenu(props) {

    const handleClick = (e, actionKey) => {
        e.stopPropagation();
        props.handleMenuClick(actionKey);
    }
    return (
        <div className={styles.msg_ContextMenu} style={{left: props.coordinates[0], top: props.coordinates[1]}}>
            <ul>
                {props.actions.map((action) => (
                    <li key={action}
                        onClick={(e) => {
                            handleClick(e, action)
                        }}>{action}</li>
                ))}
            </ul>
        </div>
    )
}