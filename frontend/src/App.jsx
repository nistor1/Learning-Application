// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Messages from "./components/Messages.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Nvbar.jsx";
import Contact from "./components/Contact.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./components/Register.jsx";
import StudentCourses from "./components/StudentCourses.jsx";
import LoggedOutCourses from "./components/LoggedOutCourses.jsx";
import TeacherCourses from "./components/TeacherCourses.jsx";
import CourseEnrollment from "./components/CourseEnrollment.jsx";
import AddCoursePage from "./components/AddCourseForm.jsx";
import EditCoursePage from "./components/EditCourseForm.jsx";
import CourseStats from "./components/CourseStats.jsx";
import LocationTracker from "./context/Location.jsx";
import ChatbotPage from "./components/ChatbotPage.jsx";

const App = () => {
    return (
        <AuthProvider>
            <LocationTracker />
            <Router>
                {<Navbar />}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/courses" element={<LoggedOutCourses />} />
                    <Route path="/student/courses" element={<StudentCourses />} />
                    <Route path="/teacher/courses" element={<TeacherCourses />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/teacher/courses/:id/fields" element={<EditCoursePage />} />
                    <Route path="/teacher/courses/fields" element={<AddCoursePage />} />
                    <Route path="/teacher/courses/:id/enrollment" element={<CourseEnrollment />} />
                    <Route path="/teacher/courses/:id/stats" element={<CourseStats />} />
                    <Route
                        path="/messages"
                        element={<ProtectedRoute roles={['ROLE_CLIENT', 'ROLE_ADMIN']} component={Messages} />}
                    />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
