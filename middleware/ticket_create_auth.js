const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const auth_token = req.headers["x-access-token"];

    // if the token is not present in the header
    if (!auth_token) {
        return res.status(403).send('An Auth Token is Required for the Action!');
    }

    // if token is present in the header
    try {
        const decode_token = JWT.verify(auth_token, process.env.ADMIN_TOKEN);
        req.new_ticket = decode_token;
    }
    catch (error) {
        return res.status(401).send("You Are Not Authorised for the Action!");
    }

    return next();
};

module.exports = verifyToken;