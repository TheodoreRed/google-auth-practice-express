# Google Authentication with Express.js

This repository contains a simple Express.js application that implements a basic sign-up endpoint using Google's OAuth2 authentication. This is a learning project aimed at understanding how to use Google authentication in a Node.js application.

## Overview

The application uses the `google-auth-library` package to authenticate users with Google. When a user signs up, they send their Google ID token to the server. The server then verifies this token and retrieves the user's information.

## Code Structure

The main file is `usersRouter.ts`, which sets up an Express router and a single POST endpoint for user sign-up.

Here's a brief overview of what the code does:

1. **Import necessary modules**: The necessary modules and functions are imported at the beginning of the file. This includes Express, the `OAuth2Client` and `TokenPayload` from `google-auth-library`, the `User` model, and the `getClient` function for database access.

2. **Set up the OAuth2 client**: An instance of `OAuth2Client` is created using the Google Client ID, which is stored as an environment variable.

3. **Create the sign-up endpoint**: A POST endpoint is set up on the router. This endpoint expects the client to send the Google ID token in the body of the request.

4. **Verify the ID token**: The Google ID token sent by the client is verified using the `verifyIdToken` method of the `OAuth2Client` instance. This method returns a `LoginTicket`, which contains the payload of the ID token.

5. **Retrieve user information**: The payload of the ID token is retrieved using the `getPayload` method of the `LoginTicket`. This payload contains information about the authenticated user, such as their unique Google ID (`sub`), full name (`name`), and email address (`email`).

6. **Check if the user exists in the database**: The application checks if a user with the given Google ID already exists in the database.

7. **Create a new user**: If the user does not exist, a new user is created in the database with the Google ID, name, and email from the payload.

8. **Handle errors**: If any errors occur during this process, an error message is sent back to the client.

## Running the Application

To run the application, you'll need to have Node.js and npm installed. You'll also need to set up a MongoDB database and a Google OAuth2 client.

Please note that this is a basic setup for learning purposes.
