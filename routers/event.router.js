// Import required dependencies
const express = require('express');
const EventController = require('../controllers/events.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware'); // Middleware for authentication

// Create the Express router
const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: This route allows retrieving a list of all events.
 *     responses:
 *       200:
 *         description: Events list successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Rock Concert"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-12-25"
 *                   location:
 *                     type: string
 *                     example: "Stade de France"
 *       500:
 *         description: Internal server error.
 */
router.get('/', EventController.getAllEvents); // Retrieve all events

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve a specific event by its ID
 *     description: This route allows retrieving the details of a specific event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Event details successfully retrieved.
 *       404:
 *         description: Event not found with the specified ID.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', EventController.getEventById); // Retrieve an event by its ID

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: This route allows creating a new event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the event.
 *               location:
 *                 type: string
 *                 description: The location of the event.
 *     responses:
 *       201:
 *         description: Event successfully created.
 *       400:
 *         description: Missing or invalid parameters.
 *       500:
 *         description: Internal server error.
 */
router.post('/', EventController.createEvent); // Create an event

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: This route allows updating the details of an existing event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event successfully updated.
 *       400:
 *         description: Missing or invalid parameters.
 *       404:
 *         description: Event not found with the specified ID.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', EventController.updateEvent); // Update an event by its ID

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an existing event
 *     description: This route allows deleting an event by its ID. Authentication token is required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to delete.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Event successfully deleted.
 *       401:
 *         description: Authentication failed or token missing.
 *       404:
 *         description: Event not found with the specified ID.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticateToken, EventController.deleteEvent); // Delete an event by its ID

/**
 * @swagger
 * /events/{id}/participants:
 *   get:
 *     summary: Retrieve participants of an event
 *     description: This route allows retrieving a list of participants for a specific event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of participants successfully retrieved.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id/participants', EventController.getEventParticipants); // Retrieve event participants

/**
 * @swagger
 * /events/{id}/participants:
 *   post:
 *     summary: Add a participant to an event
 *     description: This route allows adding a participant to a specific event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantId:
 *                 type: integer
 *                 description: The ID of the participant.
 *     responses:
 *       201:
 *         description: Participant successfully added.
 *       400:
 *         description: Missing or invalid parameters.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/:id/participants', EventController.addParticipant); // Add a participant to an event

module.exports = router;
