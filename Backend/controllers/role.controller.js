const { roleSchema } = require('../models/role.model'); // Assuming the file is named role.model.js
const { StatusCode } = require('../consts/const');
const { responseHandler } = require('../utils/responseHandler');

const createRole = async (req, res) => {
  try {
    const newRole = new roleSchema(req.body);
    await newRole.save();
    return responseHandler(res, StatusCode.CREATED, 'Role created successfully', newRole);
  } catch (error) {
    console.error(error);
    return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleSchema.find();
    return responseHandler(res, StatusCode.SUCCESS, 'Roles retrieved successfully', roles);
  } catch (error) {
    console.error(error);
    return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleSchema.findById(id);
    if (!role) {
      return responseHandler(res, StatusCode.NOT_FOUND, 'Role not found');
    }
    return responseHandler(res, StatusCode.SUCCESS, 'Role retrieved successfully', role);
  } catch (error) {
    console.error(error);
    return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role, permission } = req.body;
  try {
    const updatedRole = await roleSchema.findByIdAndUpdate(
      id,
      { role, permission },
      { new: true }
    );
    if (!updatedRole) {
      return responseHandler(res, StatusCode.NOT_FOUND, 'Role not found');
    }
    return responseHandler(res, StatusCode.SUCCESS, 'Role updated successfully', updatedRole);
  } catch (error) {
    console.error(error);
    return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRole = await roleSchema.findByIdAndDelete(id);
    if (!deletedRole) {
      return responseHandler(res, StatusCode.NOT_FOUND, 'Role not found');
    }
    return responseHandler(res, StatusCode.SUCCESS, 'Role deleted successfully', deletedRole);
  } catch (error) {
    console.error(error);
    return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
