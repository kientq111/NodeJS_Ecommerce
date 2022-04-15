const res = require('express/lib/response');

const User = require('../model/userModel');
const { generateToken, verifyToken } = require('../utils/generateToken');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs/dist/bcrypt');
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await User.create({ name, email, password });
    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id),
        });
    } else {

    }
}

const getUsers = async(req, res) => {
    const users = await User.find({});
    res.json(users);
}

const authLogin = expressAsyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (user && checkPassword) {
        res.json({
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Pwd');
    }
})

const getUserProfile = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
})

const updateUserProfile = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error('User not found');
    }
})

const deleteUser = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.send('Delete!')
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});


const getUserById = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});

const updateUserById = expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, getUsers, authLogin, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUserById };