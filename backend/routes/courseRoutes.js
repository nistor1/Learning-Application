const express = require('express');
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getAvailableCourses
} = require('../controllers/courseController');

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.get('/', getCourses);
router.get('/available', getAvailableCourses);
router.get('/:id', getCourseById);
router.post('/', protect, createCourse);
router.put('/', protect, updateCourse);
router.delete('/:id', protect, isAdmin, deleteCourse);

module.exports = router;
