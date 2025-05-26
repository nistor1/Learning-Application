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

    const courseId = "68339b8d21d6fb63b976566d";

    useEffect(() => {
        fetchEnrolledUsers(selectedDate);
    }, [selectedDate]);

    const fetchEnrolledUsers = async (date) => {
        setIsLoading(true);
        const formattedDate = date.toISOString().split('T')[0];

        try {
            const response = await fetch(
                `http://localhost:5000/api/enrollments/course/${courseId}/enrollments?date=${formattedDate}`,
                {
                    credentials: 'include'
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch enrollments');
            }

            const users = await response.json();

            setEnrolledUsers(users);
        } catch (error) {
            console.error('Error fetching enrolled users:', error);
            setEnrolledUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="enrollment-container">
            <h1 className="enrollment-title">Enrollments for Course</h1>
            <hr className="enrollment-divider" />

            <div className="enrollment-grid">
                <div className="enrollment-date-picker">
                    <label className="label">Select Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="date-input"
                    />
                    <small className="date-helper">Format: DD/MM/YYYY</small>
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
