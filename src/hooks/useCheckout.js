import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createNextOrder } from "../api";
import { getFloatFromString, prepareStripe, prepareWooOrder } from "../utils";
import { clearCartFromStorage, getCartFromStorage } from "../utils/storage";
import { useCartContext } from "../context";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "next-stripe/client";

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState([]);
  const { clearCart } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const cartData = getCartFromStorage();

    if (cartData && cartData.length !== 0) {
      setIsLoading(false);
      return setCart(cartData);
    }

    setIsLoading(false);
    setIsError(true);
  }, [setIsLoading, setCart]);

  const setPaymentMethod = (method) => setMethod(method);
  const getSubtotal = () => {
    return cart.reduce((acc, product) => {
      return (acc += product.quantity * getFloatFromString(product.price));
    }, 0);
  };

  const getTotal = (shipping, payment) => {
    if (shipping === "ritiro") return (getSubtotal() + 2).toFixed(2);
    if (shipping === "spedizione" && payment === "cod")
      return (getSubtotal() + 5.99 + 3).toFixed(2);

    return (getSubtotal() + 5.99).toFixed(2);
  };

  const createOrder = async (cart, userData) => {
    setIsLoading(true);
    const orderData = prepareWooOrder(cart, userData);

    try {
      const order = await createNextOrder(orderData);
      // NOTE: If the shipping method is withdraw, there is nothing to do.
      // We've created the order, now it's just about contacting the user to set up the meeting
      if (userData.shippingMethod === "ritiro") {
        clearCart();
        clearCartFromStorage();
        return router.push(
          `/result?order=${order.id}&email=${order.billing.email}&status=success`
        );
      }

      // NOTE: If there is shipping and payment method is cash on delivery, there is nothing to do.
      // We've created the order, now it's about proccessing the order and wait till the goods are delivered.
      if (
        userData.shippingMethod === "spedizione" &&
        userData.paymentMethod === "cod"
      ) {
        clearCart();
        clearCartFromStorage();
        return router.push(
          `/result?order=${order.id}&email=${order.billing.email}&status=success`
        );
      }

      if (
        userData.shippingMethod === "spedizione" &&
        userData.paymentMethod === "stripe"
      ) {
        const stripeSessionData = prepareStripe(order);
        try {
          const stripeSession = await createCheckoutSession(stripeSessionData);
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PK || ""
          );
          if (stripe) {
            clearCart();
            clearCartFromStorage();
            return stripe.redirectToCheckout({ sessionId: stripeSession.id });
          }
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          setIsError(true);
        }
      }

      clearCart();
      clearCartFromStorage();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return {
    isLoading,
    isError,
    cart,
    setPaymentMethod,
    getSubtotal,
    getTotal,
    createOrder,
  };
};

export default useCheckout;
