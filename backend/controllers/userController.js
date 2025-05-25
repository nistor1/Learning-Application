const User = require('../models/User');
const {isAdmin} = require("../middleware/authMiddleware");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -__v');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error on find all' });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password -__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error on find by id' });
    }
};

// Create user
const createUser = async (req, res) => {
    const { name, email, admin ,password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const newUser = new User({ name, email, admin, password });
        await newUser.save();

        res.status(201).json({ message: 'User created', id: newUser._id });
    } catch (err) {
        res.status(500).json({ error: 'Error on create' });
    }
};

// Update user
const updateUser = async (req, res) => {
    const { id, name, email, admin, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        if(admin) {
            user.admin = admin;
        } else {
            user.admin = false;
        }
        user.password = password || user.password;

        await user.save();
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: 'Error on update' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error on delete' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
