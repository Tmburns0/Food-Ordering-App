import { Request, Response } from "express";
import User from "../models/User";

export const createCurrentUser = async (req: Request, res: Response): Promise<void> => {
  console.log("Request received:", req.body); 
  try {
    const { auth0Id, email, name } = req.body;

   
    if (!auth0Id || !email) {
      res.status(400).json({ error: "auth0Id and email are required." });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      res.status(200).json({ message: "User already exists.", user: existingUser });
      return;
    }

    // Create a new user
    const newUser = new User({
      auth0Id,
      email,
      name: name || "",
      orders: [],
      address: {}
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
};
