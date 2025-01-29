const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, nom: user.nom, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
};

// Log in user
const loginUser = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('User not found.');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.mdp);
        if (!isPasswordValid) {
            throw new Error('Incorrect password.');
        }

        // Generate token
        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Register new user
const registerUser = async (email, password, name) => {
    try {
        // Check if email is already in use
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('Email already in use.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        const newUser = await prisma.user.create({
            data: {
                email,
                mdp: hashedPassword,
                nom: name,
            },
        });

        // Generate token for the new user
        const token = generateToken(newUser);

        return { user: newUser, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update user information
const updateUser = async (userId, email, name, password) => {
    try {
        const updatedData = {};

        if (email) {
            updatedData.email = email;
        }
        if (name) {
            updatedData.nom = name;
        }
        if (password) {
            updatedData.mdp = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });

        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete user
const deleteUser = async (userId) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });

        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                nom: true,
                email: true,
            },
        });

        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get user by ID
const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) }, // Convertir userId en entier
            select: {
                id: true,
                nom: true,
                email: true,
            },
        });

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
};
