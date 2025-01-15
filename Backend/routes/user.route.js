const express = require('express');
const router = express.Router();
const { onLogin, registerUser, deleteUser, updateUser, getAllUsers } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticate');

router.route('/login').post(onLogin);
router.route('/register').post(registerUser);
router.route('/update/:userID').put(authenticateToken, updateUser);
router.route('/').get(authenticateToken, getAllUsers);
router.route('/deleteUser/:userID').delete(authenticateToken, deleteUser);


module.exports = router;