import { Router, Request, Response, NextFunction } from "express";
import User from "../models/User";
import OrderModel from "../models/OrderModel";
import OrderStatus from "../models/OrderStatus";

const router = Router();

/**
 * Get all orders for a user
 */
router.get(
  "/api/orders",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: "Missing userId parameter" });
      return;
    }

    try {
      const user = await User.findById(userId).populate("orders");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user.orders || []);
    } catch (error: any) {
      console.error(`Error fetching orders for userId=${userId}:`, error.message);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
);

/**
 * Get new orders for a user
 */
router.get(
  "/api/orders/new",
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ message: "Missing userId parameter" });
      return;
    }

    try {
      const user = await User.findById(userId).populate("orders");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const newOrders = user.orders?.filter((order: { status: string }) => order.status === OrderStatus.NEW) || [];

      res.status(200).json({
        message: newOrders.length > 0 ? "New orders found" : "No new orders found",
        orders: newOrders,
      });
    } catch (error: any) {
      console.error(`Error fetching new orders for userId=${userId}:`, error.message);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
);

/**
 * Create a new order
 */
router.post(
  "/api/orders",
  async (req: Request, res: Response): Promise<void> => {
    const { userId, items, total } = req.body;

    if (!userId || !items || !total) {
      res.status(400).json({ message: "Missing required fields: userId, items, or total" });
      return;
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const newOrder = new OrderModel({
        user: userId,
        items,
        total,
        status: OrderStatus.NEW,
        createdAt: new Date(),
      });

      await newOrder.save();

      user.orders?.push(newOrder);
      await user.save();

      res.status(201).json(newOrder);
    } catch (error: any) {
      console.error(`Error creating order for userId=${userId}:`, error.message);
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  }
);

export default router;
