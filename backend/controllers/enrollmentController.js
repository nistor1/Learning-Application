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

const getMonthlyEnrollmentsStatsForCourse = async (req, res) => {
    const { startDate, endDate } = req.query;
    const { courseId } = req.params;
    const user = req.session.user;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Please provide startDate and endDate in the query' });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Optional: verify teacher is the owner of the course
        if (course.teacher.toString() !== user.id) {
            return res.status(403).json({ message: 'Access denied - Not course owner' });
        }

        const enrollments = await Enrollment.find({
            course: courseId,
            enrolledAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const monthlyStats = {};

        enrollments.forEach(({ enrolledAt }) => {
            const year = enrolledAt.getFullYear();
            const monthIndex = enrolledAt.getMonth(); // 0-11
            const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });

            const key = `${monthName}-${year}`;
            monthlyStats[key] = (monthlyStats[key] || 0) + 1;
        });

        const statsArray = Object.entries(monthlyStats).map(([key, count]) => {
            const [month, year] = key.split('-');
            return { month, year: parseInt(year), enrollments: count };
        });

        // Sort by year and month
        const monthOrder = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };

        statsArray.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return monthOrder[a.month] - monthOrder[b.month];
        });

        res.json(statsArray);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching enrollment stats', error: err.message });
    }
};
const getEnrollmentsByDayForCourseAndMonth = async (req, res) => {
    const { courseId } = req.params;
    const { date } = req.query;
    const user = req.session.user;

    if (!date) {
        return res.status(400).json({ message: 'Please provide date in query params (YYYY-MM-DD)' });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.teacher.toString() !== user.id) {
            return res.status(403).json({ message: 'Access denied - Not course owner' });
        }

        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const enrollments = await Enrollment.find({
            course: courseId,
            enrolledAt: { $gte: startOfDay, $lte: endOfDay }
        }).populate('student', 'name email');

        const users = enrollments.map(({ student }) => ({
            id: student._id,
            name: student.name,
            email: student.email
        }));

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching enrollments by day', error: err.message });
    }
};



module.exports = { enrollToCourse, getCourseEnrollments, getMonthlyEnrollmentsStatsForCourse, getEnrollmentsByDayForCourseAndMonth };
