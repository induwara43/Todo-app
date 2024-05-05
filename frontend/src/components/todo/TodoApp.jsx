import {BrowserRouter,Routes,Route} from "react-router-dom"
import Footer from "./Footer";
import Header from "./Header";
import ListTodos from "./ListTodos";
import Error from "./Error";
import Welcome from "./Welcome";
import Login from "./Login";
import AuthProvider from "./security/AuthContext";
import AuthRoute from "./security/AuthRoute";
import Todo from "./Todo";

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/welcome/:username" element={<AuthRoute><Welcome /></AuthRoute>} />
                        <Route path="/todos" element={<AuthRoute><ListTodos /></AuthRoute> } />
                        <Route path="/todo/:id" element={<AuthRoute><Todo /></AuthRoute> } />
                        <Route path="/logout" element={<AuthRoute><Login /></AuthRoute>} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}


