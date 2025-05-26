import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import Navbar from './Nvbar';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    withCredentials: true,
                });
                setUserData(response.data.user);
            } catch (err) {
                setError('Could not fetch user profile. You might be logged out.');
                console.error('Profile error:', err);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile-container">
            <Navbar />

            <div className="profile-content">
                <h1 className="profile-title">My Profile</h1>

                {error ? (
                    <div className="error-message">{error}</div>
                ) : userData ? (
                    <div className="profile-card">
                        <div className="profile-info">
                            <h2>{userData.name}</h2>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Role:</strong> {userData.admin ? 'Teacher' : 'Student'}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
}
