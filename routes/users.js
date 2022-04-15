var express = require('express');
var router = express.Router();
const { registerUser, getUsers, authLogin, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUserById } = require('../controller/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// 1.
// @desc: Register new user
// @route: POST /api/users
// @access: Public - return token
router.post('/register', registerUser);

// 2.
// @desc: Login API
// @route: POST /api/users/login
// @access: Public - return token
router.post('/login', authLogin);

// 2.
// @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get('/', protect, isAdmin, getUsers);

// 4.
// @desc: Get profile user
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get('/profile', protect, getUserProfile);

// 5.
// @desc: Update profile user
// @route: PUT /api/users/profile
// @access: Private - Su dung token
router.put('/profile', protect, updateUserProfile);

// 6.
// @desc Delete user
// @route: GET /api/users/:id
// @access: Private/admin
router.delete('/:id', protect, isAdmin, deleteUser);

// 7.
// @desc Get user by Id
// @route: GET /api/users/:id
// @access: Private/admin
router.get('/:id', protect, isAdmin, getUserById);

// 8.
// @desc Update by Id
// @route: PUT /api/users/:id
// @access: Private/admin
router.put('/:id', protect, isAdmin, updateUserById);


module.exports = router;