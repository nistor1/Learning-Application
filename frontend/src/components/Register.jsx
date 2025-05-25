// components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(API_URL, {
                name,
                email,
                password,
                admin
            });

            if (response.status === 201) {
                setSuccess('Account created successfully!');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Register</h2>
                <p className="subtitle">Create a new account</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                    />
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
                        placeholder="Create a password"
                    />
                    <label>Account Type</label>
                    <select
                        value={admin ? 'TEACHER' : 'STUDENT'}
                        onChange={(e) => setAdmin(e.target.value === 'TEACHER')}
                        required
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                    </select>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p style={{color: 'green'}}>{success}</p>}

                    <button type="submit" className="login-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
