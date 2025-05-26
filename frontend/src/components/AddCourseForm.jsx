import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Courses.css';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.jsx";

export default function AddCoursePage() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [fields, setFields] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fieldOfInterest: '',
        lessons: 0,
        price: '',
        availableSeats: '',
        selectedLanguages: [],
    });
    const { user } = useAuth();

    useEffect(() => {
        // Replace with real API calls
        setFields(["JAVA", "JAVA Spring", "JavaScript", "Python", "React", "Angular"]);
        setLanguages(["English", "French", "German", "Spanish"]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLanguageChange = (e) => {
        const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setFormData(prev => ({ ...prev, selectedLanguages: selected }));
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const period = `${formatDate(startDate)} - ${formatDate(endDate)}`;

        const courseData = {
            title: formData.title,
            description: formData.description,
            fieldOfInterest: formData.fieldOfInterest,
            period: period,
            availableSeats: Number(formData.availableSeats),
            languages: formData.selectedLanguages,
            lessons: Number(formData.lessons),
            price: Number(formData.price),
            teacher: user.teacher,
        };

        try {
            console.log('Course data to send:', courseData);

            const response = await axios.post('http://localhost:5000/api/courses', courseData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Course added successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course. Please try again.');
        }
    };

    return (
        <div className="courses-container">
            <div className="header-section">
                <div className="header-flex">
                    <h1 className="header-title">Add New Course</h1>
                </div>
                <hr className="header-divider" />
            </div>

            <form className="add-course-form" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />

                <label>Field of Interest:</label>
                <select name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleChange} required>
                    <option value="">-- Select Field --</option>
                    {fields.map((field, index) => (
                        <option key={index} value={field}>{field}</option>
                    ))}
                </select>

                <label>Lessons:</label>
                <input type="number" name="lessons" value={formData.lessons} onChange={handleChange} required />

                <label>Price ($):</label>
                <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />

                <label>Available Seats:</label>
                <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} required />

                <label>Languages:</label>
                <select multiple name="selectedLanguages" value={formData.selectedLanguages} onChange={handleLanguageChange}>
                    {languages.map((lang, index) => (
                        <option key={index} value={lang}>{lang}</option>
                    ))}
                </select>

                <div className="date-fields">
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy" />

                    <label>End Date:</label>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="dd/MM/yyyy" />
                </div>

                <div className="course-actions">
                    <button type="submit" className="course-action-button">Save Course</button>
                    <button type="button" className="course-delete-button" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}