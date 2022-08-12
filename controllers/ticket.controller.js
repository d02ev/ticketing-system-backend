const JWT = require('jsonwebtoken');
const TicketService = require('../services/TicketService');
const UserService = require('../services/UserService');

module.exports = class Ticket {
    static async apiCreateTicket(req, res, next) {
        try {
            const new_ticket = await TicketService.createTicket(req.body);
            res.json({
                ticket_id: new_ticket._id
            });
        }
        catch (error) {
            res.json({
                error: error
            })
        }
    }

    static async apiGetAllTickets(req, res, next) {
        try {
            const all_tickets = await TicketService.getAllTickets();
            res.json(all_tickets);
        }
        catch (error) {
            res.json({
                error: error
            });
        }
    }

    static async apiGetTicketsByStatus(req, res, next) {
        try {
            const all_tickets_by_status = await TicketService.getTicketsByStatus(req.query.status);
            res.json(all_tickets_by_status);
        }
        catch (error) {
            res.json({
                error: error
            }); 
        }
    }

    static async apiGetTicketsByTitle(req, res, next) {
        try {
            const all_tickets_by_title = await TicketService.getTicketsByTitle(req.query.title);
            res.json(all_tickets_by_title);
        }
        catch (error) {
            res.json({
                error: error
            });
        }
    }

    static async apiGetTicketsByPriority(req, res, next) {
        try {
            const all_tickets_by_priority = await TicketService.getTicketsByPriority(req.query.priority);
            res.json(all_tickets_by_priority);
        }
        catch (error) {
            res.json({
                error: error
            });
        }
    }

    static async apiCloseTicket(req, res, next) {
        try {
            const ticket_by_id = await TicketService.getTicketByID(req.body.ticket_id);

            // ticket cannot be closed if higher priority tickets already exist for the user
            const user_assigned = ticket_by_id.assigned_to;
            const ticket_priority_user_assigned_to = ticket_by_id.priority;

            // creating signatures according to the role of the user
            const user_by_name = await UserService.getUserByName(user_assigned);
            const user_role = user_by_name.role;
            let auth_token;

            if (user_role === 'admin') {
                auth_token = JWT.sign(
                    {
                        ticket_id: req.body.ticket_id,
                        role: 'admin'
                    },
                    process.env.ADMIN_TOKEN
                );
            }
            if (user_role === 'employee') {
                auth_token = JWT.sign(
                    {
                        ticket_id: req.body.ticket_id,
                        role: 'employee'
                    },
                    process.env.EMP_TOKEN
                );
            }

            // find all tickets assigned to the user and their priorities
            const tickets_by_user = await TicketService.getTicketsByUser(user_assigned);

            tickets_by_user.forEach(ticket => {
                if (ticket_priority_user_assigned_to === 'low' && (ticket.priority === 'high' || ticket.priority === 'medium')) {
                    res.status(403).send('Higher Priority Ticket(s) Remain(s) To Be Closed').json(ticket);
                }
                if (ticket_priority_user_assigned_to === 'medium' && ticket.priority === 'high') {
                    res.status(403).send('A Higher Priority Ticket(s) Remain(s) To Be Closed').json(ticket);
                }
            });

            await TicketService.closeTicket(req.body.ticket_id);
            res.status(200).send(`Ticket #${req.body.ticket_id} Has Been Successfully Closed!`); 
        }
        catch (error) {
            res.json({
                error: error
            });
        }
    }

    static async apiDeleteTicket(req, res, next) {
        try {
            await TicketService.deleteTicket(req.body.ticket_id);
            res.status(200).send(`Ticket #${req.body.ticket_id} Has Been Successfully Deleted!`);
        }
        catch (error) {
            res.json({
                error: error
            })
        }
    }
}