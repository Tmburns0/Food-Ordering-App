import { Router, Request, Response, NextFunction } from "express";
import User from "../models/User";

const router = Router();

router.get(
  "/api/orders",
  async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: "Missing userId parameter" });
      return;
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user.orders);
    } catch (error: any) {
      console.error(`Error fetching orders for userId=${userId}:`, error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;

