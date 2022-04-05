import Stripe from "stripe";
import { updateWooOrder } from "../../src/api";

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2020-08-27",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function stripeWebhook(req, res) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
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

      const orderUpdates = {
        set_paid: true,
        transaction_id: session.id,
      };
      // Payment Success.
      try {
        await updateWooOrder(session.metadata.orderId, orderUpdates);
      } catch (error) {
        await updateWooOrder(session.metadata.orderId, { status: "failed" });
        console.error("Update order error", error);
      }

      res.json({ received: true });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
