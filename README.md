# Flight Tracker Application

## Overview
The Flight Tracker Application is a web-based platform designed to provide users with real-time updates on flight statuses. It utilizes Firebase for authentication and session management, ensuring a secure user experience. The backend is built with Node.js and Express, connected to a MongoDB database to manage flight data and user information. The application also features notifications to alert users about any changes in flight statuses.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Real-Time Updates and Notifications](#real-time-updates-and-notifications)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
- User authentication using Firebase
- Real-time flight updates
- Session management for user convenience
- Notifications for flight status changes
- Responsive and user-friendly interface

## Technologies Used
- **Frontend**: React, Firebase, CSS
- **Backend**: Node.js, Express, MongoDB
- **Real-Time Communication**: Socket.IO
- **Deployment**: Firebase Hosting (for frontend), Heroku (for backend)

## Frontend
The frontend is developed using React, integrating Firebase Authentication for user sign-in and session management. The application fetches flight data and updates it in real-time, providing users with the latest information and notifications regarding flight status changes.

### Key Components
- **Authentication**: Users can sign up, log in, and log out using Firebase.
- **Flight Dashboard**: Displays real-time flight information and updates.
- **Notifications**: Alerts users about flight status changes via real-time notifications.

## Backend
The backend is developed using Node.js and Express, providing a RESTful API to interact with the MongoDB database. It handles user data, flight information, and real-time updates using Socket.IO.

### Key Features
- Secure API endpoints for user and flight management.
- Integration with MongoDB for data storage.
- Real-time data fetching and updates via Socket.IO.

## API Endpoints
Below are the main API endpoints available in the application:

### User Authentication
- **POST** `/api/auth/signup`: Create a new user account.
- **POST** `/api/auth/login`: Authenticate a user and start a session.
- **POST** `/api/auth/logout`: Log out the current user.

### Flight Management
- **GET** `/api/flights`: Retrieve a list of all flights.
- **GET** `/api/flights/:id`: Get details of a specific flight.
- **POST** `/api/flights`: Add a new flight.
- **PUT** `/api/flights/:id`: Update an existing flight.
- **DELETE** `/api/flights/:id`: Delete a flight.

## Database Schema
The MongoDB database consists of the following collections:

### Image for showing the flow and design
![31868](https://github.com/user-attachments/assets/159b3b2d-4406-4d63-be70-c681e8750d3c)


