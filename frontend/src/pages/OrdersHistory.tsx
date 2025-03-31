import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const OrdersHistory: React.FC = () => {
  const { user } = useAuth0(); // Get the logged-in user details

  // Mockup orders data
  const orders = [
    { id: 1, item: "Pizza", price: 12.99, date: "2023-03-01" },
    { id: 2, item: "Burger", price: 9.99, date: "2023-03-05" },
  ];

  return (
    <div>
      <h1>Orders History</h1>
      <h2>Welcome, {user?.email}</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.item} - ${order.price} on {order.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersHistory;
