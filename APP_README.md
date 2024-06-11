# Event Booking API

## Description

This API allows customers to create, find, and reserve tickets for events, view and manage their reservations, and be notified before the event kickoff.

## Requirements

- Node.js
- PostgreSQL

## Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add your configuration:
    ```env
    PORT=8080
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Running Tests

Run the tests using Jest:
```bash
npm test
