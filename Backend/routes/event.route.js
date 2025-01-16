const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, approvedEvent, getActiveEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/events.controller');
const { joinEvent, dashboardReport, dashboardReportByID } = require('../controllers/join-event.controller');
const authenticateToken = require('../middlewares/authenticate');

router.route('/create').post(authenticateToken, createEvent);
router.route('/').get( getAllEvents);
router.route('/getAllActiveEvents').get(authenticateToken, getActiveEvents);
router.route('/eventsByUserID/:userID').get(authenticateToken, getEventById);
router.route('/updateEvent/:eventId').put(authenticateToken, updateEvent);
router.route('/deleteEvent/:eventId').delete(authenticateToken, deleteEvent);

router.route('/join').post(authenticateToken, joinEvent);
router.route('/approved/:eventId').patch(approvedEvent);
router.route('/dashboardReport').get(authenticateToken, dashboardReport);
router.route('/dashboardReport/:userID').get(dashboardReportByID);

module.exports = router;
