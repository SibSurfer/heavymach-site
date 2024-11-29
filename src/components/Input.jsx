import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../logic/firebase";

const Input = () => {
    const [text, setText] = useState("");

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    console.log(data.chatId);

    const handleSend = async () => {
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            setText("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Напишите сообщение..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <button onClick={handleSend}>Отправить</button>
            </div>
        </div>
    );
};

export default Input;
