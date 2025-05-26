const express = require('express');
const router = express.Router();
const { enrollToCourse, getCourseEnrollments, getMonthlyEnrollmentsStatsForCourse, getEnrollmentsByDayForCourseAndMonth} = require('../controllers/enrollmentController');
const protect = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollToCourse);
router.get('/course/:courseId', protect, getCourseEnrollments);
router.get('/course/:courseId/stats', protect, getMonthlyEnrollmentsStatsForCourse);
router.get('/course/:courseId/enrollments', protect, getEnrollmentsByDayForCourseAndMonth);

module.exports = router;
