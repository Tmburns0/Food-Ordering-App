import mongoose from "mongoose";
import User from "../src/models/User"; // Adjust path if necessary

mongoose.connect("mongodb://localhost:27017/foodOrderApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  const user = new User({
    name: "John",
    email: "John@example.com",
    password: "securepassword",
    orders: [
      {
        id: 1,
        items: [
          { name: "Pepperoni Pizza", price: 10.0, quantity: 2 },
          { name: "Margherita Pizza", price: 8.0, quantity: 1 },
        ],
        total: 28.0,
        date: "2025-03-27",
      },
    ],
  });

  try {
    await user.save();
    console.log("Seed data added successfully");
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedData();

