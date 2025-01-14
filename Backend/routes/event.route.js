const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, approvedEvent, getActiveEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { joinEvent, dashboardReport } = require('../controllers/join-event.controller');
const authenticateToken = require('../middlewares/authenticate');

router.route('/create').post(authenticateToken, createEvent);
router.route('/').get(authenticateToken, getAllEvents);
router.route('/getAllActiveEvents').get(authenticateToken, getActiveEvents);
router.route('/eventsByUserID/:userID').get(authenticateToken, getEventById);
router.route('/updateEvent/:eventId').put(authenticateToken, updateEvent);
router.route('/deleteEvent/:eventId').delete(authenticateToken, deleteEvent);

router.route('/join').post(authenticateToken, joinEvent);
router.route('/approved/:eventId').patch(authenticateToken, approvedEvent);
router.route('/dashboardReport').get(authenticateToken, dashboardReport);

module.exports = router;
