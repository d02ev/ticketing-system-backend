const Express = require('express');
const BodyParser = require('body-parser');
const Path = require('path');
const UserRoute = require('./routes/user.routes');
const TicketRoute = require('./routes/ticket.routes');
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

// routes
App.use('/api/v1/user', UserRoute); // create a new user

App.use('/api/v1/ticket', TicketRoute); // create, close and delete a ticket
App.use('/api/v1/tickets', TicketRoute);    // get all tickets, tickets with status, priority and title

// home page
App.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname + '/views/home.html'))
});

App.listen(
    process.env.PORT || 3358,
    () => console.log(`Server is Listening at http://localhost:${process.env.PORT}`)
);