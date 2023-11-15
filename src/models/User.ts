import { ObjectId } from "mongodb";

export default interface User {
  _id?: ObjectId; // Optional MongoDB's unique identifier for the user document
  googleId: string; // Unique identifier provided by Google
  name: string; // User's full name
  email: string; // User's email address
}
