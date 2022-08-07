const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const Path = require('path');
require('dotenv/config');

const App = Express();


// home page
App.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname + '/views/home.html'))
});

// db connection
Mongoose.connect(
    process.env.DB_URI,
    () => console.log("Connected to the DB Successfully!")
);

App.listen(
    process.env.PORT || 3358,
    () => console.log(`Server is Listening at http://localhost:${process.env.PORT}`)
);