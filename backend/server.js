const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Example products data
const products = [
  { _id: "1", name: "Pepperoni Pizza", price: 12.99 },
  { _id: "2", name: "Margherita Pizza", price: 10.99 },
  { _id: "3", name: "BBQ Chicken Pizza", price: 14.99 },
];

// Add GET route for /api/products
app.get("/api/products", (req, res) => {
  res.status(200).json(products); 
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


