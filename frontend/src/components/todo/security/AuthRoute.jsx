import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AuthRoute({children}){
    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return children
    else return <Navigate to="/" />
}