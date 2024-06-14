# Event Booking  API

## Introduction

This repository contains the source code for the Event Booking. system will allow users to create, find and reserve tickets for events, view and manage their reservations and to be notified before the event kickoff.



## Installation
### Locally
#### Prerequisites
> Make sure you have Node 16 and npm installed on your machine.

To run the application locally, use the following command:
1. Install dependencies:
  ```bash
npm install 
```
2. Compile and build Code 
  ```bash
    npm run compile
```

3. Run The App 
  ```bash
    ./start.sh
```

> The application will be accessible at http://localhost:3000.
---
Swagger File : http://localhost:3000/api-docs/#/

### Running with Docker 

    docker-compose up --build

    This command will build the Docker image and start the application in containers.

    Open your web browser and access the application at http://localhost:3000.

---
#### Technoclogies : 

1. Express.js: Web framework for building the API.
2. TypeORM: ORM for database interactions.
3. PostgreSQL: Database for storing application data.
4. Jest: Testing framework for unit tests.
5. Docker: Containerization platform for running the application and database.


## Run Testing 
To Run Tests 
1. npm install 
2. npm run compile 
3. npm test 
Make Sure You are using Node 16 









