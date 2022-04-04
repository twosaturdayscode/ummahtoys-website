import { createWooOrder } from "../../src/api";

export default async function createOrder(req, res) {
  const data = req.body;
  try {
    const wooOrder = await createWooOrder(data);
    return res.status(200).send(wooOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
