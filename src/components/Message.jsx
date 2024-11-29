import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const formatTime = (seconds) => {
        const date = new Date(seconds * 1000);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    return (
        <div
            ref={ref}
            className={`message ${
                message.senderId === currentUser.uid && "owner"
            }`}
        >
            <div className="messageInfo">
                <span>{formatTime(message.date.seconds)}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
