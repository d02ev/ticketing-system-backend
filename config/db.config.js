const Mongoose = require('mongoose');
const { DB_URI } = process.env;

exports.connectDB = () => {
    Mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to DB Successfully!")
        })
        .catch((error) => {
            console.log("Database Connection Failed! Exiting...");
            console.error(error);
            process.exit(1);
        });
};