const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, admin, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already used' });
        }

        const newUser = new User({ name, email, admin, password });
        await newUser.save();

        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            admin: newUser.admin
        };

        res.status(201).json({
            message: 'User registered and logged in',
            user: req.session.user
        });
    } catch (err) {
        res.status(500).json({ error: 'Register error', details: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Bad Credentials' });
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin
        };

        res.json({
            message: 'Logged in successfully',
            user: req.session.user
        });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};

module.exports = { registerUser, loginUser };
