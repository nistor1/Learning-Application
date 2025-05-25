const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Enroll student to a course
const enrollToCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const user = req.session.user;

    try {
        if (user.admin) {
            return res.status(403).json({ message: 'You cannot enroll a teacher' });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.availableSpots <= 0) {
            return res.status(400).json({ message: 'No available spots in this course' });
        }

        const alreadyEnrolled = await Enrollment.findOne({ course: courseId, student: user.id });
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        const enrollment = new Enrollment({
            course: course._id,
            student: user.id,
            cost: course.price
        });

        await enrollment.save();
        course.availableSpots -= 1;
        await course.save();

        res.status(201).json({ message: 'Enrollment Success', enrollment });
    } catch (err) {
        res.status(500).json({ message: 'Enrollment Error', error: err.message });
    }
};


// Fetch enrollments for a specific course (for teachers)
const getCourseEnrollments = async (req, res) => {
    const courseId = req.params.courseId;
    const user = req.session.user;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Only the teacher who created the course can view enrollments
        if (course.teacher.toString() !== user.id) {
            return res.status(403).json({ message: 'Access denied - Not course owner' });
        }

        const enrollments = await Enrollment.find({ course: courseId }).populate('student', 'name email');

        // Build calendar dates (enrolledAt)
        const enrollmentDates = enrollments.map(enr => enr.enrolledAt);

        // Build monthly statistics: { "2025-05": 3, "2025-06": 2, ... }
        const monthlyStats = {};

        enrollments.forEach(({ enrolledAt }) => {
            const monthKey = `${enrolledAt.getFullYear()}-${String(enrolledAt.getMonth() + 1).padStart(2, '0')}`;
            monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + 1;
        });

        res.json({
            total: enrollments.length,
            enrollmentDates,
            monthlyStats,
            enrollments
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch enrollments', error: err.message });
    }
};

module.exports = { enrollToCourse, getCourseEnrollments };
