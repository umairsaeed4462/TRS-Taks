const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, approvedEvent, getActiveEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { joinEvent } = require('../controllers/join-event.controller');


router.route('/create').post(createEvent);
router.route('/').get(getAllEvents);
router.route('/getAllActiveEvents').get(getActiveEvents);
router.route('/eventsByUserID/:userID').get(getEventById);
router.route('/updateEvent/:eventId').put(updateEvent);
router.route('/deleteEvent/:eventId').delete(deleteEvent);

router.route('/join').post(joinEvent);
router.route('/approved/:eventId').patch(approvedEvent);

module.exports = router;
