import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"; 
import "../styles/cart.css"; 


// Stripe instance with public API key
const stripePromise = loadStripe("pk_test_51RA1kkGdNWpZi7cOEerk5alN9gos7xHJ6Ch4OZTq4QVxF4ISOy4t2Q58z90pG8pjiPEFitPalc9KC54mDAliDiyF00KnvvYQkS");

const Cart: React.FC<{ 
  cartItems: { name: string; price: number; quantity: number; image: string }[]; 
  setCartItems: React.Dispatch<React.SetStateAction<{ name: string; price: number; quantity: number; image: string }[]>>
}> = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const deliveryFee = 2.9;

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const subtotal = parseFloat(calculateTotalPrice().toFixed(2));
  const total = parseFloat((subtotal + deliveryFee).toFixed(2));

  const handleIncreaseQuantity = (itemName: string) => {
    const updatedCart = cartItems.map((item) => 
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (itemName: string) => {
    const updatedCart = cartItems.map((item) =>
      item.name === itemName && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (itemName: string) => {
    const updatedCart = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCart);
  };

  const handleMakePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add items before proceeding to checkout.");
      return;
    }

    const stripe = await stripePromise;

    try {
      // backend to create checkout session
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total,
        }),
      });

      const session = await response.json();
      console.log (session)
      
      const { error } = await stripe!.redirectToCheckout({ sessionId: session.id });

      if (error) {
        console.error("Stripe Checkout Error:", error.message);
        alert("There was an issue redirecting to Stripe Checkout.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again later.");
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecreaseQuantity(item.name)}
                      className="quantity-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.name)}
                      className="quantity-btn"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
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

          <div className="cart-summary">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          </div>

          <button 
            onClick={handleMakePayment} 
            className="make-payment-btn" 
            aria-label="Make a payment"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
