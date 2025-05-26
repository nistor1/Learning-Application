import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CourseStats.css';
import { useParams } from 'react-router-dom';

const CourseStatistics = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const start = formatDate(startDate);
        const end = formatDate(endDate);

        const url = `http://localhost:5000/api/enrollments/course/${id}/stats?startDate=${start}&endDate=${end}`;

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
        });


        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const processedData = data.map(item => ({
          ...item,
          label: `${item.month} ${item.year}`
        }));

        setCourseData(processedData);
      } catch (err) {
        setError(err.message);
        setCourseData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

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
                onChange={date => setStartDate(date)}
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
                onChange={date => setEndDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                className="statistics-picker"
                minDate={startDate}
            />
          </div>
        </div>

        <div className="statistics-chart-container">
          <h2 className="statistics-chart-title">Students Enrolled</h2>

          {isLoading && <div className="statistics-loading">Loading data...</div>}

          {error && <div className="statistics-error">Error: {error}</div>}

          {!isLoading && !error && courseData.length === 0 && (
              <div className="statistics-no-data">No enrollment data available for the selected period.</div>
          )}

          {!isLoading && !error && courseData.length > 0 && (
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

          <div className="statistics-footer">Made with Recharts</div>
        </div>
      </div>
  );
};

export default CourseStatistics;
