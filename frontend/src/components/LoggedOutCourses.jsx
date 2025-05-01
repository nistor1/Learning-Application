import React, { useState } from 'react';
import { Search, Edit2, Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Courses.css"

export default function LoggedOutCourses() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState("Field of Interest");
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const fields = [
    "All Fields", "JAVA", "JAVA Spring", "JavaScript",
    "Python", "React", "Angular", "Node.js",
    "Data Science", "Machine Learning"
  ];



  const courses = [
    {
      id: 1,
      title: "Course1",
      description: "Description",
      fieldOfInterest: "JAVA",
      period: "15/12/2024 - 14/03/2025",
      availableSeats: 22,
      languages: ["English", "French"],
      lessons: 10,
      price: 5.99
    },
    {
      id: 2,
      title: "Course2",
      description: "Description",
      fieldOfInterest: "JAVA Spring",
      period: "15/12/2024 - 14/03/2025",
      availableSeats: 22,
      languages: ["English", "French"],
      lessons: 10,
      price: 5.99
    },
    {
      id: 3,
      title: "Course3",
      description: "Description",
      fieldOfInterest: "React",
      period: "15/12/2024 - 14/03/2025",
      availableSeats: 22,
      languages: ["English", "Romanian"],
      lessons: 10,
      price: 5.99
    }
  ];

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

    const matchesStartDate = start >= startDate;
    const matchesEndDate = end <= endDate;

    return matchesTitle && matchesField && matchesStartDate && matchesEndDate;
  });

  /*Geolocation*/
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "";
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aIncludes = a.languages.includes(preferredLanguage);
    const bIncludes = b.languages.includes(preferredLanguage);
    return (aIncludes === bIncludes) ? 0 : aIncludes ? -1 : 1;
  });

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
                      customInput={
                        <input
                            className="date-button"
                            value={startDate.toLocaleDateString()}
                            readOnly
                        />
                      }
                  />
                  <Calendar className="date-icon" />
                </div>

                <span className="filter-label">END:</span>
                <div className="date-container">
                  <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd MMM, yyyy"
                      customInput={
                        <input
                            className="date-button"
                            value={endDate.toLocaleDateString()}
                            readOnly
                        />
                      }
                  />

                  <Calendar className="date-icon" />
                </div>

                <div className="field-container">
                  <button
                      className="field-button"
                      onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                  >
                    {selectedField}
                    <ChevronDown className="dropdown-icon" />
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
          <hr className="header-divider" />
        </div>

        <div className="courses-list">
          {sortedCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-flex">
                  <div className="course-image-container">
                    <div className="course-image-wrapper">
                      <div className="course-label">ONLINE COURSE</div>
                      <div className="course-image">
                        <img src="/api/placeholder/128/80" alt="Course" />
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
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
