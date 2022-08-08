const JWT = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
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
}