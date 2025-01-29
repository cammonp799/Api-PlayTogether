# PlayTogether - Social Football Platform

## Description

PlayTogether is a social football platform that allows users to connect, create and join football events. The platform offers user authentication (login/registration), the ability to organize and participate in football matches, view player statistics. It also includes features to update user profiles and manage event details.

## Features

- User Authentication: Login and register new users.
- Football Event Management: Create, update, and delete football events.
- Match Participation: Users can join and participate in football matches.
- User Profile Management: Users can update their profile information (name, location, etc.)

## Technologies Used

- Node.js: Backend runtime environment
- Express.js: Web framework for Node.js
- Prisma: ORM for interacting with the database
- Mysql: Database for storing user, event, and messaging data
- JWT: JSON Web Tokens for authentication
- bcrypt.js: Password hashing
- WebSocket: For real-time messaging and event updates

## Installation

Follow these steps to get the project up and running on your local machine:

### Prerequisites

1. Install Node.js and npm.
2. Install MySQL



### Step 1: Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/yourprojectname.git

cd playtogether
```

### Step 2: Install dependencies:

- `@prisma/client`: ^6.2.1
- `bcrypt`: ^5.1.1
- `cookie-parser`: ^1.4.7
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `express-openapi-validator`: ^5.4.2
- `jsonwebtoken`: ^9.0.2
- `swagger-jsdoc`: ^6.2.8
- `swagger-ui-express`: ^5.0.1
- `yamljs`: ^0.3.0

### Step 3: Set up the database:

1. Create a .env file in the root directory of the project.
2. Add the database connection string and other environment variables. 

```
DATABASE_URL=mysql://username:password@localhost:8889/PlayTogetherApi
JWT_SECRET_KEY=ta_clé_secrète

```

3. Install Prisma CLI:

```
npm install -g prisma

```

4. Run Prisma migrations to set up the database schema.

```
npx prisma migrate dev --name init

```

### Step 4: Start the server: 

```
node app.cjs
```
The server should now be running at http://localhost:4000

## API Endpoints

- Authentication

  POST /api/users/login 
  Login for a user.

  POST /api/users/register
  Register a new user.


- Football Events

  GET /api/events 
  Get all football events.

  GET /api/events/:id
  Get a single football event by its ID.

  POST /api/events
  Create a new football event.

  PUT /api/events/:id
  Update an existing event by ID.

  DELETE /api/events/:id
  Delete a football event by ID.


- Users

  GET /api/users
  Get all users.

  GET /api/users/:id 
  Get a user by ID.

  PUT /api/users/:id
  Update user profile.

  DELETE /api/users/:id
  Delete a user by ID.


- Match Participation

  POST /api/events/:eventId/participants
  Join a football match/event.

  GET /api/events/:eventId/participants
  Get list of participants for a football match/event.


## Accessing API Documentation

The API documentation is generated using Swagger and can be accessed via Swagger UI : 

1. Start the server.

2. Open your browser and navigate to:

http://localhost:4000/api-docs

This will provide an interactive interface where you can test API endpoints directly.


## Scenario: Testing the PlayTogether API 


1. Register a New User
   Endpoint: POST /api/users/register

2. Log in to Get a Token
   Endpoint: POST /api/users/login

3. Create a New Event
   Endpoint: POST /api/events

4. Get All Events
   Endpoint: GET /api/events

5. Join an Event
   Endpoint: POST /api/events/1/participants

6. Delete the Event (Event Creator Only)
   Endpoint: DELETE /api/events/1























