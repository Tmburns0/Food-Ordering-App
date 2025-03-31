import React, { useState } from "react";
import "../styles/orders.css";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      items: [
        { name: "Pepperoni Pizza", price: 10.0, quantity: 2 },
        { name: "Margherita Pizza", price: 8.0, quantity: 1 },
      ],
      total: 28.0,
      date: "2025-03-27",
    },
  ]);

  // Function to delete an order
  const deleteOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  // Function to add a new order
  const addOrder = () => {
    const newOrder: Order = {
      id: orders.length + 1,
      items: [{ name: "BBQ Chicken Pizza", price: 12.0, quantity: 1 }],
      total: 12.0,
      date: new Date().toISOString().split("T")[0],
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>
                Order #{order.id} - {order.date}
              </h3>
              <div>
                {order.items.map((item, index) => (
                  <p key={`${item.name}-${index}`}>
                    {item.name} x {item.quantity} - $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>
              <h4>Total: ${order.total.toFixed(2)}</h4>
              <button onClick={() => deleteOrder(order.id)}>Delete Order</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={addOrder}>Add New Order</button>
    </div>
  );
};

export default Orders;

