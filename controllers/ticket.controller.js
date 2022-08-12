const JWT = require('jsonwebtoken');
const TicketService = require('../services/TicketService');

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
            // access the ticket queried through it's provided ID
            const ticket_by_id = await TicketService.getTicketByID(req.body.ticket_id);

            // access the user the ticket is assigned to
            const user_assigned = ticket_by_id.assigned_to;

            // access the priority of the queried ticket
            const ticket_priority = ticket_by_id.priority;

            // since admin has universal privileges, therefore there's only need to create a signature
            // for the employee the ticket is assigned to so that no other employee can close the ticket
            const close_auth_token = JWT.sign(
                {
                    username: user_assigned,
                    role: 'employee'
                },
                process.env.CLOSING_TICKET_TOKEN    // this token is different from other employee token, but has same payload  
            );

            // find all tickets assigned to the user
            const tickets_by_user = await TicketService.getTicketsByUser(user_assigned);
            let priority_counter = 0;

            tickets_by_user.forEach(ticket => {
                if ((ticket_priority === 'low' && (ticket.priority === 'medium' || ticket.priority === 'high')) || (ticket_priority === 'medium' && ticket.priority === 'high')) {
                    ++priority_counter;
                }
            });

            if (priority_counter > 0) {
                res.status(403).send('High Priority Tickets Need To Be Closed First!');
            }
            else {
                await TicketService.closeTicket(req.body.ticket_id);
                res.status(200).send(`Ticket #${req.body.ticket_id} Has Been Successfully Closed!`);
            }
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