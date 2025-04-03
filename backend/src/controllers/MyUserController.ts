import { Request, Response } from "express";
import User from "../models/User";

const MyUserController = {
  createCurrentUser: async (req: Request, res: Response): Promise<void> => {
    console.log("Request received:", req.body);

    try {
      const { auth0Id, email, name } = req.body;

      if (!auth0Id || !email) {
        res.status(400).json({ error: "auth0Id and email are required." });
        return;
      }

      const existingUser = await User.findOne({ auth0Id }).exec();
      if (existingUser) {
        console.log(`User already exists: ${existingUser.email}`);
        res.status(200).json({ message: "User already exists.", user: existingUser });
        return;
      }

      const newUser = new User({
        auth0Id,
        email,
        name: name || "Unknown User",
        orders: [],
        address: {},
      });

      await newUser.save();
      console.log(`User created successfully: ${newUser.email}`);
      res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error: any) {
      console.error(`Error creating user: ${error.message}`);
      res.status(500).json({ error: "An unexpected error occurred while creating the user." });
    }
  },
};

export default MyUserController;
