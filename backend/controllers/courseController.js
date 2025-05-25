const Course = require('../models/Course');

// Create course
const createCourse = async (req, res) => {
    const {
        title,
        description,
        fieldOfInterest,
        period,
        availableSeats,
        languages,
        lessons,
        price
    } = req.body;

    try {
        const course = new Course({
            title,
            description,
            fieldOfInterest,
            period,
            availableSeats,
            languages,
            lessons,
            price,
            teacher: req.session.user.id
        });

        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: 'Error creating course', details: err.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name email');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching courses', details: err.message });
    }
};

// Get single course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name email');
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching course', details: err.message });
    }
};

// Update course
const updateCourse = async (req, res) => {
    const {
        id,
        title,
        description,
        fieldOfInterest,
        period,
        availableSeats,
        languages,
        lessons,
        price
    } = req.body;

    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        course.title = title || course.title;
        course.description = description || course.description;
        course.fieldOfInterest = fieldOfInterest || course.fieldOfInterest;
        course.period = period || course.period;
        course.availableSeats = availableSeats ?? course.availableSeats;
        course.languages = languages || course.languages;
        course.lessons = lessons ?? course.lessons;
        course.price = price ?? course.price;

        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: 'Error updating course', details: err.message });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting course', details: err.message });
    }
};

// Get available courses for student
const getAvailableCourses = async (req, res) => {
    try {
        const user = req.session.user;
        if (user.admin) return res.status(403).json({ message: 'Only students can access this' });

        const allCourses = await Course.find();

        const availableCourses = allCourses.map(course => ({
            _id: course._id,
            title: course.title,
            fieldOfInterest: course.fieldOfInterest,
            languages: course.languages,
            lessons: course.lessons,
            price: course.price,
            availableSeats: course.availableSeats,
            isAvailable: course.availableSeats > 0,
            teacher: course.teacher
        }));

        res.json({ courses: availableCourses });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getAvailableCourses
};
