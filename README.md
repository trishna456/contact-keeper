# Contact Management Application

## Overview

This project is a robust full-stack MERN (MongoDB, Express.js, React.js, Node.js) application developed for contact management. It features a custom Express backend API fortified with JSON Web Token authentication for secure user authentication and data protection. The frontend is built using React.js, with an efficient Flux design pattern implemented using the Context API for enhanced data management and application performance.

## Features

- User authentication: Secure user authentication using JSON Web Tokens (JWT).
- Contact management: Allows users to create, read, update, and delete contacts.
- Context API: Implements an efficient Flux design pattern using the Context API for state management.
- Responsive design: Ensures the application is fully functional and visually appealing across various devices and screen sizes.

## Technologies Used

- MongoDB: NoSQL database for storing contact information.
- Express.js: Backend framework for building the RESTful API.
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for running the backend server.
- JSON Web Token (JWT): Used for secure authentication.
- Context API: State management solution for React applications.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:

git clone https://github.com/trishna456/contact-keeper


2. Navigate to the project directory:

cd contact-management-app


3. Install dependencies for both the backend and frontend:

cd server && npm install
cd ../client && npm install


4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following variables:
     - `MONGO_URI`: MongoDB connection URI.
     - `JWT_SECRET`: Secret key for generating JWT tokens.

5. Start the backend server:

cd ../server && npm start


6. Start the frontend development server:

cd ../client && npm start


7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributors

- Trishna Patil (https://github.com/trishna456)

