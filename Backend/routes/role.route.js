const express = require('express');
const router = express.Router();
const { createRole, getAllRolesDetails, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/role.controller');
const authenticateToken = require('../middlewares/authenticate');

// Create a role
router.route('/create').post(createRole);

// Get all roles
router.route('/').get(getAllRoles);
router.route('/details').get(getAllRolesDetails);

// Get role by ID
router.route('/:id').get(getRoleById);

// Update a role
router.route('/:id').put(updateRole);

// Delete a role
router.route('/:id').delete(deleteRole);

module.exports = router;
