// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = 'http://localhost:5000/api/auth/login';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(API_URL, { email, password }, {
                withCredentials: true
            });

            if (response.status === 200 && response.data.user) {
                const { email, admin, id } = response.data.user;
                console.log("AM SALVAT ROLUL ASTA BA BOULE:" + admin + email + id)


                login(email, admin, id);


                navigate('/homepage');

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
};

export default Login;
