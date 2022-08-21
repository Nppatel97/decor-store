import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartProduct } from "../../../typings";
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51Jx6l5DYTptazhzCUXTU7zHm3ROSlH824Erst690MRguQ39Kzsn5K25lxUPqBuwI6T3yD3mwk1NNWSwm9Z2He63j00BjiDuaTR",
  {
    apiVersion: "2022-08-01",
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const mappedArr = req.body.map((el: CartProduct) => {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: el.title,
            images: [el.image],
          },
          unit_amount: el.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity: el.quantity,
      };
    });
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1LZ6WDDYTptazhzCyUNw1uQg" },
        { shipping_rate: "shr_1LZ6X1DYTptazhzCyGKq71nE" },
        { shipping_rate: "shr_1LZ6Y9DYTptazhzC0gv8ydCW" },
      ],
      line_items: mappedArr,
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
    };
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    // console.log(`Session from API: ID: ${session}`);
    res.status(200).json({ sessionId: session.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
