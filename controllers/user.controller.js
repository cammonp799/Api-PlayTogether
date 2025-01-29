const UserService = require('../services/user.service'); // Import the user service

class UserController {
    // User login
    static async login(req, res) {
        const { email, mdp } = req.body;

        if (!email || !mdp) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.',
            });
        }

        try {
            const { user, token } = await UserService.loginUser(email, mdp);

            return res.status(200).json({
                success: true,
                message: 'Login successful.',
                data: {
                    user,
                    token,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // User registration
    static async register(req, res) {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and name are required.',
            });
        }

        try {
            const { user, token } = await UserService.registerUser(email, password, name);

            return res.status(201).json({
                success: true,
                message: 'User created successfully.',
                data: {
                    user,
                    token,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Update user information
    static async update(req, res) {
        const { email, name, password } = req.body;
        const userId = req.user.id; // Extract user ID from the token or session

        if (!email && !name && !password) {
            return res.status(400).json({
                success: false,
                message: 'At least one field (email, name, or password) must be provided.',
            });
        }

        try {
            const updatedUser = await UserService.updateUser(userId, email, name, password);

            return res.status(200).json({
                success: true,
                message: 'User updated successfully.',
                data: updatedUser,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Delete a user
    static async delete(req, res) {
        const userId = req.user.id; // Extract user ID from the token or session

        try {
            const deletedUser = await UserService.deleteUser(userId);

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully.',
                data: deletedUser,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            return res.status(200).json({
                success: true,
                message: 'Users list retrieved successfully.',
                data: users,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving users.',
                error: error.message,
            });
        }
    }

    // Get user by ID
    static async getUserById(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        try {
            const user = await UserService.getUserById(parseInt(id)); // Ensure that the ID is an integer

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User retrieved successfully.',
                data: user,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving the user.',
                error: error.message,
            });
        }
    }
}

module.exports = UserController;
