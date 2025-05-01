import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Courses.css';

export default function EditCoursePage() {
    const navigate = useNavigate();
    const { id } = useParams();

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

    useEffect(() => {
        setFields(["JAVA", "JAVA Spring", "JavaScript", "Python", "React", "Angular"]);
        setLanguages(["English", "French", "German", "Spanish"]);

        // Mock course data
        const mockCourses = [
            {
                id: 3,
                title: "Course3",
                description: "Description",
                fieldOfInterest: "React",
                startDate: "2024-12-15",
                endDate: "2025-03-14",
                availableSeats: 22,
                languages: ["English", "French"],
                lessons: 10,
                price: 5.99
            }
        ];

        const course = mockCourses.find(c => c.id.toString() === id);
        if (course) {
            setFormData({
                title: course.title,
                description: course.description,
                fieldOfInterest: course.fieldOfInterest,
                lessons: course.lessons,
                price: course.price,
                availableSeats: course.availableSeats,
                selectedLanguages: course.languages
            });
            setStartDate(new Date(course.startDate));
            setEndDate(new Date(course.endDate));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLanguageChange = (e) => {
        const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
        setFormData(prev => ({ ...prev, selectedLanguages: selected }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const courseData = {
            ...formData,
            startDate,
            endDate,
        };
        console.log('Updated course data:', courseData);
        // Replace with PUT API call
    };

    return (
        <div className="courses-container">
            <div className="header-section">
                <div className="header-flex">
                    <h1 className="header-title">Edit Course</h1>
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
                <input type="number" name="lessons" value={formData.lessons} min="0" onChange={handleChange} required />

                <label>Price ($):</label>
                <input type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />

                <label>Available Seats:</label>
                <input type="number" name="availableSeats" value={formData.availableSeats} min="0" onChange={handleChange} required />

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
