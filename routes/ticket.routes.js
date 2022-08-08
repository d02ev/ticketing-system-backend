const Route = require('express').Router();
const TicketController = require('../controllers/ticket.controller');
const AdminAuth = require('../middleware/auth');

Route.post('/', AdminAuth, TicketController.apiCreateTicket);
Route.get('/', TicketController.apiGetAllTickets);
Route.get('/bystatus', TicketController.apiGetTicketsByStatus);
Route.get('/bytitle', TicketController.apiGetTicketsByTitle);
Route.get('/bypriority', TicketController.apiGetTicketsByPriority);

module.exports = Route;