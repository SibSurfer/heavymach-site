import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
    writeBatch,
} from "firebase/firestore";
import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../logic/firebase";
import "./authForm.scss";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email: username,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            if (username !== "admin@service.com") {
                const adminQuery = query(
                    collection(db, "users"),
                    where("email", "==", "admin@service.com")
                );

                const adminSnapshot = await getDocs(adminQuery);
                const admin = adminSnapshot.docs[0]?.data();

                if (admin) {
                    const combinedId =
                        res.user.uid > admin.uid
                            ? res.user.uid + admin.uid
                            : admin.uid + res.user.uid;

                    const batch = writeBatch(db);

                    batch.set(doc(db, "chats", combinedId), {
                        messages: [],
                    });

                    batch.update(doc(db, "userChats", res.user.uid), {
                        [combinedId + ".userInfo"]: {
                            uid: admin.uid,
                            email: admin.email,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });

                    batch.update(doc(db, "userChats", admin.uid), {
                        [combinedId + ".userInfo"]: {
                            uid: res.user.uid,
                            email: username,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });

                    await batch.commit();
                }
            }

            if (username === "admin@service.com") {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const batch = writeBatch(db);

                usersSnapshot.forEach((docSnapshot) => {
                    const user = docSnapshot.data();

                    if (user.uid !== res.user.uid) {
                        const combinedId =
                            res.user.uid > user.uid
                                ? res.user.uid + user.uid
                                : user.uid + res.user.uid;

                        batch.set(doc(db, "chats", combinedId), {
                            messages: [],
                        });

                        batch.update(doc(db, "userChats", res.user.uid), {
                            [combinedId + ".userInfo"]: {
                                uid: user.uid,
                                email: user.email,
                            },
                            [combinedId + ".date"]: serverTimestamp(),
                        });

                        batch.update(doc(db, "userChats", user.uid), {
                            [combinedId + ".userInfo"]: {
                                uid: res.user.uid,
                                email: username,
                            },
                            [combinedId + ".date"]: serverTimestamp(),
                        });
                    }
                });

                await batch.commit();
            }

            alert("Регистрация успешна!");
            navigate("/chat");
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3500);
        }
    };

    return (
        <div className="auth">
            <Link to="/" className="nav_link_auth">
                <i className="ri-close-line"></i>
            </Link>

            <div className="wrapper">
                <form onSubmit={handleRegister}>
                    <h2>Регистрация</h2>
                    {error && <div className="error-popup">{error}</div>}
                    <div className="input-box">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        Создать аккаунт
                    </button>
                    <div className="divider">
                        <span>или</span>
                    </div>
                    <button
                        className="auth-btn-secondary"
                        onClick={() => navigate("/login")}
                    >
                        Войти в существующий
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
