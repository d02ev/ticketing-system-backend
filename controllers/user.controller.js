const JWT = require('jsonwebtoken');
const UserService = require('../services/UserService');
const UserModel = require('../models/UserSchema');

module.exports = class User {
    static async apiCreateUser(req, res, next) {
        // checks if user already exists in the database
        const existing_user = await UserModel.findOne({ username: req.body.username });
        if (existing_user) return res.status(400).send('User Already Exists');

        // creating an auth-token for the user
        const auth_token = JWT.sign({
            username: req.body.username
        }, 
        process.env.JWT_TOKEN,
        {
            expiresIn: "1h"
        });

        const creation_data = new UserModel({
            username: req.body.username,
            role: req.body.role,
            auth_token: auth_token
        });

        try {
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