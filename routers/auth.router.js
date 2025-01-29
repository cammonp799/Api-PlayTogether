// Importation de la librairie Express
const express = require('express');

// Importation du contrôleur d'utilisateur (ici, le fichier qui gère les opérations de connexion)
const UserController = require('../controllers/user.controller');

// Création d'un nouveau routeur Express pour organiser les routes liées à l'authentification
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Cette route permet à un utilisateur de se connecter en envoyant son email et son mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse email de l'utilisateur.
 *                 example: jean.dupont@example.com
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie, un token d'authentification est retourné.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie."
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nom:
 *                           type: string
 *                           example: "Jean Dupont"
 *                         email:
 *                           type: string
 *                           example: "jean.dupont@example.com"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkplYW4gRHVwb250In0.Yz5v...."
 *       400:
 *         description: Erreur de connexion, email ou mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Mot de passe incorrect."
 *       500:
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur."
 */

router.post('/login', UserController.login);

// Exportation du routeur afin qu'il puisse être utilisé dans d'autres fichiers (par exemple, dans le fichier principal de l'application)
module.exports = router;
