import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nvbar.css';
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <button className="navbar-logo" onClick={() => navigate('/homepage')}>
                <Link to="/" className="logo-link">Learn</Link>
            </button>

            <div className="navbar-actions">
                {!user ? (
                    // Logged out view (Image 1)
                    <>
                        <button className="sign-in-button" onClick={() => navigate('/login')}>
                            Sign in
                        </button>
                        <button className="register-button" onClick={() => navigate('/register')}>
                            Register
                        </button>
                        <button className="contact-button" onClick={() => navigate('/contact')}>
                            Contact
                        </button>
                    </>
                ) : (
                    // Logged in view (Image 2)
                    <>
                        <button className="profile-button" onClick={() => navigate('/profile')}>
                            My profile
                        </button>
                        <button className="contact-button" onClick={() => navigate('/contact')}>
                            Contact
                        </button>
                        <button className="logout-button" onClick={logout}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;