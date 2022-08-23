const Mongoose = require('mongoose');

const ticket_schema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "open"
    },
    priority: {
        type: String,
        required: true,
        default: "low"
    },
    assigned_to: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, 
{
    collection: 'tickets'
});

module.exports = Mongoose.model("TicketModel", ticket_schema);