import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

 
  const { cartItems, subtotal, total, deliveryFee } = location.state || {};

  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
  });

  const [error, setError] = useState("");

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); 
  };

  
  const handlePayment = () => {
    const { name, city, address } = formData;

    
    if (!name || !city || !address) {
      setError("Please fill out all required fields: Name, City, and Address.");
      return;
    }

    console.log("Processing payment for:", {
      cartItems,
      subtotal,
      total,
      deliveryFee,
      formData,
    });

    alert("Payment successful! Your order has been placed.");
    navigate("/confirmation"); 
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      {cartItems && cartItems.length > 0 ? (
        <>
          <h2>Order Summary</h2>
          <ul className="order-items">
            {cartItems.map((item, index) => (
              <li key={index} className="order-item">
                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="order-summary">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          </div>

          {/* User Input Form */}
          <h2>Enter Your Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your delivery address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Pay Now Button */}
          <button className="pay-now-btn" onClick={handlePayment}>
            Pay Now
          </button>
        </>
      ) : (
        <p>No order data available. Please return to the cart.</p>
      )}
    </div>
  );
};

export default PaymentPage;
