import { Router, Request, Response, NextFunction } from "express";
import Product from "../models/products";  // Import the Mongoose model

const router = Router();

// Endpoint to fetch all products
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Endpoint to fetch a single product by ID
  router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      console.error(`Error fetching product with ID=${req.params.id}:`, error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
export default router;
