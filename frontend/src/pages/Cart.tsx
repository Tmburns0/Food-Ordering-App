import React, { useState } from "react";
import "../styles/cart.css";

const Cart: React.FC<{ 
  cartItems: { name: string; price: number; quantity: number; image: string }[]; 
  clearCart: () => void; 
  setCartItems: React.Dispatch<React.SetStateAction<{ name: string; price: number; quantity: number; image: string }[]>>
}> = ({ cartItems, clearCart, setCartItems }) => {
  const [orderPlaced, setOrderPlaced] = useState(false); // State for tracking orders
  const deliveryFee = 2.90; // Fixed delivery fee for simplicity

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = () => {
    console.log("Order placed:", cartItems); // Log the order
    setOrderPlaced(true);
    clearCart(); // Clear the cart after placing the order
  };

  const handleRemoveItem = (itemName: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  const subtotal = parseFloat(getTotalPrice());
  const total = (subtotal + deliveryFee).toFixed(2);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {orderPlaced ? (
        <p className="order-feedback">Your order has been placed successfully!</p>
      ) : cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button 
                    onClick={() => handleRemoveItem(item.name)} 
                    className="remove-order-btn" 
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <p><strong>Delivery Address:</strong> White Street Sand Houses 4321</p>
            <p><strong>Delivery Time:</strong> 10-20 minutes (ASAP)</p>
            <p><strong>Payment Method:</strong> Credit Card</p>
            <hr />
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <p><strong>Total:</strong> ${total}</p>
          </div>

          {/* Place Order Button */}
          <button 
            onClick={handlePlaceOrder} 
            className="place-order-btn" 
            aria-label="Place your order"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

