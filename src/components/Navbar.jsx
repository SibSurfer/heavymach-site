import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../logic/firebase";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleLogout = async () => {
        await signOut(auth);
        dispatch({ type: "RESET_CHAT" });
    };

    return (
        <div className="navbar">
            <span className="logo">Чат поддержки</span>
            <div className="user">
                <span>{currentUser.email}</span>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    );
};

export default Navbar;
