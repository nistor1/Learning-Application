import { useState } from 'react';
import { Search } from 'lucide-react';
import './HomePage.css';
import Navbar from './Nvbar'; // Import the Navbar component we created earlier

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample course data
    const courses = [
        { id: 1, title: 'Course1', imageUrl: '/api/placeholder/400/300' },
        { id: 2, title: 'Course2', imageUrl: '/api/placeholder/400/300' },
        { id: 3, title: 'Course3', imageUrl: '/api/placeholder/400/300' },
        { id: 4, title: 'Course4', imageUrl: '/api/placeholder/400/300' },
        { id: 5, title: 'Course5', imageUrl: '/api/placeholder/400/300' },
        { id: 6, title: 'Course6', imageUrl: '/api/placeholder/400/300' }
    ];

    return (
        <div className="homepage-container">
            {/* Navbar will be rendered at the top */}
            <Navbar />

            <div className="content-container">
                {/* Hero Title */}
                <h1 className="hero-title">Learn with us! Here is the list of courses</h1>

                {/* Search and Courses Button Section */}
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
                    <button className="courses-button">Courses</button>
                </div>

                {/* Courses Grid */}
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card-homepage">
                            <img
                                src={course.imageUrl}
                                alt={`${course.title} thumbnail`}
                                className="course-image-homepage"
                            />
                            <h3 className="course-title">{course.title}</h3>
                        </div>
                    ))}
                </div>

                {/* How Courses Can Be Taken Section */}
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
