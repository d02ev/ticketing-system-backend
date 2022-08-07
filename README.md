# Ticketing System Backend

## Content

- [Introduction](#introduction)
- [Details](#details)
  - [User Registration](#user-registration)
  - [Raising A Ticket](#raising-a-ticket)
  - [Get Ticket Details](#get-ticket-details)
  - [Closing Tickets](#closing-tickets)
  - [Deleting Tickets](#deleting-tickets)
- [Tech Stack Used](#tech-stack-used)
- [Live URL](#live-URL)

### Introduction

A ticketing system is a management tool that processes and catalogs customer service requests. Tickets, also known as cases or issues, need to be properly stored alongside relevant user information.

This project works the similar way but instead of creating a full-fledged ticketing system, I'll be working mainly upon the backend.

### Details

- #### User Registration

  - Endpoint: ```/users/new```
  - Request type: ```POST```
  - Body params:
    - ```username```
    - ```role (admin/employee)```
  - Return type: ```Auth token```

- #### Raising a Ticket

  - Endpoint: ```/tickets/new```
  - Request type: ```POST```
  - Body Params:
    - ```title```
    - ```description```
  - Return type: ```ticket ID```
  - Note: ```ticket can only be raised if the auth token is of an admin```

- #### Get Ticket Details

  - Endpoints:
    - Get all tickets: ```/tickets/all```
    - Get tickets of specific status (open/close): ```/tickets/?status=<status>```
    - Get tickets with a specific title: ```/tickets/?title=<title>```
    - Get tickets according to priority (high/medium/low): ```/tickets/?priority=<priority>```
  - Request type: ```GET```
  - Return type: ```tickets according to the specifications```

- #### Closing Tickets

  - Endpoint: ```/tickets/close```
  - Request type: ```POST```
  - Body param: ```ticket ID```
  - Note:
    - ```auth token of the user assigned to the ticket can only close the ticket or the admin.```
    - ```ticket cannot be closed if another higher priority ticket has been assigned to the same user, returning and error and all tasks of a higher priority.```

- #### Deleting Tickets

  - Endpoint: ```/tickets/delete```
  - Request type: ```POST```
  - Body param: ```ticket ID```
  - Note: ```only admins can delete tickets```

### Tech Stack Used

- [NodeJS](https://www.nodejs.org/)
- [ExpressJS](https://www.expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/efficiency?adgroup=115749713423)

### Live URL
