const TicketModel = require('../models/TicketSchema');

module.exports = class TicketService {
    static async createTicket(creationData) {
        try {
            const new_ticket = {
                title: creationData.title,
                status: creationData.status,
                priority: creationData.priority,
                assigned_to: creationData.assigned_to
            }

            const response = await new TicketModel(new_ticket).save();
            return response;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async getAllTickets() {
        try {
            const all_tickets = await TicketModel.find();
            return all_tickets;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async getTicketsByStatus(status) {
        try {
            const tickets_by_status = await TicketModel.find({ status: status });
            return tickets_by_status;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async getTicketsByTitle(title) {
        try {
            const tickets_by_title = await TicketModel.find({ title: title });
            return tickets_by_title;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async getTicketsByPriority(priority) {
        try {
            const tickets_by_priority = await TicketModel.find({ priority: priority });
            return tickets_by_priority;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async closeTicket(ticketID) {
        try {
            const closing_ticket = await TicketModel.findByIdAndUpdate(ticketID, { status: 'close' });
            return closing_ticket;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async deleteTicket(ticketID) {
        try {
            const deleting_ticket = await TicketModel.findByIdAndDelete(ticketID);
            return deleting_ticket;
        }
        catch (error) {
            console.error(error);
        }
    }
}