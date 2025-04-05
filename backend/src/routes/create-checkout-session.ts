import { Router, Request, Response, NextFunction } from "express";
const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51RA1kkGdNWpZi7cOyG361CP6hqBkwZk6pI9MnMf0sK0qss4r3VNj6MGpHBgxeqkZkU5d8axa7OyHh8NEBOugrpaE004kO4lkov"); // Replace with your secret key

const router=Router()

router.get('/verify-payment', async (req, res) => {
  const { session_id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  
  res.json({ status: session.payment_status });
});

router.post("/create-checkout-session", async (req, res) => {
  console.log (req.body)
  const { items, total } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            // images: [item.image], 
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/canceled',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router