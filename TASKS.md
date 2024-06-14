# Tasks Checklist

Models: 
---
- [X] Implement User Model With Validation
   - **Description:** Implement User Model With Validation on
   - [X] Name max length is 100 char
   - [X] Email is unique
   - [X] password hashed and at least 8 characters

- [X] Implement Event Model 
   - **Description:** Implement Event Model With Validation on
   - [X] Name max length is 100 character
   - [X] Date Formate
   - [X] max attendees count 1000
   - [X] description length max 500 char
   - [X] category is one of [concert, conference, game ]

- [X] Implement Reservation Ticket 
   - **Description:** IReservation ticket
   - [X] Ticket id - Event ID - Attendese Count 

- [X] Implement Audit Log Model     
   - **Description:** Audit Log Model for Notification History has been sent to the user 


- [X] Implement Schdualed Notifation for Event 
   - **Description:** Scheduled Notification From User for Event


API: 
----
- [X] Implement User Creation Endpoint
   - **Description:** Implement the endpoint `/users` to allow users to create a new account.

- [X] Implement User Authentication Endpoint
   - **Description:** Implement the endpoint `/auth` to allow users to authenticate and receive a JWT token.

- [X] Implement Event Creation Endpoint
   - **Description:** Implement the endpoint `/events` to allow users to create a new event.

- [X] Implement Event Retrieval Endpoint
   - **Description:** Implement the endpoint `/events` to allow users to retrieve all events or search for events by name, date range, or category.

- [X] Implement Ticket Reservation Endpoint
   - **Description:** Implement the endpoint `/events/{eventId}/tickets` to allow users to reserve tickets for an event.

- [X] Implement View Booked Events Endpoint
   - **Description:** Implement the endpoint `/reservations` to allow users to view their booked events.

- [X] Implement Cancel Reservation Endpoint
   - **Description:** Implement the endpoint `/reservations/{reservationId}` to allow users to cancel their reservations.

- [X] Implement Notification Endpoint
   - **Description:** Implement an endpoint to send notifications to users before the event starts, as specified in the Swagger file.

- [X] Implement Endpoint for Notification History
    - **Description:** Implement an endpoint to retrieve the history of notifications sent to users.



Tasks:
---

- [X] Set Up Periodic Tasks for Sending Notifications
    - **Description:** Implement a periodic task scheduler (e.g., using cron jobs) to send notifications to users before events start.



Tests: 
---

- [X] Add Unit Tests for Functionality
    - **Description:** Write unit tests to ensure that notifications are sent correctly and at the appropriate time.


- [X] Write API Tests for the Service
    - **Description:** Write integration tests to verify that the  service functions correctly within the application.
    


Others: 
---

- [X] Pre-Loaded data in Database

- [ ] Assumptions If Any

- [ ] Video Explanation for Running and Architecture 

- [X] Build a Docker file  & Docker Compose File to run the App in the container With Database 

- [X] Installation Instructions
   - **Description:** Provide detailed instructions on installing the application and its dependencies.

- [X] Configuration Guide
   - **Description:** Explain any configuration options or environment variables that must be set up.

- [X] Build Instructions
   - **Description:** Detail the steps required to build the application from source code.

- [X] Running the Application
   - **Description:** Provide instructions on how to run the application locally for development or testing purposes.

- [X] Testing Instructions
   - **Description:** Explain how to run tests and ensure the application functions correctly.

- [X] API Documentation
   - **Description:** Link to the Swagger documentation or provide detailed API documentation within the README file.


