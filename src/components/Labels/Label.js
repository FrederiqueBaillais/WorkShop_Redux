import React from "react";

function Label(props) {
    return (
        <div onClick={props.clicked}>
            <span>{props.lapTime}</span>
        </div>
    );
}

export default Label;