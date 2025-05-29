const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    fieldOfInterest: { type: String, required: true },
    period: { type: String, required: true },
    availableSeats: { type: Number, default: 0 },
    languages: { type: [String], default: [] },
    lessons: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
