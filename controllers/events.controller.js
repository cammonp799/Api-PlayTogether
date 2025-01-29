const EventService = require("../services/events.service");

class EventController {
  // Method to get all events
  static async getAllEvents(req, res) {
    try {
      const events = await EventService.getAllEvents();
      return res.status(200).json({
        success: true,
        message: 'Events retrieved successfully.',
        data: events,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving events.',
      });
    }
  }

  // Method to get an event by ID
  static async getEventById(req, res) {
    try {
      const eventId = req.params.id;

      console.log("➡️ Request to retrieve the event with ID:", eventId);

      if (!eventId) {
        console.log("⚠️ Invalid event ID");
        return res.status(400).json({
          success: false,
          message: "Invalid event ID.",
        });
      }

      const event = await EventService.getEventById(eventId);

      if (!event) {
        console.log("❌ No event found with this ID:", eventId);
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      console.log("✅ Event found:", event);

      return res.status(200).json({
        success: true,
        message: "Event retrieved successfully.",
        data: event,
      });
    } catch (error) {
      console.error("🔥 Error in EventController.getEventById:", error);
      return res.status(500).json({
        success: false,
        message: "Error retrieving the event.",
      });
    }
  }

  // Method to create a new event
  static async createEvent(req, res) {
    try {
      const { nom, date_evenement, localisation, id_user } = req.body;
      if (!nom || !date_evenement || !localisation || !id_user) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required (name, date, location, user).',
        });
      }

      const newEvent = await EventService.createEvent({ nom, date_evenement, localisation, id_user });
      return res.status(201).json({
        success: true,
        message: 'Event created successfully.',
        data: newEvent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error creating the event.',
      });
    }
  }

  // Method to update an event by ID
  static async updateEvent(req, res) {
    try {
      const eventId = req.params.id;
      const { nom, date_evenement, localisation, id_user } = req.body;

      const updatedEvent = await EventService.updateEventById(eventId, { nom, date_evenement, localisation, id_user });

      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message: 'Event not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Event updated successfully.',
        data: updatedEvent,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error updating the event.',
      });
    }
  }

  // Method to delete an event by ID
  static async deleteEvent(req, res) {
    try {
      const eventId = req.params.id;
      const deletedEvent = await EventService.deleteEventById(eventId);

      if (!deletedEvent) {
        return res.status(404).json({
          success: false,
          message: 'Event not found.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Event deleted successfully.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting the event.',
      });
    }
  }

  /**
   * Get all participants of an event
   */
  static async getEventParticipants(req, res) {
    try {
      const eventId = req.params.id;

      if (!eventId || isNaN(eventId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid event ID.',
        });
      }

      const participants = await EventService.getEventParticipants(eventId);

      if (!participants.length) {
        return res.status(404).json({
          success: false,
          message: 'No participants found for this event.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Participants list retrieved successfully.',
        data: participants,
      });
    } catch (error) {
      console.error('Error retrieving participants:', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving participants.',
      });
    }
  }

  /**
   * Add a participant to an event
   */
  static async addParticipant(req, res) {
    try {
      const { eventId } = req.params; // Event ID from the URL
      const { userId } = req.body;   // User ID from the request body

      // Check if event ID and user ID are valid
      if (!eventId || isNaN(eventId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid event ID.',
        });
      }

      if (!userId || isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID.',
        });
      }

      // Add the participant to the event
      const participantAdded = await EventService.addParticipantToEvent(eventId, userId);

      if (!participantAdded) {
        return res.status(404).json({
          success: false,
          message: 'Event or user not found.',
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Participant added successfully.',
        data: participantAdded,
      });
    } catch (error) {
      console.error('Error adding participant:', error);
      return res.status(500).json({
        success: false,
        message: 'Error adding participant.',
      });
    }
  }


}

module.exports = EventController;
