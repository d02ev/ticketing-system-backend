const Route = require('express').Router();
const TicketController = require('../controllers/ticket.controller');
const CreateTicketAuth = require('../middleware/ticket_create_auth');
const CloseTicketAdminAuth = require('../middleware/ticket_close_admin_auth');
const CloseTicketEmpAuth = require('../middleware/ticket_close_emp_auth');
const DeleteTicketAuth = require('../middleware/ticket_delete_auth');

Route.post('/new', CreateTicketAuth, TicketController.apiCreateTicket);
Route.get('/all', TicketController.apiGetAllTickets);
Route.get('/bystatus', TicketController.apiGetTicketsByStatus);
Route.get('/bytitle', TicketController.apiGetTicketsByTitle);
Route.get('/bypriority', TicketController.apiGetTicketsByPriority);
Route.post('/close', CloseTicketEmpAuth, CloseTicketAdminAuth, TicketController.apiCloseTicket);
Route.post('/delete', DeleteTicketAuth, TicketController.apiDeleteTicket);

module.exports = Route;