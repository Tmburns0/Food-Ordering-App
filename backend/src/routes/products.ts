import { Router, Request, Response, NextFunction } from "express";
import Product from "../models/products";  

const router = Router();


router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

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
