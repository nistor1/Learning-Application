import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CourseStats.css';

const CourseStatistics = () => {
  const [startDate, setStartDate] = useState(new Date(2025, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 11, 31));
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mockEnrollmentData = [
    { month: "January", year: 2025, enrollments: 21 },
    { month: "February", year: 2025, enrollments: 48 },
    { month: "March", year: 2025, enrollments: 40 },
    { month: "April", year: 2025, enrollments: 15 },
    { month: "May", year: 2025, enrollments: 96 },
    { month: "June", year: 2025, enrollments: 27 },
    { month: "July", year: 2025, enrollments: 99 },
    { month: "August", year: 2025, enrollments: 44 },
    { month: "September", year: 2025, enrollments: 23 },
    { month: "October", year: 2025, enrollments: 9 },
    { month: "November", year: 2025, enrollments: 11 },
    { month: "December", year: 2025, enrollments: 33 }
  ];

  useEffect(() => {
    setIsLoading(true);

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    const generatedData = [];

    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startDate.getMonth() : 0;
      const monthEnd = year === endYear ? endDate.getMonth() : 11;

      for (let m = monthStart; m <= monthEnd; m++) {
        const monthName = months[m];
        const existing = mockEnrollmentData.find(
            (entry) => entry.month === monthName && entry.year === year
        );

        generatedData.push({
          month: monthName,
          year: year,
          enrollments: existing ? existing.enrollments : 0,
          label: `${monthName} ${year}`
        });
      }

    }

    setTimeout(() => {
      setCourseData(generatedData);
      setIsLoading(false);
    }, 500);
  }, [startDate, endDate]);

  return (
      <div className="statistics-container">
        <h1 className="statistics-title">Statistics: Course1</h1>
        <hr className="statistics-divider" />

        <div className="statistics-controls">
          <div>
            <label>Start Month</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="statistics-picker"
                maxDate={endDate}
            />
          </div>

          <div>
            <label>End Month</label>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="statistics-picker"
                minDate={startDate}
            />
          </div>
        </div>

        <div className="statistics-chart-container">
          <h2 className="statistics-chart-title">Students Enrolled</h2>

          {isLoading ? (
              <div className="statistics-loading">
                Loading data...
              </div>
          ) : (
              <div style={{ height: '24rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                      data={courseData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="enrollments"
                        fill="#4a7c2b"
                        name="Students Enrolled"
                        label={{ position: 'top', fill: '#333' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          )}

          <div className="statistics-footer">
            Made with Recharts
          </div>
        </div>
      </div>
  );
};

export default CourseStatistics;
