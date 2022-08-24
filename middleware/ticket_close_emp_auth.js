const JWT = require('jsonwebtoken');
const TicketService = require('../services/TicketService');

const verifyToken = async (req, res, next) => {
    const auth_token = req.headers['x-access-token'];

    // if the token is not present in the header
    if (!auth_token) {
        return res.status(403).send('An Auth Token is Required For The Action');
    }

    try {
        const decoded_payload = JWT.verify(auth_token, process.env.EMP_TOKEN);
        const requested_ticket = await TicketService.getTicketByID(req.body.ticket_id);

        if (requested_ticket.assigned_to === decoded_payload.username) {
            req.closing_ticket = true;
        }
        else {
            return res.status(401).send('You Are Not Authorised For The Action!');
        }
    }
    catch (error) {
        req.closing_ticket = true;
    }

    return next();
};

module.exports = verifyToken;