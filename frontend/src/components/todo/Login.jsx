import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function Login() {
    const [username, setUsername] = useState('johndoe123');
    const [password, setPassword] = useState('');
    const [showError, setshowError] = useState(false);
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleLogin() {
        if (authContext.login(username,password)) {
            navigate(`/welcome/${username}`);
        } else {
            setshowError(true);
        }
    }

    return (
        <div className="Login">
            {showError && <div className="errorMg">Authentication Failed</div>}
            <div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" placeholder={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}