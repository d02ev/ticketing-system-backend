const Express = require('express');
const BodyParser = require('body-parser');
const Path = require('path');
require('dotenv/config');
require('./config/db').connectDB(); // database connection

const App = Express();

// body-parser config
App.use(Express.json());
App.use(BodyParser.urlencoded(
    {
        extended: true
    }
));
App.use(BodyParser.json());

// home page
App.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname + '/views/home.html'))
});

App.listen(
    process.env.PORT || 3358,
    () => console.log(`Server is Listening at http://localhost:${process.env.PORT}`)
);