# Ticketing System Backend

## Content

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [Raising A Ticket](#raising-a-ticket)
  - [Get Ticket Details](#get-ticket-details)
  - [Closing Tickets](#closing-tickets)
  - [Deleting Tickets](#deleting-tickets)
- [Environment File Configuration](#environment-file-configuration)
- [Tech Used](#tech-used)
- [Resources](#resources)
- [Project Running Instructrions](#project-running-instructions)
- [Continued Development](#continued-development)

### Introduction

A ticketing system is a management tool that processes and catalogs customer service requests. Tickets, also known as cases or issues, need to be properly stored alongside relevant user information.

This project works the similar way but instead of creating a full-fledged ticketing system, I'll be working mainly upon the backend.

### API Endpoints

- #### User Registration

  - Endpoint: ```/api/v1/user/new```
  - Request type: ```POST```
  - Body params:
    - ```username```
    - ```role (admin/employee)```
  - Return type: ```Auth token```

- #### Raising a Ticket

  - Endpoint: ```/api/v1/tickets/new```
  - Request type: ```POST```
  - Body Params:
    - ```title```
    - ```description```
  - Return type: ```ticket ID```
  - Note: **ticket can only be raised if the auth token is of an admin**

- #### Get Ticket Details

  - Endpoints:
    - Get all tickets: ```/api/v1/tickets/all```
    - Get tickets of specific status (open/close): ```/api/v1/tickets/bystatus?status=<status>```
    - Get tickets with a specific title: ```/api/v1/tickets/bytitle?title=<title>```
    - Get tickets according to priority (high/medium/low): ```/api/v1/tickets/bypriority?priority=<priority>```
  - Request type: ```GET```
  - Return type: ```tickets according to the specifications```

- #### Closing Tickets

  - Endpoint: ```/api/v1/tickets/close```
  - Request type: ```POST```
  - Body param: ```ticket ID```
  - Note:
    - **auth token of the user assigned to the ticket can only close the ticket or the admin.**
    - **ticket cannot be closed if another higher priority ticket has been assigned to the same user, returning and error and all tasks of a higher priority.**

- #### Deleting Tickets

  - Endpoint: ```/api/v1/tickets/delete```
  - Request type: ```POST```
  - Body param: ```ticket ID```
  - Note: **only admins can delete tickets**

### Environment File Configuration

- ```NODE_ENV``` - Name of the node environment.
- ```PORT``` - Port number for the server to listen to.
- ```DB_URI``` - Database connection string for mongo db.
- ```ADMIN_TOKEN``` - JWT token signature string for admin.
- ```EMP_TOKEN``` - JWT token signature string for employee.

### Tech Used

- [NodeJS](https://www.nodejs.org/)
- [ExpressJS](https://www.expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/efficiency?adgroup=115749713423)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io)
- [Nodemon](https://www.npmjs.com/package/nodemon)

### Resources

- [Web Dev Simplified's Video on Express Middlewares](https://www.youtube.com/watch?v=lY6icfhap2o)
- [GeeksForGeeks' Article on Skipping a Middleware](https://www.geeksforgeeks.org/how-to-skip-a-middleware-in-express-js/)
- [Idris Olubisi's Article on Building An Authentication API with JWT Token](https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/)
- [Emmanuel Etukudo's Article on Understanding MVC Pattern in NodeJS](https://dev.to/eetukudo_/understanding-mvc-pattern-in-nodejs-2bdn)

### Project Running Instructions

1. Clone or download the project.

2. Create and configure the ```.env``` file with the given specifications in the root folder.

3. Run ```npm install``` command from the root folder.

4. To run the project use the command ```npm run devStart``` from the root folder. If the project configures itself properly you'll see ```Server is Listening at <PORT NUMBER>``` and ```Connected to DB Successfully!``` printed on the console.

5. Use **Postman** or any other API testing tool to test the routes.

### Continued Development

1. Will be working upon building a frontend for the project using [ReactJS](https://reactjs.org/).

2. Will also try to create a serverless backend for the project using [AWS](https://aws.amazon.com/).
