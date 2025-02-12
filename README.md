# demo_project
using Express, JWT, and cookies for authentication and authorization


# Express.js Authentication & Security API

This project is a simple **Express.js** application that handles user authentication, secure routes, and integrates MongoDB for persistent storage. It demonstrates how to protect routes using JWT (JSON Web Tokens) and manage authentication and authorization with middleware.

## Features

- **User Authentication**: Signup and login routes with JWT-based authentication.
- **Secure Routes**: Routes protected by JWT tokens (e.g., `/secure`).
- **Admin Routes**: Only accessible to users with an `admin` role (e.g., `/admin-only`).
- **MongoDB Integration**: Connects to MongoDB for storing user data and credentials.
- **CORS**: Supports Cross-Origin Resource Sharing to enable secure communication with other domains.
- **Environment Configuration**: Uses `.env` for storing sensitive data (like database connection string and JWT secret).

## Requirements

- Node.js (v14 or above)
- MongoDB (either locally or a cloud instance like MongoDB Atlas)

## Installation

Follow these steps to get the project running locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/express-authentication-api.git
cd express-authentication-api





2. Install dependencies
Install the required Node.js packages:

bash
Kopiera
npm install
3. Set up environment variables
Create a .env file in the root of the project and add the following variables:

ini
Kopiera
MONGO_CONNECTION_STRING=mongodb://your-mongo-connection-string
PORT=3000
JWT_SECRET=your-jwt-secret-key
Make sure to replace your-mongo-connection-string and your-jwt-secret-key with actual values. For MongoDB, you can use a local MongoDB instance or a cloud service like MongoDB Atlas.

4. Run the application
Start the application by running:

bash
Kopiera
npm start
The server will be running at http://localhost:3000.

5. Testing with Postman
You can test the following endpoints using Postman or any API testing tool.

Authentication Routes:
POST /auth/signup: Registers a new user.
Request body: { "email": "example@example.com", "password": "your-password" }
POST /auth/login: Logs in and returns a JWT token.
Request body: { "email": "example@example.com", "password": "your-password" }
Secure Routes:
GET /secure: A protected route that requires a valid JWT token in the request headers (Authorization: Bearer <token>).
Example response: Secure data accessed.
Admin Route:
GET /admin-only: Requires an admin role. Only users with the admin role will be authorized to access this route.
Example response: Admin data accessed.
6. Error Handling
If the route doesn't exist, a 404 error will be returned.
If an invalid token is provided, you will receive a 401 error.
File Structure
bash
Kopiera
├── .env                # Environment variables (MongoDB connection, JWT secret, etc.)
├── config/             # Configuration files (database setup, JWT configuration)
├── models/             # MongoDB models (User model)
├── routes/             # Route handling (authentication and secure routes)
├── middleware/         # Middleware (authentication & authorization)
├── app.js              # Main Express application
├── server.js           # Starts the server
└── README.md           # Project documentation
Dependencies
express: Fast, unopinionated, minimalist web framework for Node.js.
mongoose: MongoDB object modeling for Node.js.
jsonwebtoken: JSON Web Token (JWT) implementation for securely transmitting information.
cors: Package for enabling Cross-Origin Resource Sharing.
cookie-parser: Middleware for parsing cookies in HTTP requests.
dotenv: Loads environment variables from a .env file.
License
This project is licensed under the MIT License.
