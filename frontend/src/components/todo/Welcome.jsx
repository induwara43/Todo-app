import { useParams, Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import axios from 'axios'

export default function Welcome() {

    const authContext = useAuth()
    const { username } = useParams();

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                {authContext.isAuthenticated && <Link to="/todos">go here</Link>}
            </div>
        </div>
    );
}
