const express = require('express');
const router = express.Router();
const { onLogin, registerUser } = require('../controllers/user.controller');

router.route('/login').post(onLogin);
router.route('/register').post(registerUser);


module.exports = router;