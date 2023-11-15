import express from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import User from "../models/User";
import { getClient } from "../db";

const usersRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

usersRouter.post("/", async (req, res) => {
  try {
    const { token } = req.body; // The ID token sent from the client
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    // Check if the payload is not undefined
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const googleId: string = payload["sub"]; // Google's unique identifier for the user
    const name = payload["name"] as string;
    const email = payload["email"] as string;

    const dbClient = await getClient();

    const user = await dbClient
      .db()
      .collection<User>("users")
      .findOne({ googleId });

    let newUser: User | null = null;
    if (!user) {
      newUser = {
        googleId: googleId,
        name: name,
        email: email,
      };
      await dbClient.db().collection<User>("users").insertOne(newUser);
      res.status(201).json({ message: "New user created", user: newUser });
    } else {
      res
        .status(200)
        .json({ message: "You already have an account. Please log in." });
    }
  } catch (error: any) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
});

export default usersRouter;
