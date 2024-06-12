# Tasks Checklist

- [ ] Implement User Model With Validation
   - **Description:** Implement User Model With Validation on 
   [] name max length is 100 char 
   [] email is unique 
   [] password hashed and at least 8 characters

- [ ] Implement Event Model 
   - **Description:** Implement Event Model With Validation on 
   [] name max length is 100 character 
   [] Date Formate 
   [] max attendees count 1000
   [] description length max 500 char 
   [] category is one of [concert m conference , game ]

- [ ] Implement Reservation Ticket 
   - **Description:** IReservation ticket 
   [] Ticket id - Event ID - Attendese Count 

- [ ] Implement Audit Log Model     
   - **Description:** Audit Log Model for Notification History has sent to user 


- [ ] Implement Schdualed Notifation for Event 
   - **Description:** Scheduled Notification From User for Event

---------------------------

- [ ] Implement User Creation Endpoint
   - **Description:** Implement the endpoint `/users` to allow users to create a new account.

- [ ] Implement User Authentication Endpoint
   - **Description:** Implement the endpoint `/auth` to allow users to authenticate and receive a JWT token.

- [ ] Implement Event Creation Endpoint
   - **Description:** Implement the endpoint `/events` to allow users to create a new event.

- [ ] Implement Event Retrieval Endpoint
   - **Description:** Implement the endpoint `/events` to allow users to retrieve all events or search for events by name, date range, or category.

- [ ] Implement Ticket Reservation Endpoint
   - **Description:** Implement the endpoint `/events/{eventId}/tickets` to allow users to reserve tickets for an event.

- [ ] Implement View Booked Events Endpoint
   - **Description:** Implement the endpoint `/reservations` to allow users to view their booked events.

- [ ] Implement Cancel Reservation Endpoint
   - **Description:** Implement the endpoint `/reservations/{reservationId}` to allow users to cancel their reservations.

- [ ] Implement Notification Endpoint
   - **Description:** Implement an endpoint to send notifications to users before the event starts, as specified in the Swagger file.

- [ ] Implement Endpoint for Notification History
    - **Description:** Implement an endpoint to retrieve the history of notifications sent to users.

-----------------------

- [ ] Set Up Periodic Task for Sending Notifications
    - **Description:** Implement a periodic task scheduler (e.g., using cron jobs) to send notifications to users before events start.

--------------------------

- [ ] Add Unit Tests for Functionality
    - **Description:** Write unit tests to ensure that notifications are sent correctly and at the appropriate time.


- [ ] Write Integration Tests for the Service
    - **Description:** Write integration tests to verify that the  service functions correctly within the application.


-------------------------------------

- [ ] Pre-Loaded data in Database

- [ ] Video Explaination 

- [ ] how to test System 

- [ ] Installation Instructions
   - **Description:** Provide detailed instructions on how to install the application and its dependencies.

- [ ] Configuration Guide
   - **Description:** Explain any configuration options or environment variables that need to be set up.

- [ ] Build Instructions
   - **Description:** Detail the steps required to build the application from source code.

- [ ] Running the Application
   - **Description:** Provide instructions on how to run the application locally for development or testing purposes.

- [ ] Testing Instructions
   - **Description:** Explain how to run tests and ensure the application functions correctly.

- [ ] API Documentation
   - **Description:** Link to the Swagger documentation or provide detailed API documentation within the README file.

- [ ] Tech Arch Documentation
   - **Description:** Link to the Swagger documentation or provide detailed API documentation within the README file.