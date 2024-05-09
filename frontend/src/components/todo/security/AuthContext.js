import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){
    
    const [isAuthenticated, setAuthentication] = useState(false)
    const [username,setUsername] = useState(null)
    const [token,setToken] = useState(null)

    async function login(username,password) {
        console.log(username)
        console.log(password)
        try{
            const response = await executeJwtAuthenticationService(username,password)
            if(response.status==200){
                const jwtToken = 'Bearer ' + response.data.token
                setAuthentication(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config)=>{
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true
            }else{
                logout()
                return false
            }
        }catch(error){
            console.log(error)
            logout()
            return false
        }
    }

    function logout(){
        setAuthentication(false)
        setToken(null)
        setUsername(null)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}