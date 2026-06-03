import { Navigate } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "@chakra-ui/react";

function ProtectedRoute({ children }) {
    const { setUser, user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {

        async function checkAuth() {
            try {
                const response = await AuthApi.me();

                if (response?.success) {
                    setUser(response.ResponseUser);
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (err) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [setUser]);

    if (loading) return <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}><Spinner size="xl" color="white" /></div>;

    if (!isAuth) return <Navigate to="/login" replace />;

    return children;
}

export default ProtectedRoute;