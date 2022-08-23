const JWT = require('jsonwebtoken');
const TicketService = require('../services/TicketService');

const verifyToken = async (req, res, next) => {
    const auth_token = req.headers['x-access-token'];

    // if the token is not present in the header
    if (!auth_token) {
        return res.status(403).send('An Auth Token is Required for the Action');
    }

    try {
        const decoded_payload = JWT.verify(auth_token, process.env.EMP_TOKEN);
        const requested_ticket = await TicketService.getTicketByID(req.body.ticket_id);

        if (requested_ticket.assigned_to === decoded_payload.username) {
            req.closing_ticket = decoded_payload;
        }
        else {
            throw new Error('You are Not Authorised for the Action');
        }
    }
    catch (error) {
        return res.status(401).send('You Are Not Authorised for the Action!');
    }

    return next();
};

module.exports = verifyToken;