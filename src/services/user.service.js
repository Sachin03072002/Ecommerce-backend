const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
    try {
        const { firstName, lastName, email, password } = userData;
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error(`User already exists with email: ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });


        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");

        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }

        return user;
    } catch (error) {
        throw new Error(`Error finding user by ID: ${error.message}`);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }

        return user;
    } catch (error) {
        throw new Error(`Error finding user by email: ${error.message}`);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }

        return user;
    } catch (error) {
        throw new Error(`Error getting user profile by token: ${error.message}`);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(`Error getting all users: ${error.message}`);
    }
};

module.exports = { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers };
