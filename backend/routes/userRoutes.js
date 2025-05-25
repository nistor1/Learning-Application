const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.get('/', protect, isAdmin, getUsers);
router.get('/:id', protect, getUserById);
router.post('/', protect, isAdmin, createUser);
router.put('/', protect, isAdmin, updateUser);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
