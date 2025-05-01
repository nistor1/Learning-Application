    // components/Login.js
    import React, { useState } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import Cookies from 'js-cookie';
    import { jwtDecode } from 'jwt-decode';
    import './Login.css';
    import { useAuth } from "../context/AuthContext.jsx";

    const API_URL = 'http://localhost:80/user-service/auth/login';

    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
        const {login} = useAuth();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');

            try {
                const response = await axios.post(API_URL, {email, password});

                if (response.status === 200 && response.data.jwtToken) {
                    const token = response.data.jwtToken;
                    Cookies.set('jwt', token, {secure: true, httpOnly: false});

                    const decodedToken = jwtDecode(token);
                    const username = decodedToken.sub;
                    const roles = decodedToken.role || [];
                    const id = response.data.id;

                    login(username, roles, token, id);

                    if (roles.includes('ROLE_ADMIN')) {
                        navigate('/admin/devices');
                    } else if (roles.includes('ROLE_CLIENT')) {
                        navigate('/client/devices');
                    }
                } else {
                    setError('Login failed. Please try again.');
                }
            } catch (err) {
                setError('Invalid email or password. Please try again.');
            }
        };

        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-card">
                        <h2>Welcome</h2>
                        <p className="subtitle">Please log in to your account</p>
                        <form onSubmit={handleSubmit} className="login-form">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="login-button">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    export default Login;
