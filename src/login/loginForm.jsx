import { signInWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    writeBatch,
} from "firebase/firestore";
import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../logic/firebase";
import "./authForm.scss";

const LoginForm = () => {
    const [username, setInputUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log("User logged in:", res.user);

            if (username === "admin@service.com") {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const batch = writeBatch(db);
                const operations = []; // Array to collect batch operations

                for (const docSnapshot of usersSnapshot.docs) {
                    const user = docSnapshot.data();
                    if (user.uid !== res.user.uid) {
                        const combinedId =
                            res.user.uid > user.uid
                                ? res.user.uid + user.uid
                                : user.uid + res.user.uid;

                        const chatDocRef = doc(db, "chats", combinedId);
                        const chatSnapshot = await getDoc(chatDocRef);

                        if (!chatSnapshot.exists()) {
                            batch.set(chatDocRef, {
                                messages: [],
                            });
                        }

                        operations.push(
                            batch.update(doc(db, "userChats", res.user.uid), {
                                [combinedId + ".userInfo"]: {
                                    uid: user.uid,
                                    email: user.email,
                                },
                                [combinedId + ".date"]: serverTimestamp(),
                            })
                        );

                        operations.push(
                            batch.update(doc(db, "userChats", user.uid), {
                                [combinedId + ".userInfo"]: {
                                    uid: res.user.uid,
                                    email: username,
                                },
                                [combinedId + ".date"]: serverTimestamp(),
                            })
                        );
                    }
                }

                await batch.commit();
            }

            navigate("/chat");
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3500);
        }
    };

    return (
        <div className="LoginForm auth">
            <Link to="/" className="nav_link_auth">
                <i className="ri-close-line"></i>
            </Link>

            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h2>Вход</h2>
                    <div className="input-box">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setInputUsername(e.target.value)}
                            required
                            placeholder="Email"
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Пароль"
                        />
                        <FaLock className="icon" />
                    </div>
                    <button className="auth-btn-primary" type="submit">
                        Вход
                    </button>

                    <div className="divider">
                        <span>или</span>
                    </div>

                    <button
                        className="auth-btn-secondary"
                        onClick={() => navigate("/register")}
                    >
                        Создать аккаунт
                    </button>
                </form>

                {error && (
                    <div className="error-popup">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
