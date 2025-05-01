import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './CourseEnrollment.css';

const CourseEnrollment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-08-17'));
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnrolledUsers(selectedDate);
    }, [selectedDate]);

    const fetchEnrolledUsers = (date) => {
        setIsLoading(true);

        // Simulat date format: YYYY-MM-DD
        const formatted = date.toISOString().split('T')[0];

        // Simulated backend response by date
        const enrollmentsByDate = {
            '2025-08-17': [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ],
            '2025-08-18': [
                { id: 3, name: 'Mark Green', email: 'mark@example.com' }
            ]
        };

        setTimeout(() => {
            const users = enrollmentsByDate[formatted] || [];
            setEnrolledUsers(users);
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="enrollment-container">
            <h1 className="enrollment-title">Enrollments for Course1</h1>
            <hr className="enrollment-divider"/>

            <div className="enrollment-grid">
                <div className="enrollment-date-picker">
                    <label className="label">Select Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="date-input"
                    />
                    <small className="date-helper">Format: MM/DD/YYYY</small>
                </div>

                <div className="enrollment-users">
                    {isLoading ? (
                        <div className="loading-message">Loading users...</div>
                    ) : enrolledUsers.length > 0 ? (
                        enrolledUsers.map(user => (
                            <div key={user.id} className="user-card">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                            </div>
                        ))
                    ) : (
                        <div className="loading-message">No users enrolled on this date.</div>
                    )}
                </div>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
    );
};

export default CourseEnrollment;
