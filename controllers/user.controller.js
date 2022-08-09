const JWT = require('jsonwebtoken');
const UserService = require('../services/UserService');
const UserModel = require('../models/UserSchema');

module.exports = class User {
    static async apiCreateUser(req, res, next) {
        try {
            // checks if user already exists in the database
            const existing_user = await UserModel.findOne({ username: req.body.username });
            if (existing_user) return res.status(400).send('User Already Exists');

            // creating signatures according to the role of the user
            // if the user is registering as an admin
            let auth_token;

            if (req.body.role === 'admin') {
                auth_token = JWT.sign(
                    {
                        username: req.body.username,
                        role: req.body.role
                    },
                    process.env.ADMIN_TOKEN
                );
            }
            if (req.body.role === 'employee') {
                auth_token = JWT.sign(
                    {
                        username: req.body.username,
                        role: req.body.role
                    },
                    process.env.EMP_TOKEN
                );
            }

            const creation_data = new UserModel({
                username: req.body.username,
                role: req.body.role,
                auth_token: auth_token
            });

            const new_user = await UserService.createUser(creation_data);
            res.json({
                auth_token: new_user.auth_token
            });
        }
        catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}