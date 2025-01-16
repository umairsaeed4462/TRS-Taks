const { eventSchema } = require('../models/event.model');
const { StatusCode } = require('../consts/const');
const { responseHandler } = require('../utils/responseHandler');

// Create a new event
const createEvent = async (req, res) => {
    const { title, description, date, location, user } = req.body;
    try {
        if (title && description && date && location && user) {
            const newEvent = new eventSchema(req.body);
            await newEvent.save();
            return responseHandler(res, StatusCode.CREATED, 'Event created successfully', newEvent);
        } else {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Title, description, date, location, and user are required');
        }
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await eventSchema.find().populate('user attendees category', 'username email title');
        return responseHandler(res, StatusCode.SUCCESS, 'Events retrieved successfully', events);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

const getActiveEvents = async (req, res) => {
    try {
        const events = await eventSchema.find({status: 'approved'}).populate('user attendees', 'username email');
        return responseHandler(res, StatusCode.SUCCESS, 'Events retrieved successfully', events);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    const { userID } = req.params;
    try {
        const event = await eventSchema.find({user: userID}).populate('user attendees', 'username email');
        if (!event) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Event not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'Event retrieved successfully', event);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Update event details
const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, description, date, location, status, attendees } = req.body;
    try {
        const updatedEvent = await eventSchema.findByIdAndUpdate(
            eventId,
            req.body,
            { new: true }
        );
        if (!updatedEvent) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Event not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'Event updated successfully', updatedEvent);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const deletedEvent = await eventSchema.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Event not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'Event deleted successfully', deletedEvent);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Approved event details
const approvedEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const updatedEvent = await eventSchema.findByIdAndUpdate(
            eventId,
            { status: 'approved' },
            { new: true }
        );
        if (!updatedEvent) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Event not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'Event Approved successfully', updatedEvent);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getActiveEvents,
    approvedEvent
};
