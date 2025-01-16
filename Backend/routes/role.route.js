const express = require('express');
const router = express.Router();
const { createRole, getAllRolesDetails, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/role.controller');
const authenticateToken = require('../middlewares/authenticate');

// Create a role
router.route('/create').post(authenticateToken, createRole);

// Get all roles
router.route('/').get(authenticateToken, getAllRoles);
router.route('/details').get(authenticateToken, getAllRolesDetails);

// Get role by ID
router.route('/:id').get(authenticateToken, getRoleById);

// Update a role
router.route('/:id').put(authenticateToken, updateRole);

// Delete a role
router.route('/:id').delete(authenticateToken,deleteRole);

module.exports = router;
