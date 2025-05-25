import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import './HomePage.css';
import Navbar from './Nvbar';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    withCredentials: true,
                });
                setCourses(response.data.slice(0, 6));
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const displayedCourses = [...courses];
    while (displayedCourses.length < 6) {
        displayedCourses.push(null);
    }

    const handleCoursesClick = () => {
        if (user.role === "TEACHER") {
            navigate('/teacher/courses');
        } else if (user.role === "STUDENT") {
            navigate('/student/courses');
        } else {
            navigate('/courses');
        }
    };


    return (
        <div className="homepage-container">
            <Navbar />

            <div className="content-container">
                <h1 className="hero-title">Learn with us! Here is the list of courses</h1>

                <div className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="search-icon" size={18} />
                    </div>
                    <button className="courses-button" onClick={handleCoursesClick} >Courses</button>
                </div>

                <div className="courses-grid">
                    {displayedCourses.map((course, index) =>
                        course ? (
                            <div key={course.id ?? index} className="course-card-homepage">
                                <img
                                    src={course.imageUrl}
                                    alt={`${course.title} thumbnail`}
                                    className="course-image-homepage"
                                />
                                <h3 className="course-title">{course.title}</h3>
                            </div>
                        ) : (
                            <div key={`empty-${index}`} className="course-card-homepage empty-card">
                                {/* Placeholder */}
                                <div className="empty-placeholder">
                                    {/* generic image */}
                                    <p>No course</p>
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="how-to-section">
                    <h2 className="section-title">HOW COURSES CAN BE TAKEN</h2>

                    <p className="section-description">
                        On our e-learning platform, courses can be accessed and completed in a structured and user-friendly way:
                    </p>

                    <ol className="steps-list">
                        <li className="step-item">
                            <span className="step-number">Course Structure</span>
                            <ul className="step-details">
                                <li>Each course is divided into modules and lessons, allowing students to progress step by step.</li>
                            </ul>
                        </li>

                        <li className="step-item">
                            <span className="step-number">Self-Paced or Scheduled Learning</span>
                            <ul className="step-details">
                                <li>Courses can be self-paced, meaning students can go through the content at their convenience.</li>
                            </ul>
                        </li>

                        <li className="step-item">
                            <span className="step-number">Progress Tracking</span>
                            <ul className="step-details">
                                <li>Students can track their progress through a progress bar or a dashboard.</li>
                                <li>Completed lessons are marked automatically, and users can resume where they left off.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
