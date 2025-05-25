const express = require('express');
const router = express.Router();
const { enrollToCourse, getCourseEnrollments } = require('../controllers/enrollmentController');
const protect = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollToCourse);
router.get('/course/:courseId', protect, getCourseEnrollments);

module.exports = router;
