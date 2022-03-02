import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            AuthService.getUser().then(
                (response) => {
                    setIsAuthenticated(true);
                },
                (error) => {
                }
            );
        }

    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src="https://www.freepnglogos.com/uploads/logo-png/logo-png-transparent-background-5.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    {/* <img src="https://www.freepnglogos.com/uploads/logo-png/logo-png-transparent-background-5.png" width="30" height="30" className="d-inline-block align-top" alt=""/> */}
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                    {
                        isAuthenticated &&
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>

            <footer className="footer">
                <div className="container">
                    <span className="text-muted">

                    </span>
                </div>
            </footer>
        </div>
    );
}

export default App;
