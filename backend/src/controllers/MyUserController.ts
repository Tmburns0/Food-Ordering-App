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
      res.status(500).json({ error: "Error creating user." });
    }
  },

  updateCurrentUser: async (req: Request, res: Response): Promise<void> => {
    console.log("Update request received:", req.body);

    try {
      const { auth0Id, name, address, city } = req.body;

      if (!auth0Id || !name || !address || !city) {
        res.status(400).json({ error: "auth0Id, name, address, and city are required." });
        return;
      }

      const user = await User.findOneAndUpdate(
        { auth0Id },
        { name, address, city },
        { new: true } 
      ).exec();

      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      console.log(`User updated successfully: ${user.email}`);
      res.status(200).json({ message: "User updated successfully.", user });
    } catch (error: any) {
      console.error(`Error updating user: ${error.message}`);
      res.status(500).json({ error: "Error updating user" });
    }
  },
};

export default MyUserController;
