// components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:80/user-service/auth/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
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
                role
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
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                    </select>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}

                    <button type="submit" className="login-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
