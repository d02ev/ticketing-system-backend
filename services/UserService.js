const UserModel = require('../models/UserSchema');

module.exports = class UserService {
    static async createUser(creationData) {
        try {
            const new_user = {
                username: creationData.username,
                role: creationData.role,
                auth_token: creationData.auth_token
            }

            const response = await new UserModel(new_user).save();
            return response;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async getUserByName(userName) {
        try {
            const user_by_name = await UserModel.findOne({ username: userName });
            return user_by_name;
        }
        catch (error) {
            console.error(error);
        }
    }
}