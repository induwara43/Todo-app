import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){
    
    const [isAuthenticated, setAuthentication] = useState(false)
    const [username,setUsername] = useState(null)

    function login(username,password) {
        if (username === 'admin' && password === 'admin') {
            setAuthentication(true)
            setUsername(username)
            return true
        } else {
            setAuthentication(false)
            return false
        }
    }

    function logout(){
        setAuthentication(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username}}>
            {children}
        </AuthContext.Provider>
    )
}