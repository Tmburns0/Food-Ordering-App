import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import "../styles/detailspage.css";
import PepperoniImage from "../assets/pepperoni-pizza.jpg";
import MargheritaImage from "../assets/Margherita-Pizza.jpg";
import BBQImage from "../assets/bbq-chicken-pizza.jpg";
import VeggieImage from "../assets/veggie-pizza.jpg";

const products = [
  { _id: "1", name: "Pepperoni Pizza", price: 12.99, image: PepperoniImage, rating: 4.5, category: "Favorite Dishes" },
  { _id: "2", name: "Margherita Pizza", price: 10.99, image: MargheritaImage, rating: 4.0, category: "Favorite Dishes" },
  { _id: "3", name: "BBQ Chicken Pizza", price: 14.99, image: BBQImage, rating: 4.8, category: "Business Lunch" },
  { _id: "4", name: "Veggie Pizza", price: 11.99, image: VeggieImage, rating: 4.3, category: "Business Lunch" },
];

const DetailsPage: React.FC<{ addToCart: (item: { name: string; price: number; image: string }) => void }> = ({
  addToCart,
}) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // Get authentication status
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: { name: string; price: number; image: string }) => {
    addToCart(product); // Add to cart regardless of authentication

    // Check if the user is not logged in
    if (!isAuthenticated) {
      alert("You are not logged in. Log in for a more personalized experience!");
    }

    // Navigate to the cart page
    navigate("/cart");
  };

  return (
    <div className="details-page">
      {/* Greeting */}
      <div className="greeting">
        <h1>Our Menu</h1>
        <p>Explore our delicious pizzas, carefully curated for your satisfaction.</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for favorite pizzas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Pizza Categories */}
      <div className="pizza-category">
        <h2>Favorite Dishes</h2>
        <div className="pizza-list">
          {filteredProducts
            .filter((product) => product.category === "Favorite Dishes")
            .map((product) => (
              <div key={product._id} className="pizza-item">
                <img src={product.image} alt={product.name} className="pizza-image" />
                <h3>{product.name}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Rating: ⭐ {product.rating}</p>
                <button
                  onClick={() =>
                    handleAddToCart({ name: product.name, price: product.price, image: product.image })
                  }
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="pizza-category">
        <h2>Business Lunch</h2>
        <div className="pizza-list">
          {filteredProducts
            .filter((product) => product.category === "Business Lunch")
            .map((product) => (
              <div key={product._id} className="pizza-item">
                <img src={product.image} alt={product.name} className="pizza-image" />
                <h3>{product.name}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Rating: ⭐ {product.rating}</p>
                <button
                  onClick={() =>
                    handleAddToCart({ name: product.name, price: product.price, image: product.image })
                  }
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;




