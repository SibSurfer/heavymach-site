import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Catalog from "./components/Catalog/Catalog";
import Footer from "./components/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import LoginForm from "./login/loginForm";
import RegisterForm from "./login/registerForm";
import FullChat from "./pages/FullChat";
function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <>
                            <Header/>
                            <HomePage />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <FullChat />
                        </ProtectedRoute>
                    }
                />

                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />

                <Route
                    path="/form"
                    element={
                        <>
                            <Header />
                            <Form />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/catalog"
                    element={
                        <>
                            <Header />
                            <Catalog />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
