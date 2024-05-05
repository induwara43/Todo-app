import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { useAuth } from "./security/AuthContext";

export default function Header() {

    const authContext = useAuth()
    function logout(){
        authContext.logout()
    }
   
    return (
        <Navbar className="border-bottom border-light border-5 mb-5 p-2" expand="lg">
            <Navbar.Brand className="ms-2 fs-2 fw-bold text-black">TODO APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="navbar-nav">
                    <Nav.Item className="fs-5">{authContext.isAuthenticated && <Link className="nav-link" to="/welcome/admin">Home</Link>}</Nav.Item>
                    <Nav.Item className="fs-5">{authContext.isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}</Nav.Item>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav className="navbar-nav">
                    <Nav.Item className="fs-5">{!authContext.isAuthenticated &&<Link className="nav-link" to="/">Login</Link>}</Nav.Item>
                    <Nav.Item className="fs-5">{authContext.isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}</Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
