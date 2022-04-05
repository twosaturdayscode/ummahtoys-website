import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const updateWooOrder = async (status, orderId) => {};

export default async function stripeWebhook(req, res) {
  if (req.method === "POST") {
    const sig = request.headers["stripe-signature"];
    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );
    } catch (error) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if ("checkout.session.completed" === stripeEvent.type) {
      const session = stripeEvent.data.object;
      console.log("sessionsession", session);
      console.log(
        "✅ session.metadata.orderId",
        session.metadata.orderId,
        session.id
      );
      // Payment Success.
      /* try {
        await updateOrder("processing", session.metadata.orderId, session.id);
      } catch (error) {
        await updateOrder("failed", session.metadata.orderId);
        console.error("Update order error", error);
      } */
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
