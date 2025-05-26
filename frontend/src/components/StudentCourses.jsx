import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Edit2, Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Courses.css';

export default function StudentCourses() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState("Field of Interest");
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses', {
          withCredentials: true,
        });
        setCourses(response.data);

        const uniqueFields = [...new Set(response.data.map(course => course.fieldOfInterest))];
        setFields(uniqueFields);
      } catch (error) {
        console.error("Error while retrieving courses:", error);
      }
    };

    fetchCourses();
  }, []);



  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  function extractStartEnd(period) {
    const [startStr, endStr] = period.split(' - ');
    return {
      start: parseDate(startStr),
      end: parseDate(endStr)
    };
  }


  const filteredCourses = courses.filter(course => {
    const matchesTitle = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField =
        selectedField === "Field of Interest" || selectedField === "All Fields" || course.fieldOfInterest === selectedField;

    const { start, end } = extractStartEnd(course.period);

    const matchesStartDate = !startDate || start >= startDate;
    const matchesEndDate = !endDate || end <= endDate;


    return matchesTitle && matchesField && matchesStartDate && matchesEndDate;
  });

  /*Geolocation*/
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "";
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aIncludes = a.languages.includes(preferredLanguage);
    const bIncludes = b.languages.includes(preferredLanguage);
    return (aIncludes === bIncludes) ? 0 : aIncludes ? -1 : 1;
  });

  /*ENROLL*/

  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const [errorEnroll] = useState(null);
  const [successEnroll] = useState(null);

  const handleEnroll = async (courseId) => {
    if (!courseId) {
      console.error("Course ID is undefined!");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/enrollments/${courseId}`, {}, {
        withCredentials: true
      });

      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Enrollment failed.");
    }
  };

  return (
      <div className="courses-container">
        <div className="header-section">
          <div className="header-flex">
            <h1 className="header-title">Courses</h1>
            <div className="controls-container">
              <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="search-icon"/>
              </div>

              <div className="filter-group">
                <span className="filter-label">START:</span>
                <div className="date-container">
                  <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd MMM, yyyy"
                      isClearable
                      placeholderText="Start Date"
                      customInput={
                        <input
                            className="date-button"
                            value={startDate ? startDate.toLocaleDateString() : ''}
                            readOnly
                        />
                      }
                  />
                  <Calendar className="date-icon"/>
                </div>

                <span className="filter-label">END:</span>
                <div className="date-container">
                  <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd MMM, yyyy"
                      isClearable
                      placeholderText="End Date"
                      customInput={
                        <input
                            className="date-button"
                            value={endDate ? endDate.toLocaleDateString() : ''}
                            readOnly
                        />
                      }
                  />
                  <Calendar className="date-icon"/>
                </div>

                <div className="field-container">
                  <button
                      className="field-button"
                      onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                  >
                    {selectedField}
                    <ChevronDown className="dropdown-icon"/>
                  </button>
                  {showFieldDropdown && (
                      <div className="dropdown-menu">
                        {fields.map((field) => (
                            <div
                                key={field}
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedField(field);
                                  setShowFieldDropdown(false);
                                }}
                            >
                              {field}
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="header-divider"/>
        </div>

        <div className="courses-list">
          {sortedCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-flex">
                  <div className="course-image-container">
                    <div className="course-image-wrapper">
                      <div className="course-label">ONLINE COURSE</div>
                      <div className="course-image">
                        <img src="/api/placeholder/128/80" alt="Course"/>
                      </div>
                    </div>
                  </div>

                  <div className="course-content">
                    <div className="course-header">
                      <h2 className="course-title">{course.title}</h2>
                      <span className="course-price">${course.price.toFixed(2)}</span>
                    </div>
                    <p className="course-description">{course.description}</p>

                    <div className="course-details">
                      <p className="course-detail-row">
                        <span className="detail-label">Field of Interest:</span> {course.fieldOfInterest}
                      </p>
                      <p className="course-detail-row">
                        <span className="detail-label">Period:</span> {course.period}
                      </p>
                      <p className="course-detail-row">
                        <span className="detail-label">Available seats:</span> {course.availableSeats}
                      </p>
                      <p className="course-detail-row">
                        <span className="detail-label">Languages:</span> {course.languages.join(', ')}
                      </p>
                    </div>
                    <div className="course-lessons">
                      <span>{course.lessons} lessons</span>
                      <Edit2 className="edit-icon"/>
                    </div>

                    <div>
                      <button
                          className="course-button"
                          onClick={() => handleEnroll(course.id || course._id)}
                          disabled={loadingCourseId === course.id}
                      >
                        {loadingCourseId === course.id ? "Enrolling..." : "Enroll Course"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {errorEnroll && <div className="error-message">{errorEnroll}</div>}
        {successEnroll && <div className="success-message">{successEnroll}</div>}

        <div className="chatbot-container">
          <button
              className="chatbot-button"
              onClick={() => navigate("/chatbot")}
          >
            Chatbot
          </button>
        </div>


      </div>
  );
}
