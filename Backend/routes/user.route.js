const express = require('express');
const router = express.Router();
const { onLogin, registerUser, deleteUser, updateUser, getAllUsers } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticate');

router.route('/login').post(onLogin);
router.route('/register').post(registerUser);
router.route('/update/:userID').put(updateUser);
router.route('/').get(getAllUsers);
router.route('/deleteUser/:userID').delete(deleteUser);


module.exports = router;