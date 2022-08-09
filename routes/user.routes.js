const Route = require('express').Router();
const UserController = require('../controllers/user.controller');

Route.post('/new', UserController.apiCreateUser);

module.exports = Route;