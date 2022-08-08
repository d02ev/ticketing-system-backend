const Route = require('express').Router();
const UserController = require('../controllers/user.controller');

Route.post('/', UserController.apiCreateUser);

module.exports = Route;