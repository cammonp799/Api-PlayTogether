const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Function to create a new event
 * @param {Object} eventData - Object containing the event details (name, date, location, userId)
 * @returns {Object} - Created event
 */
const createEvent = async ({ nom, date_evenement, localisation, id_user }) => {
    try {
        const newEvent = await prisma.event.create({
            data: {
                nom,
                date_evenement,
                localisation,
                id_user,  // Add the user ID when creating the event
            },
        });
        return newEvent;
    } catch (error) {
        console.error('Error while creating the event:', error);
        throw error;
    }
};

/**
 * Function to retrieve all events
 * @returns {Array} - List of all events
 */
const getAllEvents = async () => {
    try {
        const events = await prisma.event.findMany({
            include: {
                user: true,  // Include associated user data
                participations: true,  // Include participation data if necessary
            },
        });
        return events;
    } catch (error) {
        console.error('Error while retrieving events:', error);
        throw error;
    }
};

/**
 * Function to retrieve a specific event by its ID
 * @param {number} id - ID of the event to retrieve
 * @returns {Object} - Event details
 */

const getEventById = async (id) => {
    try {
        console.log("🔍 Vérification de l'événement avec ID :", id);

        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) }, // Convertit l'ID en entier
            include: {
                user: true,
                participations: true,
            },
        });

        if (!event) {
            console.log("❌ Aucune donnée trouvée pour l'ID :", id);
        } else {
            console.log("✅ Données de l'événement récupérées :", event);
        }

        return event;
    } catch (error) {
        console.error("🔥 Erreur dans EventService.getEventById :", error);
        throw error;
    }
};

/**
 * Function to update an event by its ID
 * @param {number} id - ID of the event to update
 * @param {Object} eventData - Object containing updated event details (name, date, location, userId)
 * @returns {Object} - Updated event
 */
const updateEventById = async (id, { nom, date_evenement, localisation, id_user }) => {
    try {
        // Find and update the event
        const updatedEvent = await prisma.event.update({
            where: {
                id: parseInt(id),  // Ensure the ID is an integer
            },
            data: {
                nom,
                date_evenement,
                localisation,
                id_user,  // The ID of the user modifying the event
            },
            include: {
                user: true,  // Include associated user data
                participations: true,  // Include participation data if necessary
            },
        });

        return updatedEvent;
    } catch (error) {
        console.error('Error while updating the event:', error);
        throw error;
    }
};

/**
 * Function to delete an event by its ID
 * @param {number} id - ID of the event to delete
 * @returns {Object} - Deleted event
 */
const deleteEventById = async (id) => {
    try {
        // Check if the event exists before deleting it
        const existingEvent = await prisma.event.findUnique({
            where: {
                id: parseInt(id),  // Ensure the ID is an integer
            },
        });

        if (!existingEvent) {
            throw new Error("Event not found.");
        }

        // Delete the event
        const deletedEvent = await prisma.event.delete({
            where: {
                id: parseInt(id),
            },
        });

        return deletedEvent;
    } catch (error) {
        console.error("Error while deleting the event:", error);
        throw error;
    }
};

/**
 * Function to get all participants of an event
 * @param {number} eventId - The ID of the event
 * @returns {Array} - List of participants
 */
const getEventParticipants = async (eventId) => {
    try {
        const participants = await prisma.participation.findMany({
            where: {
                id_event: parseInt(eventId, 10),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nom: true,
                        email: true,
                    },
                },
            },
        });

        return participants.map(participation => participation.user);
    } catch (error) {
        console.error('Error while retrieving event participants:', error);
        throw error;
    }
};

/**
 * Add a participant to an event
 */
const addParticipantToEvent = async (eventId, userId) => {
    try {
        // Add the participant to the event by creating an entry in the 'participants' table
        const participant = await prisma.participant.create({
            data: {
                eventId: eventId,
                userId: userId,
            },
        });

        return participant;
    } catch (error) {
        console.error('Error adding participant:', error);
        throw new Error('Failed to add participant.');
    }
};



// Export functions to be used in other parts of the application
module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    getEventParticipants,
    addParticipantToEvent
};
