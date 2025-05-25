const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'You are logout' });
    }
});
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Session ended' });
    });
});


module.exports = router;
