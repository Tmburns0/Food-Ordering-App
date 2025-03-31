import mongoose from "mongoose";
import Product from "./models/product";


// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/foodOrderApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.error("Database connection error:", error));

// Seed data
const seedProducts = async () => {
  const pizzas = [
    { name: "Pepperoni Pizza", price: 10.0 },
    { name: "Margherita Pizza", price: 8.0 },
    { name: "BBQ Chicken Pizza", price: 12.0 },
    { name: "Veggie Pizza", price: 9.0 },
  ];

  try {
    await Product.deleteMany(); 
    await Product.insertMany(pizzas); // Add new products
    console.log("Product seed data added!");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  } finally {
    mongoose.connection.close(); 
  }
};

// Run the seeding script
seedProducts();
