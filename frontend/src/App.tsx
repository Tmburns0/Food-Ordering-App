import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import { QueryClientProvider } from "react-query";
import { queryClient } from "./queryClient";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/Detailspage";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import OrdersHistory from "./pages/OrdersHistory";
import UserProfile from "./pages/UserProfile";
import AuthCallbackPage from "./pages/AuthCallbackPage"; 
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import SuccessPage from "./pages/Success";

const App: React.FC = () => {
 
  const [cartItems, setCartItems] = useState<
    { name: string; price: number; quantity: number; image: string }[]
  >([]);

  // Function to add items to the cart.
  const addToCart = (item: { name: string; price: number; image: string }) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to clear all cart items.
  const clearCart = () => setCartItems([]);

  return (
    <Auth0ProviderWithNavigate>
      <QueryClientProvider client={queryClient}>
          <Navbar />
          <div style={{ marginTop: "60px", padding: "20px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details" element={<DetailsPage addToCart={addToCart} />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    clearCart={clearCart}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route path="/payment" element={<PaymentPage />} /> {/* Added PaymentPage route */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<OrdersHistory />} />
              <Route path="/auth-callback" element={<AuthCallbackPage />} /> {/* Added route */}
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </div>
      </QueryClientProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default App;
