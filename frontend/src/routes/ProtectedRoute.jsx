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

    if (loading) return <Spinner size="md" color="white" />;

    if (!isAuth) return <Navigate to="/login" replace />;

    return children;
}

export default ProtectedRoute;