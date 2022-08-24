const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const auth_token = req.headers['x-access-token'];

    // if the token is not present in the header
    if (!auth_token) {
        return res.status(403).send('An Auth Token is Required for the Action');
    }
    if (req.closing_ticket) {
        return next();
    }

    try {
        const decoded_payload = JWT.verify(auth_token, process.env.ADMIN_TOKEN);
        req.closing_ticket = false;
    }
    catch (error) {
        return res.status(401).send('You Are Not Authorised for the Action!');
    }

    return next();
};

module.exports = verifyToken;