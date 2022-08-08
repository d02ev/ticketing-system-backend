const UserModel = require('../models/UserSchema');

module.exports = class UserService {
    static async createUser(creationData) {
        try {
            const new_user = {
                username: creationData.username,
                role: creationData.role
            }

            const response = await new UserModel(new_user).save();
            return response;
        }
        catch (error) {
            console.error(error);
        }
    }
}