const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const { StatusCode } = require('../consts/const');
const { responseHandler } = require('../utils/responseHandler');
const { userSchema } = require('../models/user.model');

const onLogin = async (req, res) => {
    let { username, password } = req.body;
    try {
        if (username && password) {
            const user = await userSchema.findOne({ username, password }).populate('role');
            if (!user) {
                return responseHandler(res, StatusCode.UNAUTHORIZED, 'Invalid credentials');
            } else {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT, { expiresIn: '5h' });
                return responseHandler(res, StatusCode.SUCCESS, 'Logged in successfully', { user, token });
            }
        } else {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Username, password & role are required');
        }

    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
}

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (username && email && password && role) {
            // Check if user already exists
            const userExists = await userSchema.findOne({ username });
            if (userExists) {
                return responseHandler(res, StatusCode.BAD_REQUEST, 'username already exists');
            }
            // Create new user;
            const newUser = new userSchema(req.body);
            await newUser.save();

            return responseHandler(res, StatusCode.CREATED, 'User registered successfully', newUser);
        } else {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Username, password & role are required');
        }
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find().populate('role');
        return responseHandler(res, StatusCode.SUCCESS, 'Users fetched successfully', users);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// update role and permissions
const updateUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const updatedUser = await userSchema.findByIdAndUpdate(userID, req.body, { new: true });
        if (!updatedUser) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'User not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'User updated successfully', updatedUser);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// delete a user
const deleteUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const deletedUser = await userSchema.findByIdAndDelete(userID);
        if (!deletedUser) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'User not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'User deleted successfully', deletedUser);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

module.exports = {
    onLogin,
    registerUser,
    updateUser,
    getAllUsers,
    deleteUser
};
