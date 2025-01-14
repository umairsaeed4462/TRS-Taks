const { joinEventSchema, eventSchema } = require('../models/event.model');
const { StatusCode } = require('../consts/const');
const { responseHandler } = require('../utils/responseHandler');
const { userSchema } = require('../models/user.model');

// User joins an event
const joinEvent = async (req, res) => {
    const { eventID, userID } = req.body;
    
    try {
        if (eventID && userID) {
            const existingJoin = await joinEventSchema.findOne({ eventID, userID });
            if (existingJoin) {
                return responseHandler(res, StatusCode.BAD_REQUEST, 'User has already joined the event');
            }
            
            const event = await eventSchema.findById(eventID).populate('user attendees', 'username email');
            if(event){
                const attendees = event['attendees'];
                attendees.push(userID);
                const updatedEvent = await eventSchema.findByIdAndUpdate(
                    eventID,
                    { attendees },
                    { new: true }
                );
                   
            }
            // Create a new join record
            const newJoin = new joinEventSchema({ eventID, userID });
            await newJoin.save();

            return responseHandler(res, StatusCode.CREATED, 'User successfully joined the event', newJoin);
        } else {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Event ID and User ID are required');
        }
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

const dashboardReport = async (req, res) => {
    try {
        const totalEvents = await eventSchema.countDocuments();
        const totalApprovedEvents = await eventSchema.countDocuments({ status: 'approved' });
        const totalPendingEvents = await eventSchema.countDocuments({ status: 'pending' });
        const totalUsers = await userSchema.countDocuments();
        
        // Optionally, if you want other relevant data based on this query:
        const totalAttendees = await joinEventSchema.countDocuments();

        const summary = {
            totalEvents,
            totalApprovedEvents,
            totalPendingEvents,
            totalUsers,
            totalAttendees
        };

        return responseHandler(res, StatusCode.SUCCESS, "Dashboard summary retrieved successfully", summary);
    } catch (error) {
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

module.exports = {
    joinEvent,
    dashboardReport
};
