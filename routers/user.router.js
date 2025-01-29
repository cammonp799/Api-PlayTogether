const express = require('express');
const UserController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware'); // Middleware pour l'authentification
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows you to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 description: User's full name.
 *                 example: "Jean Dupont"
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Missing or invalid parameters.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', UserController.register); // Register a new user

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: This endpoint allows a user to log in using their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticating future requests.
 *                   example: "your_jwt_token"
 *       400:
 *         description: Missing or invalid parameters.
 *       401:
 *         description: Authentication failed, incorrect email or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', UserController.login); // Log in a user

/**
 * @swagger
 * /auth/update:
 *   put:
 *     summary: Update user information
 *     description: This endpoint allows updating user information.
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's new email.
 *                 example: "new_email@example.com"
 *               password:
 *                 type: string
 *                 description: The user's new password.
 *                 example: "newpassword123"
 *               name:
 *                 type: string
 *                 description: The user's new name.
 *                 example: "Jean Dupont"
 *     responses:
 *       200:
 *         description: User successfully updated.
 *       400:
 *         description: Missing or invalid parameters.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.put('/update', authenticateToken, UserController.update); // Update user information

/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: Delete a user
 *     description: This endpoint allows deleting a user.
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete', authenticateToken, UserController.delete); // Delete a user

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves all users.
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: List of users successfully retrieved.
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Internal server error.
 */
router.get('/', UserController.getAllUsers); // Get all users

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: This endpoint retrieves a specific user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: User successfully retrieved.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', UserController.getUserById); // Get a user by ID

module.exports = router;
