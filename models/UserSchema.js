const Mongoose = require('mongoose');

const user_schema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    auth_token: {
        type: String,
        required: true
    }
}, 
{
    collection: 'users'
});

module.exports = Mongoose.model('UserModel', user_schema);