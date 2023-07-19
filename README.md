# Instagram Clone Project

This repository contains the code for an Instagram Clone project, a full-stack web application that allows users to register, login, and view their profile information. The project is built using HTML, CSS, and JavaScript for the front-end, and Express.js and MongoDB for the back-end.

## Features

- User Registration: Users can create an account by providing their name, username, email, password, and bio.

- User Login: Registered users can log in to their accounts using their username and password.

- User Profile: Once logged in, users can view their profile information, including their username, email, and bio.

## Technologies Used

- Front-End: HTML, CSS, JavaScript
- Back-End: Express.js, Node.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Security: Password hashing with bcrypt

## Installation

1. Clone the repository to your local machine using `git clone`.
2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.

## Setting Up the Environment

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:

   ```
   PORT=8000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   CLIENT_URL=http://localhost:5500   // The URL where the front-end is hosted
   ```

3. Replace `<your_mongodb_connection_string>` with your MongoDB connection string.
4. Replace `<your_jwt_secret_key>` with a secret key for JWT token generation.

## Running the Application

1. Start the server using `npm start`. The server will run on the specified port (default: 8000).
2. Access the front-end application by opening `http://localhost:5500` in your web browser.

## API Endpoints

- `POST /signup`: Register a new user. Required fields: name, username, email, password, bio.
- `POST /login`: Authenticate a user and generate a JWT token for successful login. Required fields: username, password.
- `GET /`: Get user profile information (requires authentication).

## Contributions

Contributions to this project are welcome. Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
